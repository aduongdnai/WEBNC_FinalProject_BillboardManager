import mongoose from "mongoose";
const adBoardSchema = new mongoose.Schema({
    location: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdLocation',
    },
    boardType: String,
    size: String,
    images: [String],
    expiryDate: Date,
});

const AdBoardModel = mongoose.model('AdBoard', adBoardSchema);
export default AdBoardModel;