import express from 'express';
import WardModel from '../models/ward.model.js';
import mongoose from 'mongoose';
const router = express.Router();



router.post('/findByDistrict', async (req, res) => {
    try {
        const data = await WardModel.find(
            {'district': {$regex: req.body.district, $options: 'i'}}
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


router.post('/', async (req, res) => {
    const ward = req.body;
    //console.log(req.body);
    const newWard = new WardModel(ward);

    try {
        await newWard.save();    
        res.status(201).json(newWard);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedWard = await WardModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedWard);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;
