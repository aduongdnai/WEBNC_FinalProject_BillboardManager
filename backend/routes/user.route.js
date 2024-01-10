import express from 'express';
import userModel from '../models/user.model.js';
import bcrypt from "bcrypt";
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
router.put('/:id', async (req, res) => {
    const userId = req.params.id;
    const updateData = req.body; // Dữ liệu cần cập nhật từ frontend

    try {
        // Tìm người dùng theo ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Cập nhật thông tin người dùng
        Object.assign(user, updateData);

        // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
        const updatedUser = await user.save();

        res.status(200).json({
            data: updatedUser,
            msg: "User updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
});


router.put('/change-password/:id', async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    try {
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Verify the old password
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Invalid old password" });
        }

        // Hash the new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the user's password field with the new hashed password
        user.password = hashedPassword;

        // Save the updated user information to the database
        const updatedUser = await user.save();

        res.status(200).json({
            data: updatedUser,
            msg: "Password updated successfully"
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: "Internal Server error"
        });
    }
});
export default router;