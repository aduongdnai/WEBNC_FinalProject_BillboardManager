import express from 'express';
import WardModel from '../models/ward.model.js';
import mongoose from 'mongoose';
const router = express.Router();



router.post('/findByDistrict', async (req, res) => {
    try {
        const data = await WardModel.find(
            {'district': {$regex: req.body.district}}
        )
        if (data) {
            res.status(200).json({
                message: "findByDistrict",
                data
            })
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Error"
        })
    }

})


export default router;
