import express from 'express';
import UserReportModel from '../models/userReport.model.js';
import mongoose from 'mongoose';
import { routeLogger } from '../middlewares/logger.mdw.js'
const router = express.Router();
router.use(routeLogger);
router.post('/', async (req, res) => {
    const reportData = req.body;
    //console.log(req.body);
    const newReport = new UserReportModel(reportData);

    try {
        await newReport.save();
        res.status(201).json(newReport);
        for (const clientId of global.connectedClients) {
            console.log(clientId);
            global.io.to(clientId).emit('notification', newReport);
        }

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { processMethod, status, updatedTime } = req.body;

    try {
        const updatedReport = await UserReportModel.findByIdAndUpdate(id, { processMethod, status, updatedTime }, { new: true });
        res.status(200).json(updatedReport);
        for (const citizenId of global.connectedCitizens) {
            console.log(citizenId);
            global.io.to(citizenId).emit('notification', updatedReport);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
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
router.post('/type/:type', async (req, res) => {
    try {
        const area = req.body.area || "";
        const reports = await UserReportModel.find({ type: req.params.type, area: { $regex: area, $options: 'i' } });
        res.status(200).json({
            data: reports,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post('/adBoardtype/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const reports = await UserReportModel.find({ type: 'adboard', reference_id: id });
        res.status(200).json({
            data: reports,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.post('/findByRpType', async (req, res) => {
    try {
        const data = await UserReportModel.find({
            reportType: { $regex: req.body.area, $options: 'i' },
        });
        console.log(req.body.area);
        if (data) {
          res.status(200).json({
            message: "findByRpType",
            data,
          });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
          error: "Internal Error",
        });
    }
});

router.post("/updateRpType", async (req, res) => {
    const { oldRpType, newRpType } = req.body;
    console.log(oldRpType, newRpType);
    try {
      const updatedType = await UserReportModel.updateMany({ reportType: oldRpType }, { $set:{reportType: newRpType} });
      res.status(200).json(updatedType);
    } catch (err) {
      res.status(500).json({ message: err.message });
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