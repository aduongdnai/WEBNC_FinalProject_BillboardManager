import express from 'express';
import UserReportModel from '../models/userReport.model.js';
import mongoose from 'mongoose';
const router = express.Router();

router.post('/', async (req, res) => {
    const reportData = req.body;
    //console.log(req.body);
    const newReport = new UserReportModel(reportData);

    try {
        await newReport.save();
        res.status(201).json(newReport);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const reports = await UserReportModel.find();
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const objectId = new mongoose.Types.ObjectId(req.params.id)
        const data = await UserReportModel.find({ _id: objectId })
        console.log(data);
        if (data) {
            res.status(200).json({
                message: "Get rp by ID Successfully",
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
});

router.get('/area/:area', async (req, res) => {
    try {
        const area = req.params.area;
        const reports = await UserReportModel.find({ area: { $regex: area, $options: 'i' } });
        res.status(200).json(reports);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;