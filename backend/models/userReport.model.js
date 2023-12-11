import mongoose from "mongoose";
const userReportSchema = new mongoose.Schema({
    reportType: String,
    senderName: String,
    email: String,
    phone: String,
    reportContent: String,
    images: [String],
    status: String, // 'Pending', 'Processed'
});

const UserReportModel = mongoose.model('UserReport', userReportSchema);
export default UserReportModel;