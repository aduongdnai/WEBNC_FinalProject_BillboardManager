import mongoose from "mongoose";
const advertisingLicenseSchema = new mongoose.Schema({
    adBoard: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdBoard',
    },
    companyInfo: {
        name: String,
        email: String,
        phone: String,
        address: String,
    },
    startDate: Date,
    endDate: Date,
    status: String, // 'Pending', 'Approved', 'Rejected'
});

const AdvertisingLicenseModel = mongoose.model('AdvertisingLicense', advertisingLicenseSchema);
export default AdvertisingLicenseModel;