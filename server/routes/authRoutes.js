import express from "express"
import wrapAsync from "../wrapAsync.js";
import { Login, Signup } from "../controllers/authControllers.js";

const router = express.Router();

router.post("/signup",wrapAsync(Signup));
router.post("/login",wrapAsync(Login));

export default router;