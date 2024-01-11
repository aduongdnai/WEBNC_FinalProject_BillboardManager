import AdLocationModel from "../models/adLocation.model.js";
import EditRequestModel from "../models/editRequest.model.js";

// Lấy thông tin các điểm đặt quảng cáo theo khu vực
export const getAdLocationsByArea = async (req, res) => {
  try {
    const { area } = req.params;
    const adLocations = await AdLocationModel.find({ area });
    res.json(adLocations);
  } catch (error) {
    res.status(500).send(error);
  }
};

export const getAdBoardsByLocation = async (req, res) => {
  try {
    const locationId = req.params.locationId;
    const adBoards = await AdBoardModel.find({ location_id: locationId });
    res.status(200).json(adBoards);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error });
  }
};

// Hàm chỉnh sửa thông tin điểm đặt quảng cáo
export const editAdLocation = async (req, res) => {
  try {
    const { id, updatedLocation } = req.body;
    const result = await AdLocationModel.findByIdAndUpdate(
      id,
      updatedLocation,
      { new: true }
    );

    if (result) {
      res.status(200).json({ message: "Cập nhật thành công", data: result });
    } else {
      res.status(404).json({ message: "Không tìm thấy điểm đặt quảng cáo" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};

export const sendEditRequest = async (req, res) => {
  try {
    // Lấy dữ liệu từ yêu cầu
    const { id, updatedLocation, editReason } = req.body;

    // Tạo một đối tượng yêu cầu chỉnh sửa mới
    const editRequest = new EditRequestModel({
      adLocationId: id,
      updatedDetails: updatedLocation,
      editReason,
      status: "pending", // hoặc trạng thái mặc định khác
    });

    // Lưu yêu cầu vào cơ sở dữ liệu
    await editRequest.save();

    // Gửi phản hồi thành công
    res
      .status(200)
      .json({ message: "Yêu cầu chỉnh sửa đã được gửi thành công." });
  } catch (error) {
    // Xử lý lỗi
    console.error("Error sending edit request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

//lấy danh sách yêu cầu
export const getEditRequests = async (req, res) => {
  try {
    // Truy vấn cơ sở dữ liệu để lấy danh sách yêu cầu
    const editRequests = // Truy vấn MongoDB để lấy dữ liệu
      res.status(200).json(editRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
