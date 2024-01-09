import mongoose from 'mongoose';

const wardSchema = new mongoose.Schema({
    district: String,
    name: String,
});


const WardModel = mongoose.model('Ward', wardSchema);

export default WardModel;
