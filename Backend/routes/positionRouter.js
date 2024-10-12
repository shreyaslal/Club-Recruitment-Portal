import express from "express";
import {
  deletePosition,
  getAllPositions,
  getMyPositions,
  getSinglePosition,
  postPosition,
  updatePosition,
} from "../controllers/positionController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.get("/getAllPositions", getAllPositions);
router.post("/postPosition", isAuthenticated, postPosition);
router.get("/getmyPositions", isAuthenticated, getMyPositions);
router.put("/updatePosition/:id", isAuthenticated, updatePosition);
router.delete("/deletePosition/:id", isAuthenticated, deletePosition);
router.get("/:id", isAuthenticated, getSinglePosition);

export default router;
