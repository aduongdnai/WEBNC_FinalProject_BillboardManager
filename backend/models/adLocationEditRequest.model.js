import mongoose from 'mongoose';

// Model for Ad Locations
const adLocationEditRequestSchema = new mongoose.Schema({
    userRequest:String,
    locationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'adlocation'
    },
    locationType: String,
    advertisingType: String,
    image: String,
    planned: Boolean,
    numberAdBoard: {
        type: Number,
        default: 0
    },
    reason:String,
    status: String,
    
},
{ timestamps: true });

const AdLocationEditRequestModel = mongoose.model('adlocation_edit_request', adLocationEditRequestSchema);

export default AdLocationEditRequestModel;
