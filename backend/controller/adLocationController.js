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

// Hàm gửi yêu cầu chỉnh sửa thông tin điểm đặt quảng cáo
export const sendEditRequest = async (req, res) => {
  try {
    const { id, updatedLocation, editReason } = req.body;

    // Lưu yêu cầu vào cơ sở dữ liệu
    const editRequest = new EditRequestModel({
      locationId: id,
      updatedData: updatedLocation,
      editReason,
    });
    await editRequest.save();

    res.status(200).json({ message: "Yêu cầu đã được gửi" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Lỗi server", error });
  }
};
