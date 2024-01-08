import express from 'express';
import AdvertisingLicenseRequest from '../models/advertisingLicenseRequest.model.js';
// backend/routes/advertisingLicense.route.js
const router = express.Router();


router.post('/', async (req, res) => {
    try {
        const newAdvertisingLicense = new AdvertisingLicenseRequest({
            ...req.body,
            companyInfo: req.body.companyInfo
        });
        //console.log(req.body);
        const result = await newAdvertisingLicense.save()
        res.status(200).json({
            result
        })
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Error"
        })
    }
});
router.get('/', async (req, res) => {
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
router.get('/:user_id', async (req, res) => {
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
router.put('/:id', async (req, res) => {

});
router.delete('/:id', async (req, res) => {

});

export default router;