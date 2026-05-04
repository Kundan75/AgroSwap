import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { 
  ShieldCheck, Lock, Info, Clock, 
  CreditCard, Smartphone, Landmark, Wallet, 
  Check, MapPin, Calendar, Timer
} from 'lucide-react';

import { Button, Tooltip, Stepper, Step, StepLabel, Divider } from '@mui/material';
import { CreateBookingService } from '../services/booking.services';

const PaymentPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { state } = useLocation();

  const [toolData, setToolData] = useState(state?.tool || null);
  const [payStatus, setPayStatus] = useState('idle');
  const [selectedMethod, setSelectedMethod] = useState('upi');

  const fromDate = state?.fromDate;
  const toDate = state?.toDate;
  const bookingType = state?.bookingType || "day";

  // ✅ Handle refresh (fallback)
  useEffect(() => {
    if (!state) {
      console.log("⚠️ No state found, should fetch tool using id:", id);
      // future: fetch tool using id
    }
  }, [state, id]);

  if (!toolData || !fromDate || !toDate) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        No booking data found
      </div>
    );
  }

  // ✅ FIXED DAY CALCULATION
  const days = Math.max(
    1,
    Math.ceil(
      (new Date(toDate).setHours(0,0,0,0) - new Date(fromDate).setHours(0,0,0,0))
      / (1000 * 60 * 60 * 24)
    ) + 1
  );

  const rentAmount = days * toolData.price;
  const durationLabel = `${days} days`;

  const platformFee = Math.round(rentAmount * 0.15);

  const totalAmount = rentAmount + platformFee;



  const glassStyle = "bg-white/40 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl";

 const handlePayment = async () => {
  try {
    setPayStatus("processing");

    const formData = {
      toolId: toolData._id,
      fromDate,
      toDate,
      totalAmount,
    };

    const res = await CreateBookingService(formData);

    if (res.success) {
      setPayStatus("success");
    } else {
      setPayStatus("idle");
      alert(res.message || "Booking failed");
    }

  } catch (error) {
    console.error("Payment error:", error);
    setPayStatus("idle");
    alert("Something went wrong");
  }
};

  if (payStatus === 'success') return <SuccessState />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-slate-50 to-sky-50 pt-24 pb-12 px-4 md:px-10">
      
      <div className="max-w-4xl mx-auto mb-10">
        <Stepper activeStep={2} alternativeLabel sx={{ '& .MuiStepIcon-root.Mui-active': { color: '#10b981' } }}>
          {['Select Tool', 'Choose Slot', 'Payment', 'Confirmed'].map((label) => (
            <Step key={label}><StepLabel>{label}</StepLabel></Step>
          ))}
        </Stepper>
      </div>

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* LEFT */}
        <div className="lg:col-span-7 space-y-6">
          
          <header>
            <h1 className="text-3xl font-black text-slate-800">Secure Payment</h1>
            <p className="text-slate-500 text-sm mt-2 max-w-md">
              Complete your payment to confirm your booking. Your amount is held safely in escrow.
            </p>
          </header>

          <div className={`${glassStyle} p-6`}>
            <h3 className="font-bold text-slate-800 mb-4">Select Payment Method</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <PaymentOption id="upi" icon={<Smartphone/>} label="UPI" selected={selectedMethod === 'upi'} onClick={setSelectedMethod}/>
              <PaymentOption id="card" icon={<CreditCard/>} label="Card" selected={selectedMethod === 'card'} onClick={setSelectedMethod}/>
              <PaymentOption id="net" icon={<Landmark/>} label="Banking" selected={selectedMethod === 'net'} onClick={setSelectedMethod}/>
              <PaymentOption id="wallet" icon={<Wallet/>} label="Wallet" selected={selectedMethod === 'wallet'} onClick={setSelectedMethod}/>
            </div>
          </div>

          <div className="bg-emerald-900/5 border border-emerald-200 p-6 rounded-3xl flex gap-4">
            <Info className="text-emerald-600 shrink-0" />
            <div className="text-sm text-emerald-800 leading-relaxed">
              <b>AgroSwap Escrow:</b> Owner receives money only when you confirm successful return.
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className={`${glassStyle} p-6 overflow-hidden relative`}>
           
             
            <div className="flex gap-4 mb-6">
              <img src={toolData.image} className="w-20 h-20 rounded-2xl object-cover" alt="Tool" />
              <div>
                <h4 className="font-bold text-slate-800">{toolData.name}</h4>
                <div className="flex items-center gap-1 text-[10px] text-slate-500 mt-1">
                  <MapPin size={10}/> {toolData.location}
                </div>
              </div>
            </div>

            {/* ✅ CLEAN DATE UI */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between bg-white/60 px-4 py-2 rounded-xl border">
                <span className="flex items-center gap-2">
                  <Calendar size={14}/> Booking Dates
                </span>
                <span>
                  {new Date(fromDate).toDateString()} → {new Date(toDate).toDateString()}
                </span>
              </div>

              <div className="flex justify-between bg-white/60 px-4 py-2 rounded-xl border">
                <span className="flex items-center gap-2">
                  <Clock size={14}/> Duration
                </span>
                <span>{durationLabel}</span>
              </div>
            </div>
          </div>

          <div className={`${glassStyle} p-6`}>
            <h3 className="font-bold text-slate-800 mb-4">Price Breakdown</h3>

            <PriceRow label={`Rental (${durationLabel})`} value={`₹${rentAmount}`} />
            <PriceRow label="Platform Fee" value={`₹${platformFee}`} />

            <Divider className="my-2" />

            <div className="flex justify-between">
              <span className="font-black text-lg">Total</span>
              <span className="font-black text-emerald-600 text-2xl">₹{totalAmount}</span>
            </div>
          </div>

          <button 
            onClick={handlePayment}
            className="w-full bg-emerald-500 text-white py-4 rounded-2xl font-black"
          >
            Pay ₹{totalAmount}
          </button>

        </div>
      </div>
    </div>
  );
};

// Components (UNCHANGED UI)
const SuccessState = () => {
  const navigate = useNavigate();
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div>
        <Check size={48}/>
        <h1>Payment Successful</h1>
        <Button onClick={() => navigate("/history")}>My Bookings</Button>
      </div>
    </div>
  );
};

const PaymentOption = ({ id, icon, label, selected, onClick }) => (
  <button onClick={() => onClick(id)} className={`p-4 rounded-2xl border ${selected ? 'border-emerald-500' : ''}`}>
    {icon}
    <span>{label}</span>
  </button>
);

const PriceRow = ({ label, value, isRefundable }) => (
  <div className="flex justify-between">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export default PaymentPage;