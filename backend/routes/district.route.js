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


router.post('/', async (req, res) => {
    const district = req.body;
    //console.log(req.body);
    const newDistrict = new DistrictModel(district);

    try {
        await newDistrict.save();    
        res.status(201).json(newDistrict);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedDistrict = await DistrictModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedDistrict);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
