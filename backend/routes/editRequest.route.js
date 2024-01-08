import express from "express";
import {
  getReviewRequests,
  approveRequest,
  rejectRequest,
} from "../controller/reviewController.js";

const router = express.Router();

// Đường dẫn để lấy danh sách yêu cầu chỉnh sửa
router.get("/", getReviewRequests);

// Đường dẫn để xác nhận một yêu cầu chỉnh sửa
router.post("/approve/:id", approveRequest);

// Đường dẫn để từ chối một yêu cầu chỉnh sửa
router.post("/reject/:id", rejectRequest);

export default router;
