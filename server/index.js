import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js"; // ✅ correct path + extension
import toolRoutes from "./routes/toolRoutes.js"
import bookingRoutes from "./routes/bookingRoutes.js"

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ENV
const MONGOURL = process.env.AGROSWAP_DB_URL;
const PORT = process.env.PORT || 5000;

// Routes
app.use("/auth", authRoutes);
app.use("/tool", toolRoutes);
app.use("/booking", bookingRoutes);



// Test Route
app.get("/", (req, res) => {
  res.send("AgroSwap Backend Running 🚜");
});

// DB Connection
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("✅ MongoDB Connected Successfully");

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB Connection Failed:", err.message);
  });