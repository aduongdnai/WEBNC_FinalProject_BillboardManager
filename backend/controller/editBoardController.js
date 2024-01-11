import EditAdBoardModel from "../models/editBoard.model.js";
import AdBoardModel from "../models/adBoard.model.js";
export const editAdBoard = async (req, res) => {
  try {
    const { id, updatedAdBoard } = req.body;
    const result = await AdBoardModel.findByIdAndUpdate(id, updatedAdBoard, {
      new: true,
    });

    if (result) {
      res
        .status(200)
        .json({ message: "Cập nhật bảng quảng cáo thành công", data: result });
    } else {
      res.status(404).json({ message: "Bảng quảng cáo không tìm thấy" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const sendEditAdBoardRequest = async (req, res) => {
  try {
    const { id, updatedAdBoard } = req.body;
    console.log("id: ", id);
    console.log("updatedAdBoard: ", updatedAdBoard);

    const editRequest = new EditAdBoardModel({
      adBoardId: id,
      updatedDetails: updatedAdBoard,
      status: "pending",
    });

    await editRequest.save();

    res.status(200).json({
      message: "Yêu cầu chỉnh sửa bảng quảng cáo đã được gửi thành công.",
    });
  } catch (error) {
    console.error("Error sending edit ad board request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getEditAdBoardRequests = async (req, res) => {
  try {
    const editRequests = await EditAdBoardModel.find().populate("adBoardId");
    res.status(200).json(editRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
