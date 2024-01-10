import mongoose from "mongoose";
const userReportSchema = new mongoose.Schema({
    time: String,
    type: String, // 'adboard', 'plannedLocation'
    reportType: String,
    senderName: String,
    email: String,
    phone: String,
    reportContent: String,
    images: [String],
    status: String, // 'Pending', 'Processed'
    area: String,
    reference_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
    processMethod: String,
    updatedTime: String,
    longitude: Number,
    latitude: Number,
});

const UserReportModel = mongoose.model('UserReport', userReportSchema);
export default UserReportModel;