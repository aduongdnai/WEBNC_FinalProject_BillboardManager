import mongoose from "mongoose";
const adBoardSchema = new mongoose.Schema({
    location_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdLocation',
    },
    boardType: String,
    width: Number,
    height: Number,
    images: [String],
    expiryDate: Date,
});

const AdBoardModel = mongoose.model('AdBoard', adBoardSchema);
export default AdBoardModel;