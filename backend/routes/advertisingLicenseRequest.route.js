import express from 'express';
import AdvertisingLicenseRequest from '../models/advertisingLicenseRequest.model.js';
import { routeLogger } from '../middlewares/logger.mdw.js'
import AdLocationModel from '../models/adLocation.model.js';
import AdBoardModel from '../models/adBoard.model.js';
import { isAuthenticated } from '../middlewares/authentication.mdw.js';
import validateMdw from '../middlewares/validate.mdw.js';
import advertisingLicenseRequestSchema from '../schemas/advertisingLicenseRequest.schema.js';
// backend/routes/advertisingLicense.route.js
const router = express.Router();
router.use(routeLogger);

router.post('/', isAuthenticated, validateMdw(advertisingLicenseRequestSchema.advertisingLicenseRequestSchema), async (req, res) => {
    try {
        const newAdvertisingLicense = new AdvertisingLicenseRequest({
            ...req.body,
            companyInfo: req.body.companyInfo
        });
        //console.log(req.body);
        const result = await newAdvertisingLicense.save()
        res.status(200).json({
            data: result
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Error"
        })
    }
});
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const result = await AdvertisingLicenseRequest.find();
        res.status(200).json({
            data: result
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Error"
        })
    }

});
router.get('/adboard/:id', isAuthenticated, async (req, res) => {
    try {
        const result = await AdvertisingLicenseRequest.find({ adBoard: req.params.id });
        res.status(200).json({
            data: result
        })
    }
    catch {
        console.log(err);
        res.status(500).json({
            error: "Internal Error"
        })
    }
});
router.get('/:user_id', isAuthenticated, async (req, res) => {
    try {
        const result = await AdvertisingLicenseRequest.find({ user_id: req.params.user_id });
        res.status(200).json({
            data: result
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Error"
        })
    }

});
router.patch('/:id', isAuthenticated, async (req, res) => {
    try {
        const updatedRequest = await AdvertisingLicenseRequest.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true });
        res.status(200).json({
            data: updatedRequest,
            msg: "success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
});
router.delete('/:id', isAuthenticated, async (req, res) => {
    try {
        const updatedRequest = await AdvertisingLicenseRequest.findOneAndDelete({ _id: req.params.id });
        res.status(200).json({
            msg: "success"
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
});
router.get("/adlocation/:id", isAuthenticated, async (req, res) => {
    try {
        const AdboardResult = await AdBoardModel.findById({ _id: req.params.id });
        let result;
        if (AdboardResult) {
            result = await AdLocationModel.find({ _id: AdboardResult.location_id });
        }

        res.status(200).json({
            data: result
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "Internal Server error"
        })
    }
});
export default router;