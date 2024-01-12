import mongoose from 'mongoose';

const reportTypleSchema = new mongoose.Schema({
    name: String,
});


const ReportTypeModel = mongoose.model('report_types', reportTypleSchema);

export default ReportTypeModel;
