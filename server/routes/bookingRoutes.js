import express from "express";
import wrapAsync from "../wrapAsync.js";
import { createBooking, getMyBookings } from "../controllers/bookingControllers.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/create", verifyToken, wrapAsync(createBooking));
router.get("/my-bookings", verifyToken, wrapAsync(getMyBookings));


export default router;