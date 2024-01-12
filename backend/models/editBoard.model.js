import mongoose from "mongoose";

const editAdBoardSchema = new mongoose.Schema({
  adBoardId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AdBoard",
    required: true,
  },
  updatedDetails: {
    boardType: { type: String, required: true },
    width: { type: Number, required: true },
    height: { type: Number, required: true },
    editTime: { type: Date },
    editReason: {
      type: String,
    },
  },
  status: {
    type: String,
    default: "pending",
    required: true,
  },
  // Các trường bổ sung khác nếu cần
});

const EditAdBoardModel = mongoose.model("EditAdBoard", editAdBoardSchema);

export default EditAdBoardModel;
