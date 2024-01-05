import express from 'express'
import AdBoardModel from '../models/adBoard.model.js';
import mongoose from 'mongoose';
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const objectId = new mongoose.Types.ObjectId(req.params.id)
        const data = await AdBoardModel.find({ location_id: objectId })
        console.log(data);
        if (data) {
            res.status(200).json({
                message: "Get All Ad Board By location ID Successfully",
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
router.get('/find/:id', async (req, res) => {
    try {
        const objectId = new mongoose.Types.ObjectId(req.params.id)
        const data = await AdBoardModel.find({ _id: objectId })
        console.log(data);
        if (data) {
            res.status(200).json({
                message: "Get Ad Board By ID Successfully",
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
    try {
        const newAdBoard = new AdBoardModel(req.body);
        console.log(req.body);
        const result = await newAdBoard.save()
        console.log(result);

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

})
export default router;