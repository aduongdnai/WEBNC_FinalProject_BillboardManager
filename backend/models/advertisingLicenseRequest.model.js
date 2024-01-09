import mongoose from "mongoose";
const advertisingLicenseSchema = new mongoose.Schema({
    adBoard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdBoard',
    },
    companyInfo: {
        name: String,
        contact: {
            email: String,
            phone: String,
            address: String
        }
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    adContent: String,
    adImage: [String],
    startDate: Date,
    endDate: Date,
    status: String, // 'Pending', 'Approved', 'Rejected'
});

const AdvertisingLicenseModel = mongoose.model('AdvertisingLicenseRequest', advertisingLicenseSchema);
export default AdvertisingLicenseModel;