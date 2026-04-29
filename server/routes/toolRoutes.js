import express from "express"
import wrapAsync from "../wrapAsync.js";
import { CreateTool, getAllTools, getUserTools } from "../controllers/toolController.js";
import { verifyToken } from "../middleware/auth.js";
import upload from "../middleware/upload.js";

const router = express.Router();

router.post("/createtool", verifyToken, upload.single("image"),  wrapAsync(CreateTool));
router.get("/getalltools",wrapAsync(getAllTools));
router.get("/getusertools", verifyToken, wrapAsync(getUserTools));


export default router;