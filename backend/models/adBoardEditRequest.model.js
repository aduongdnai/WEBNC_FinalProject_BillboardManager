import mongoose from "mongoose";
const adBoardEditRequestSchema = new mongoose.Schema({
    userRequest: String,
    adBoardId: String,
    boardType: String,
    width: Number,
    height: Number,
    reason: String,
    status: String,
},{ timestamps: true });

const AdBoardEditRequestModel = mongoose.model('adboard_edit_request', adBoardEditRequestSchema);
export default AdBoardEditRequestModel;