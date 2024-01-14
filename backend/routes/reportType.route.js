import express from 'express'
import ReportTypeModel from '../models/reportType.model.js';
import mongoose from 'mongoose';
import { routeLogger } from '../middlewares/logger.mdw.js'
import { isAuthenticated } from '../middlewares/authentication.mdw.js'
import validate from '../middlewares/validate.mdw.js';
import reportTypeSchemas from '../schemas/reportType.schemas.js';
const router = express.Router();

router.use(routeLogger);

router.get('/', async (req, res) => {
    try {
        const data = await ReportTypeModel.find()
        
        if (data) {
            res.status(200).json({
                message: "Get All Report Type Successfully",
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


router.post('/', isAuthenticated,validate(reportTypeSchemas.report_type_schema), async (req, res) => {
    const rpType = req.body;
    //console.log(req.body);
    const newRpType = new ReportTypeModel(rpType);

    try {
        await newRpType.save();    
        res.status(201).json({data:newRpType,token: req.token});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }

})


router.put('/:id', isAuthenticated,validate(reportTypeSchemas.report_type_schema), async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
        const updatedRpType = await ReportTypeModel.findByIdAndUpdate(id, { name }, { new: true });
        res.status(200).json({data:updatedRpType,token: req.token});
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

router.post("/findRpType", async (req, res) => {
    try {
      const data = await ReportTypeModel.find({
        name: { $regex: req.body.area, $options: 'i' },
      });
      console.log(req.body.area);
      if (data) {
        res.status(200).json({
          message: "find Report Type",
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



router.delete("/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;

  try {
      const deleteRpType = await ReportTypeModel.findByIdAndDelete(id);
      res.status(200).json({data:deleteRpType,token: req.token});
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
})

export default router;
