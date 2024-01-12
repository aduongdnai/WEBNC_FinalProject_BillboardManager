import express from "express";
import AdLocationModel from "../models/adLocation.model.js";
import mongoose from "mongoose";
import { routeLogger } from "../middlewares/logger.mdw.js";
const router = express.Router();
router.use(routeLogger);
import {
  sendEditRequest,
  editAdLocation,
} from "../controller/adLocationController.js";
import { isAuthenticated } from "../middlewares/authentication.mdw.js";
import { getReviewRequests } from "../controller/reviewController.js";

// Đường dẫn cho việc cập nhật thông tin điểm đặt quảng cáo
router.post("/edit", editAdLocation);

router.get("/filter", isAuthenticated, async (req, res) => {
  try {
    let planned = req.query.planned === "true";
    //let reported = Boolean(req.query.reported);
    let data;
    if (!planned) {
      data = await AdLocationModel.find({ planned: planned });
    } else {
      data = await AdLocationModel.find();
    }
    if (data) {
      res.status(200).json({
        message: "Get All Ad Location Successfully",
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
router.get("/", isAuthenticated, async (req, res) => {
  try {
    const data = await AdLocationModel.find();

    if (data) {
      res.status(200).json({
        message: "Get All Ad Location Successfully",
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
router.post("/findByArea", isAuthenticated, async (req, res) => {
  try {
    console.log(req.body.area);
    const data = await AdLocationModel.find({
      area: { $regex: req.body.area, $options: 'i' },
    });
    console.log(req.body.area);
    if (data) {
      res.status(200).json({
        message: "findByArea",
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

router.post("/findByAdType", isAuthenticated, async (req, res) => {
  try {
    const data = await AdLocationModel.find({
      advertisingType: { $regex: req.body.area, $options: 'i' },
    });
    console.log(req.body.area);
    if (data) {
      res.status(200).json({
        message: "findByAdType",
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


router.put("/updateAdType", isAuthenticated, async (req, res) => {
  const { oldAdType, newAdType } = req.body;
  console.log(oldAdType, newAdType);
  try {
    const updatedType = await AdLocationModel.updateMany({ advertisingType: oldAdType }, { $set: { advertisingType: newAdType } });
    res.status(200).json(updatedType);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post("/", isAuthenticated, async (req, res) => {
  try {
    const newAdLocation = new AdLocationModel(req.body);
    console.log(req.body);
    const result = await newAdLocation.save();
    console.log(result);

    res.status(200).json({
      result,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Internal Error",
      msg: err.message,
    });
  }
});
router.get("/:id", isAuthenticated, async (req, res) => {
  try {
    const id = req.params.id;

    // Validate the ID
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).send("Invalid ID");
    }

    const objectId = new mongoose.Types.ObjectId(id);
    const data = await AdLocationModel.find({ _id: objectId });
    console.log(data);
    if (data) {
      res.status(200).json({
        message: "Get location location ID Successfully",
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

// Route mới để lấy các địa điểm quảng cáo theo khu vực
router.get("/area/:area", isAuthenticated, async (req, res) => {
  try {
    const { area } = req.params;
    const data = await AdLocationModel.find({ area });
    res.status(200).json({ message: "Success", data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Error" });
  }
});

// Đường dẫn cho việc cập nhật thông tin điểm đặt quảng cáo dựa trên ID
router.post("/update/:id", isAuthenticated, async (req, res) => {
  try {
    const updatedAdLocation = await AdLocationModel.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedAdLocation) {
      return res.status(404).json({ message: "Điểm quảng cáo không tồn tại" });
    }
    res
      .status(200)
      .json({ message: "Cập nhật thành công", data: updatedAdLocation });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/send-edit-request", sendEditRequest);

router.get("/review-requests", getReviewRequests);

export default router;
