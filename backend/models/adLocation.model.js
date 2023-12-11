import mongoose from 'mongoose';

// Model for Ad Locations
const adLocationSchema = new mongoose.Schema({
    address: String,
    area: String,
    locationType: String,
    advertisingType: String,
    image: String,
    planned: Boolean,
    coordinates: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],
    },
});

adLocationSchema.index({ coordinates: '2dsphere' });

const AdLocationModel = mongoose.model('AdLocation', adLocationSchema);

export default AdLocationModel;
