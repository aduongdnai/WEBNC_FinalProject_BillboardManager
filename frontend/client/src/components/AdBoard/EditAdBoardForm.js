import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";

const EditAdBoardForm = ({ adBoard, onClose, onSubmit }) => {
  // Các state cho các trường trong form
  const [boardType, setBoardType] = useState(adBoard.boardType);
  const [width, setWidth] = useState(adBoard.width);
  const [height, setHeight] = useState(adBoard.height);
  const [editTime, setEditTime] = useState("");
  const [editReason, setEditReason] = useState("");
  // Thêm các state khác nếu cần

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      boardType,
      width,
      height,
      editTime,
      editReason,
    });
  };

  const handleSendRequest = async () => {
    console.log("id: ", adBoard._id);
    console.log({
      // Đối tượng chứa thông tin cần cập nhật
      boardType,
      width,
      height,
      editTime,
      editReason,
    });
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/adboards/send-edit-boards",
        {
          id : adBoard._id, // ID của bảng quảng cáo cần chỉnh sửa

          updatedAdBoard: {
            // Đối tượng chứa thông tin cần cập nhật
            boardType,
            width,
            height,
            editTime,
            editReason,
          },
        }
      );
      console.log(response.data);
      onClose(); // Đóng modal sau khi gửi yêu cầu
    } catch (error) {
      console.error("Error sending edit ad board request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="boardType" isRequired>
        <FormLabel>Loại Bảng</FormLabel>
        <Select
          value={boardType}
          onChange={(e) => setBoardType(e.target.value)}
        >
          <option value="Trụ bảng hiflex">Trụ bảng hiflex</option>

          <option value=" Trụ màn hình điện tử LED">
            {" "}
            Trụ màn hình điện tử LED
          </option>

          <option value="Trụ hộp đèn">Trụ hộp đèn</option>

          <option value="Bảng hiflex ốp tường">Bảng hiflex ốp tường</option>

          <option value="Màn hình điện tử ốp tường">
            Màn hình điện tử ốp tường
          </option>

          <option value="Trụ treo băng rôn dọc">Trụ treo băng rôn dọc</option>

          <option value="Trụ treo băng rôn ngang">
            Trụ treo băng rôn ngang
          </option>

          <option value="Trụ/Cụm pano">Trụ/Cụm pano</option>

          <option value="Cổng chào">Cổng chào</option>

          <option value="Trung tâm thương mại">Trung tâm thương mại</option>
        </Select>
      </FormControl>

      <FormControl id="width" isRequired mt={4}>
        <FormLabel>Chiều Rộng</FormLabel>
        <Input
          type="number"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
        />
      </FormControl>

      <FormControl id="height" isRequired mt={4}>
        <FormLabel>Chiều Cao</FormLabel>
        <Input
          type="number"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
        />
      </FormControl>

      <FormControl id="editTime" mt={4}>
        <FormLabel>Thời Điểm Chỉnh Sửa</FormLabel>
        <Input
          type="date" // Thay đổi ở đây
          value={editTime}
          onChange={(e) => setEditTime(e.target.value)}
        />
      </FormControl>

      <FormControl id="editReason" isRequired mt={4}>
        <FormLabel>Lý Do Chỉnh Sửa</FormLabel>
        <Textarea
          value={editReason}
          onChange={(e) => setEditReason(e.target.value)}
        />
      </FormControl>

      {/* Thêm các FormControl khác nếu cần */}

      <Button mt={4} colorScheme="green" onClick={handleSendRequest}>
        Gửi Yêu Cầu
      </Button>
      <Button mt={4} colorScheme="red" onClick={onClose}>
        Hủy
      </Button>
    </form>
  );
};

export default EditAdBoardForm;
