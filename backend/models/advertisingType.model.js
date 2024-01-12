import mongoose from 'mongoose';

const advertisingTypeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
});


const AdvertisingTypeModel = mongoose.model('AdvertisingType', advertisingTypeSchema);

export default AdvertisingTypeModel;
