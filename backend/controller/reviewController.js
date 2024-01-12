// controllers/reviewController.js
import ReviewRequestModel from "../models/editRequest.model.js";

export const getReviewRequests = async (req, res) => {
  try {
    // Lấy danh sách yêu cầu từ cơ sở dữ liệu
    const reviewRequests = await ReviewRequestModel.find();

    // Gửi danh sách yêu cầu về client
    res.status(200).json({ data: reviewRequests });
  } catch (error) {
    console.error("Error getting review requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const rejectRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    // Từ chối yêu cầu trong cơ sở dữ liệu
    const updatedRequest = await ReviewRequestModel.findByIdAndUpdate(
      requestId,
      { status: "rejected" },
      { new: true }
    );

    // Kiểm tra nếu không tìm thấy yêu cầu
    if (!updatedRequest) {
      return res.status(404).json({ message: "Yêu cầu không tồn tại" });
    }

    // Gửi thông tin yêu cầu đã từ chối về client
    res
      .status(200)
      .json({ message: "Từ chối yêu cầu thành công", data: updatedRequest });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

import AdLocationModel from "../models/adLocation.model.js";

export const approveRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const editRequest = await EditRequestModel.findById(requestId);

    if (!editRequest) {
      return res.status(404).json({ message: "Yêu cầu không tồn tại" });
    }

    // Cập nhật thông tin điểm quảng cáo dựa trên thông tin từ yêu cầu chỉnh sửa
    const updatedAdLocation = await AdLocationModel.findByIdAndUpdate(
      editRequest.adLocationId,
      { $set: editRequest.updatedDetails },
      { new: true }
    );

    if (!updatedAdLocation) {
      return res.status(404).json({ message: "Điểm quảng cáo không tồn tại" });
    }

    // Cập nhật trạng thái của yêu cầu
    await EditRequestModel.findByIdAndUpdate(requestId, { status: "approved" });

    res.status(200).json({
      message:
        "Yêu cầu phê duyệt thành công, thông tin điểm quảng cáo đã cập nhật",
      updatedAdLocation,
    });
  } catch (error) {
    console.error("Error approving request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
