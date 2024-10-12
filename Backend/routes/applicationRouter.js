import express from "express";
import {
    convenorGetAllApplications,
    studentDeleteApplication,
    studentGetAllApplications,
    postApplication,
} from "../controllers/applicationController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/post", isAuthenticated, postApplication);
router.get("/convenor/getall", isAuthenticated, convenorGetAllApplications);
router.get("/student/getall", isAuthenticated, studentGetAllApplications);
router.delete("/delete/:id", isAuthenticated, studentDeleteApplication);

export default router;