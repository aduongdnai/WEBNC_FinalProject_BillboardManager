import mongoose from "mongoose";
const userReportSchema = new mongoose.Schema({
    reportType: String,
    senderName: String,
    email: String,
    phone: String,
    reportContent: String,
    images: [String],
    status: String, // 'Pending', 'Processed'
    adboard_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdLocation',
    },
});

const UserReportModel = mongoose.model('UserReport', userReportSchema);
export default UserReportModel;