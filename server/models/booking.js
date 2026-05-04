import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    tool: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Tool",
      required: true,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // 📅 Date Range Booking
    fromDate: {
      type: Date,
      required: true,
    },

    toDate: {
      type: Date,
      required: true,
    },

    // 💰 Pricing
    totalAmount: {
      type: Number,
      required: true,
    },

  },
  { timestamps: true }
);

export default mongoose.model("Booking", bookingSchema);