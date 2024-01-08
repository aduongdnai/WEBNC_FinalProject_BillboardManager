// reviewRoutes.js
import express from "express";
import {
  getReviewRequests,
  approveRequest,
  rejectRequest,
} from "../controllers/reviewController";

const router = express.Router();

// Đường dẫn để lấy danh sách yêu cầu xem xét
router.get("/", getReviewRequests);

// Đường dẫn để xác nhận một yêu cầu
router.post("/approve/:id", approveRequest);

// Đường dẫn để từ chối một yêu cầu
router.post("/reject/:id", rejectRequest);

export default router;
