import mongoose from "mongoose";
const userReportSchema = new mongoose.Schema({
    type: String, // 'adboard', 'plannedLocation'
    reportType: String,
    senderName: String,
    email: String,
    phone: String,
    reportContent: String,
    images: [String],
    status: String, // 'Pending', 'Processed'
    reference_id: {
        type: mongoose.Schema.Types.ObjectId,
    },
});

const UserReportModel = mongoose.model('UserReport', userReportSchema);
export default UserReportModel;