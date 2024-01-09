import express from 'express';
import userModel from '../models/user.model.js';

const router = express.Router();
router.get('/:id', async (req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        res.status(200).json({
            data: user,
            msg: "success"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
})
export default router;