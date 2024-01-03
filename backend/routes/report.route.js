import express from 'express';
import UserReportModel from '../models/userReport.model.js';

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

export default router;