import mongoose from 'mongoose';

const districtSchema = new mongoose.Schema({
    name: String,
});


const DistrictModel = mongoose.model('District', districtSchema);

export default DistrictModel;
