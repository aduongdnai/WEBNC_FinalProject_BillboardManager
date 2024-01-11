import express from 'express'
import AdvertisingTypeModel from '../models/advertisingType.model.js';
import mongoose from 'mongoose';
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const data = await AdvertisingTypeModel.find()
        
        if (data) {
            res.status(200).json({
                message: "Get All Advertising Type Successfully",
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
    const advertisingType = req.body;
    //console.log(req.body);
    const newType = new AdvertisingTypeModel(advertisingType);

    try {
        await newType.save();    
        res.status(201).json(newType);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})


router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedType = await AdvertisingTypeModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json(updatedType);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/findType", async (req, res) => {
    try {
      const data = await AdvertisingTypeModel.find({
        name: { $regex: req.body.area, $options: 'i' },
      });
      console.log(req.body.area);
      if (data) {
        res.status(200).json({
          message: "findType",
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
      const deleteType = await AdvertisingTypeModel.findByIdAndDelete(id);
      res.status(200).json(deleteType);
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

export default router;
