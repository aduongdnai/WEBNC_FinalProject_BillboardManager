import express from 'express'
import AdBoardEditRequestModel from '../models/adBoardEditRequest.model.js';
import UserModel from '../models/user.model.js';
import AdBoardModel from '../models/adBoard.model.js';
import AdLocationModel from '../models/adLocation.model.js';
import { routeLogger } from '../middlewares/logger.mdw.js'
const router = express.Router();

router.use(routeLogger);
// Get all ad location edit requests
router.get('/', async (req, res) => {
    try {
        const adBoardEditRequests = await AdBoardEditRequestModel.find();
        res.json(adBoardEditRequests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
// Create a new ad location edit request
router.post('/', async (req, res) => {
    console.log(req.body);
    try {
        const savedRequest = await new AdBoardEditRequestModel(req.body).save();
        res.status(201).json(savedRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update ad location edit request by ID
router.put('/:id', async (req, res) => {
    try {
        const adBoardEditRequest = await AdBoardEditRequestModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(adBoardEditRequest);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.post('/findByUserRequest/', async (req, res) => {
    try {
        var adBoardEditRequests;
        if (!req.body.userRequest) {
            adBoardEditRequests = await AdBoardEditRequestModel.find();
        }else{
            adBoardEditRequests = await AdBoardEditRequestModel.find({ userRequest: req.body.userRequest });
        }
        const adBoardEditRequestsWithUser = await Promise.all(adBoardEditRequests.map(async (adBoardEditRequest) => {
            
            const user = await UserModel.findOne({ email: adBoardEditRequest.userRequest });
            const adBoard = await AdBoardModel.findById(adBoardEditRequest.adBoardId);
            const adLocation = await AdLocationModel.findById(adBoard.location_id);
            return {
                ...adBoardEditRequest.toObject(),
                user,
                adBoard,
                adLocation
            };
        }));
        res.json(adBoardEditRequestsWithUser);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// Get ad location edit request by ID
router.get('/:id', async (req, res) => {
    try {
        const adBoardEditRequest = await AdBoardEditRequestModel.findById(req.params.id);
        if (!adBoardEditRequest) {
            return res.status(404).json({ message: 'Ad location edit request not found' });
        }
        res.json(adBoardEditRequest);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

export default router;
