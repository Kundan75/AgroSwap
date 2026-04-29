import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import ToolsForRent from "../pages/ToolsForRent";
import ToolDetails from "../pages/ToolDetails";
import AddTool from "../pages/ListerPages/AddTool";
import EditTool from "../pages/ListerPages/EditTool";
import PaymentPage from "../pages/Payment";
import LoginPage from "../Auth/Login";
import Signup from "../Auth/Signup";
import ForgotPassword from "../Auth/ForgotPassword";
import Mydashboard from "../pages/ListerPages/Mydashboard";
import ToolDetailsPage from "../pages/ListerPages/ToolDetailsPage";
import History from "../pages/ListerPages/History";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/tools" element={<ToolsForRent />} />
      <Route path="/tooldetails/:id" element={<ToolDetails />} />
      <Route path="/payment/:id" element={<PaymentPage />} />

      {/* AUTH */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/my-dashboard" element={<Mydashboard />} />
      <Route path="/add-tool" element={<AddTool />} />
      <Route path="/edit-tool/:id" element={<EditTool />} />
      <Route path="/tool/:id" element={<ToolDetailsPage />} />
      <Route path="/history" element={<History/>} />
    </Routes>
  );
};

export default Router;
