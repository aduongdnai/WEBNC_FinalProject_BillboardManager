import express from 'express'
import AdLocationEditRequestModel from '../models/adLocationEditRequest.model.js';
import UserModel from '../models/user.model.js';
import AdLocationModel from '../models/adLocation.model.js';
import { routeLogger } from '../middlewares/logger.mdw.js'
import { isAuthenticated } from '../middlewares/authentication.mdw.js'
import validate from '../middlewares/validate.mdw.js';
import RequestSchemas from '../schemas/EditRequest.schemas.js';
const router = express.Router();

router.use(routeLogger);
// Get all ad location edit requests
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const adLocationEditRequests = await AdLocationEditRequestModel.find();
        res.json({data:adLocationEditRequests,token: req.token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all ad location edit requests by userRequest
router.post('/findByUserRequest/', isAuthenticated, async (req, res) => {
    try {
        var adLocationEditRequests;
        if (!req.body.userRequest) {
            adLocationEditRequests = await AdLocationEditRequestModel.find();
        }else{
            adLocationEditRequests = await AdLocationEditRequestModel.find({ userRequest: req.body.userRequest });
        }
        const adLocationEditRequestsWithUser = await Promise.all(adLocationEditRequests.map(async (adLocationEditRequest) => {
            const user = await UserModel.findOne({ email: adLocationEditRequest.userRequest });
            const adLocation = await AdLocationModel.findById(adLocationEditRequest.locationId);
            return {
                ...adLocationEditRequest.toObject(),
                user,
                adLocation
            };
        }));

        res.json({data:adLocationEditRequestsWithUser,token: req.token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new ad location edit request
router.post('/', isAuthenticated,validate(RequestSchemas.req_schema), async (req, res) => {
    console.log(req.body);
    try {
        const savedRequest = await new AdLocationEditRequestModel(req.body).save();
        res.status(201).json({data:savedRequest,token: req.token});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update ad location edit request by ID
router.put('/:id', isAuthenticated,validate(RequestSchemas.req_update_schema), async (req, res) => {
    try {
        const adLocationEditRequest = await AdLocationEditRequestModel.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        const location = await AdLocationModel.findById(adLocationEditRequest.locationId);
        for (const clientId of global.connectedClients) {
            console.log(clientId);
            global.io.to(clientId).emit('UPDATE_LOCATION_NOTIFICATION', {...adLocationEditRequest, location: location});
        }
        res.json({data:adLocationEditRequest,token: req.token});
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Get ad location edit request by ID
router.get('/:id',  isAuthenticated, async (req, res) => {
    try {
        const adLocationEditRequest = await AdLocationEditRequestModel.findById(req.params.id);
        if (!adLocationEditRequest) {
            return res.status(404).json({ message: 'Ad location edit request not found' });
        }
        res.json({data:adLocationEditRequest,token: req.token});
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});



export default router;
