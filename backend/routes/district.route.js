import express from 'express'
import DistrictModel from '../models/district.model.js';
import mongoose from 'mongoose';
const router = express.Router();



router.get('/', async (req, res) => {
    try {
        const data = await DistrictModel.find()
        
        if (data) {
            res.status(200).json({
                message: "Get All District Successfully",
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
