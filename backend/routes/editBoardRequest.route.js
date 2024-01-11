import express from "express";
import {
  getAdBoardEditRequests,
  approveAdBoardEditRequest,
  rejectAdBoardEditRequest,
} from "../controller/reviewAdboardController.js";

const router = express.Router();

// Đường dẫn để lấy danh sách yêu cầu chỉnh sửa bảng quảng cáo
router.get("/", getAdBoardEditRequests);

// Đường dẫn để xác nhận một yêu cầu chỉnh sửa bảng quảng cáo
router.post("/approve/:id", approveAdBoardEditRequest);

// Đường dẫn để từ chối một yêu cầu chỉnh sửa bảng quảng cáo
router.post("/reject/:id", rejectAdBoardEditRequest);

export default router;
