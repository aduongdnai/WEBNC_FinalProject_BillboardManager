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

router.put('/:id/change-password', async (req, res) => {
    const userId = req.params.id;
    const { oldPassword, newPassword } = req.body;

    try {
        // Tìm người dùng theo ID
        const user = await userModel.findById(userId);

        if (!user) {
            return res.status(404).json({ msg: "User not found" });
        }

        // Kiểm tra mật khẩu cũ
        const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

        if (!isPasswordValid) {
            return res.status(400).json({ msg: "Incorrect old password" });
        }

        // Mã hóa mật khẩu mới và cập nhật vào cơ sở dữ liệu
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedNewPassword;

        // Lưu thông tin người dùng đã cập nhật vào cơ sở dữ liệu
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