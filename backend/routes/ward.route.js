import express from 'express';
import WardModel from '../models/ward.model.js';
import mongoose from 'mongoose';
import { routeLogger } from '../middlewares/logger.mdw.js'
import validate from "../middlewares/validate.mdw.js"
import wardSchemas from "../schemas/ward.schemas.js"
import { isAuthenticated } from '../middlewares/authentication.mdw.js';


const router = express.Router();

router.use(routeLogger);

router.post('/findByDistrict',isAuthenticated, async (req, res) => {
    try {
        const data = await WardModel.find(
            {'district': {$regex: req.body.district, $options: 'i'}}
        )
        if (data) {
            res.status(200).json({
                message: "findByDistrict",
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


router.post('/',isAuthenticated,validate(wardSchemas.ward_schema), async (req, res) => {
    const ward = req.body;
    //console.log(req.body);
    const newWard = new WardModel(ward);

    try {
        await newWard.save();    
        res.status(201).json({data:newWard,token: req.token});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})

router.post("/findWard",isAuthenticated, async (req, res) => {
    try {
      const data = await WardModel.find({
        name: { $regex: req.body.area, $options: 'i' },
        district: { $regex: req.body.district, $options: 'i' },
      });
      console.log(req.body.area);
      if (data) {
        res.status(200).json({
          message: "findWard",
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


router.put('/:id',isAuthenticated,validate(wardSchemas.ward_update_schema), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedWard = await WardModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({data:updatedWard,token: req.token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


router.delete("/:id",isAuthenticated, async (req, res) => {
    const { id } = req.params;
  
    try {
        const deleteWard = await WardModel.findByIdAndDelete(id);
        res.status(200).json({data:deleteWard,token: req.token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
  })


export default router;
