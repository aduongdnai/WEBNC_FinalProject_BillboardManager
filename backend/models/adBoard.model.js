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
    expiryDate: {
        type: Date,
        default: null,
    },
    advertisingLicense_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdvertisingLicenseRequest',
        default: null,
    },
});

const AdBoardModel = mongoose.model('AdBoard', adBoardSchema);
export default AdBoardModel;