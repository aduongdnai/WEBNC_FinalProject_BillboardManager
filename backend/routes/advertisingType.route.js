import express from 'express'
import AdvertisingTypeModel from '../models/advertisingType.model.js';
import mongoose from 'mongoose';
import { routeLogger } from '../middlewares/logger.mdw.js'
import validate from "../middlewares/validate.mdw.js"
import advertisingTypeSchemas from '../schemas/advertisingType.schemas.js';
import { isAuthenticated } from '../middlewares/authentication.mdw.js';




const router = express.Router();
router.use(routeLogger);
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const data = await AdvertisingTypeModel.find()

        if (data) {
            res.status(200).json({
                message: "Get All Advertising Type Successfully",
                data,
                token: req.token
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


router.post('/', isAuthenticated, validate(advertisingTypeSchemas.advertising_type_schema), async (req, res) => {
    const advertisingType = req.body;
    //console.log(req.body);
    const newType = new AdvertisingTypeModel(advertisingType);

    try {
        await newType.save();
        res.status(201).json({data:newType,token: req.token});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})


router.put('/:id', isAuthenticated, validate(advertisingTypeSchemas.advertising_type_schema), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedType = await AdvertisingTypeModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({data:updatedType,token: req.token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/findType", isAuthenticated, async (req, res) => {
    try {
        const data = await AdvertisingTypeModel.find({
            name: { $regex: req.body.area, $options: 'i' },
        });
        console.log(req.body.area);
        if (data) {
            res.status(200).json({
                message: "findType",
                data,
                token: req.token
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            error: "Internal Error",
        });
    }
});



router.delete("/:id", isAuthenticated,async (req, res) => {
    const { id } = req.params;

    try {
        const deleteType = await AdvertisingTypeModel.findByIdAndDelete(id);
        res.status(200).json({data:deleteType,token: req.token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
})

export default router;
