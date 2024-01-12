import express from 'express'
import AdLocationEditRequestModel from '../models/adLocationEditRequest.model.js';
import { routeLogger } from '../middlewares/logger.mdw.js'
const router = express.Router();

router.use(routeLogger);
// Get all ad location edit requests
router.get('/', async (req, res) => {
    try {
        const adLocationEditRequests = await AdLocationEditRequestModel.find();
        res.json(adLocationEditRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a new ad location edit request
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const savedRequest = await new AdLocationEditRequestModel(req.body).save();
        res.status(201).json(savedRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update ad location edit request by ID
router.put('/:id', async (req, res) => {
    try {
        const adLocationEditRequest = await AdLocationEditRequestModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(adLocationEditRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get ad location edit request by ID
router.get('/:id', async (req, res) => {
    try {
        const adLocationEditRequest = await AdLocationEditRequestModel.findById(req.params.id);
        if (!adLocationEditRequest) {
            return res.status(404).json({ message: 'Ad location edit request not found' });
        }
        res.json(adLocationEditRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
