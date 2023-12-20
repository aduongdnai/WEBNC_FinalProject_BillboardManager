import express from 'express'
import AdBoardModel from '../models/adBoard.model.js';
const router = express.Router();

router.get('/:id', async (req, res) => {
    try {
        const data = await AdBoardModel.find({ location_id: req.params.id })
        console.log(data);
        if (data) {
            res.status.json({
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