import React, { useState } from "react";
import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
} from "@chakra-ui/react";
import axios from "axios";

const EditRequestForm = ({ adLocation, onClose, onSubmit }) => {
  const [locationType, setLocationType] = useState("");
  const [advertisingType, setAdvertisingType] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editReason, setEditReason] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Gửi dữ liệu đến hàm onSubmit
    onSubmit({
      locationType,
      advertisingType,
      editTime,
      editReason,
    });
  };

  const handleSendRequest = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/ad-locations/send-edit-request",
        {
          id: adLocation._id,
          updatedLocation: {
            // Thêm các trường tương ứng với thông tin muốn lưu
            locationType,
            advertisingType,
            editTime,
          },
          editReason,
        }
      );
      console.log(response.data);
      onClose(); // Đóng form
    } catch (error) {
      console.error("Error sending edit request:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl id="locationType" isRequired>
        <FormLabel>Loại Điểm Đặt Quảng Cáo</FormLabel>
        <Select
          value={locationType}
          onChange={(e) => setLocationType(e.target.value)}
        >
          {/* Options cho loại điểm đặt quảng cáo */}
          <option value="trungTamThuongMai">Trung Tâm Thương Mại</option>
          <option value="duongPho">Đường Phố</option>
          {/* ...Thêm options khác nếu cần*/}
        </Select>
      </FormControl>

      <FormControl id="advertisingType" isRequired mt={4}>
        <FormLabel>Loại Quảng Cáo</FormLabel>
        <Select
          value={advertisingType}
          onChange={(e) => setAdvertisingType(e.target.value)}
        >
          {/* Options cho loại quảng cáo */}
          <option value="xaHoiHoa">Xã Hội Hóa</option>
          <option value="thuongMai">Thương Mại</option>
          {/* ...Thêm options khác nếu cần*/}
        </Select>
      </FormControl>

      <FormControl id="editTime" mt={4}>
        <FormLabel>Thời Điểm Chỉnh Sửa</FormLabel>
        <Input
          type="text"
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

      <Button mt={4} colorScheme="green" onClick={handleSendRequest}>
        Gửi Yêu Cầu
      </Button>
    </form>
  );
};

export default EditRequestForm;
