import express from 'express'
import AdLocationModel from '../models/adLocation.model.js';
import mongoose from 'mongoose';
const router = express.Router();
router.get('/filter', async (req, res) => {
    try {

        let planned = req.query.planned === 'true';
        //let reported = Boolean(req.query.reported);
        let data;
        if (planned) {

            data = await AdLocationModel.find({ planned: planned })
        }
        else {
            data = await AdLocationModel.find()
        }
        if (data) {
            res.status(200).json({
                message: "Get All Ad Location Successfully",
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
router.get('/', async (req, res) => {
    try {
        const data = await AdLocationModel.find()

        if (data) {
            res.status(200).json({
                message: "Get All Ad Location Successfully",
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
router.post('/findByArea', async (req, res) => {
    try {
        const data = await AdLocationModel.find(
            {'area': {$regex: req.body.area}}
        )
        console.log(req.body.area);
        if (data) {
            res.status(200).json({
                message: "findByArea",
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
        const newAdLocation = new AdLocationModel(req.body);
        console.log(req.body);
        const result = await newAdLocation.save()
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
router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Validate the ID
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send('Invalid ID');
        }

        const objectId = new mongoose.Types.ObjectId(id);
        const data = await AdLocationModel.find({ _id: objectId })
        console.log(data);
        if (data) {
            res.status(200).json({
                message: "Get location location ID Successfully",
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