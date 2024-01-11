import mongoose from 'mongoose';

const advertisingTypeSchema = new mongoose.Schema({
    name: String,
});


const AdvertisingTypeModel = mongoose.model('AdvertisingType', advertisingTypeSchema);

export default AdvertisingTypeModel;
