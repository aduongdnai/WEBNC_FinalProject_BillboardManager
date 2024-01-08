// controllers/reviewController.js
import ReviewRequestModel from "../models/reviewRequest.model";

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

export const approveRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    // Xác nhận yêu cầu trong cơ sở dữ liệu
    const updatedRequest = await ReviewRequestModel.findByIdAndUpdate(
      requestId,
      { status: "approved" },
      { new: true }
    );

    // Kiểm tra nếu không tìm thấy yêu cầu
    if (!updatedRequest) {
      return res.status(404).json({ message: "Yêu cầu không tồn tại" });
    }

    // Gửi thông tin yêu cầu đã xác nhận về client
    res
      .status(200)
      .json({ message: "Xác nhận yêu cầu thành công", data: updatedRequest });
  } catch (error) {
    console.error("Error approving request:", error);
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
