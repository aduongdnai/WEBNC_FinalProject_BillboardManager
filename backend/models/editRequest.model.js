import mongoose from "mongoose";

const editRequestSchema = new mongoose.Schema({
  adLocationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdLocation",
    required: true,
  },
  updatedDetails: {
    locationType: { type: String, required: true },
    advertisingType: { type: String, required: true },
    editTime: { type: Date, required: true },
    // Thêm bất kỳ trường dữ liệu nào khác được gửi từ form chỉnh sửa
  },
  editReason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  // Các trường bổ sung khác nếu cần
});

const EditRequestModel = mongoose.model("EditRequest", editRequestSchema);

export default EditRequestModel;
