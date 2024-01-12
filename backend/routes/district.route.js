import express from 'express'
import DistrictModel from '../models/district.model.js';
import mongoose from 'mongoose';
import { routeLogger } from '../middlewares/logger.mdw.js'
import validate from "../middlewares/validate.mdw.js"
import districtSchemas from "../schemas/district.schemas.js"



const router = express.Router();

router.use(routeLogger);

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


router.post('/', validate(districtSchemas.district_schema), async (req, res) => {
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


router.put('/:id',validate(districtSchemas.district_schema), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedDistrict = await DistrictModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedDistrict);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/findDistrict", async (req, res) => {
    try {
      const data = await DistrictModel.find({
        name: { $regex: req.body.area, $options: 'i' },
      });
      console.log(req.body.area);
      if (data) {
        res.status(200).json({
          message: "findDistrict",
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



router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
      const deleteDistrict = await DistrictModel.findByIdAndDelete(id);
      res.status(200).json(deleteDistrict);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

export default router;
