import EditAdBoardModel from "../models/editBoard.model.js";
import AdBoardModel from "../models/adBoard.model.js";

// Lấy danh sách yêu cầu chỉnh sửa bảng quảng cáo
export const getAdBoardEditRequests = async (req, res) => {
  try {
    const editRequests = await EditAdBoardModel.find();
    res.status(200).json({ data: editRequests });
  } catch (error) {
    console.error("Error getting ad board edit requests:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Phê duyệt yêu cầu chỉnh sửa bảng quảng cáo
export const approveAdBoardEditRequest = async (req, res) => {
  try {
    const requestId = req.params.id;
    const editRequest = await EditAdBoardModel.findById(requestId);

    if (!editRequest) {
      return res.status(404).json({ message: "Yêu cầu không tồn tại" });
    }

    // Cập nhật thông tin bảng quảng cáo dựa trên thông tin từ yêu cầu chỉnh sửa
    const updatedAdBoard = await AdBoardModel.findByIdAndUpdate(
      editRequest.adBoardId,
      { $set: editRequest.updatedDetails },
      { new: true }
    );

    if (!updatedAdBoard) {
      return res.status(404).json({ message: "Bảng quảng cáo không tồn tại" });
    }

    // Cập nhật trạng thái của yêu cầu
    await EditAdBoardModel.findByIdAndUpdate(requestId, { status: "approved" });

    res.status(200).json({
      message:
        "Yêu cầu phê duyệt thành công, thông tin bảng quảng cáo đã cập nhật",
      updatedAdBoard,
    });
  } catch (error) {
    console.error("Error approving ad board edit request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Từ chối yêu cầu chỉnh sửa bảng quảng cáo
export const rejectAdBoardEditRequest = async (req, res) => {
  const requestId = req.params.id;

  try {
    // Từ chối yêu cầu trong cơ sở dữ liệu
    const updatedRequest = await EditAdBoardModel.findByIdAndUpdate(
      requestId,
      { status: "rejected" },
      { new: true }
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Yêu cầu không tồn tại" });
    }

    res
      .status(200)
      .json({ message: "Từ chối yêu cầu thành công", data: updatedRequest });
  } catch (error) {
    console.error("Error rejecting ad board edit request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default {
  getAdBoardEditRequests,
  approveAdBoardEditRequest,
  rejectAdBoardEditRequest,
};
