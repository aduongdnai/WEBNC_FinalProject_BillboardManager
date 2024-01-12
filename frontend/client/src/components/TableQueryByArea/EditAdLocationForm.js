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
      console.log(locationType,advertisingType,editTime);
      const response = await axios.post(
        "http://localhost:5000/api/v1/adlocations/send-edit-request",
        {
          id: adLocation._id,
          updatedLocation: {
            // Thêm các trường tương ứng với thông tin muốn lưu
            locationType,
            advertisingType,
            editTime,
          },

          // updatedDetails: {
          //   locationType,
          //   advertisingType,
          //   editTime,
          //   // Thêm bất kỳ trường dữ liệu nào khác được gửi từ form chỉnh sửa
          // },
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

          <option value="Đất công/Công viên/Hành lang an toàn giao thông">
            Đất công/Công viên/Hành lang an toàn giao thông
          </option>

          <option value="Đất tư nhân/Nhà ở riêng lẻ">
            Đất tư nhân/Nhà ở riêng lẻ
          </option>

          <option value="Trung tâm thương mại">Trung tâm thương mại</option>

          <option value="Chợ">Chợ</option>
          <option value="Cây xăng">Cây xăng</option>
          <option value="Nhà chờ xe buýt">Nhà chờ xe buýt</option>
        </Select>
      </FormControl>

      <FormControl id="advertisingType" isRequired mt={4}>
        <FormLabel>Hình thức quảng cáo</FormLabel>
        <Select
          value={advertisingType}
          onChange={(e) => setAdvertisingType(e.target.value)}
        >
          {/* Options cho loại quảng cáo */}
          <option value="Cổ động chính trị">Cổ động chính trị</option>

          <option value="Quảng cáo thương mại">Quảng cáo thương mại</option>

          <option value="Xã hội hoá">Xã hội hoá</option>

          {/* ...Thêm options khác nếu cần*/}
        </Select>
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

      <Button mt={4} colorScheme="green" onClick={handleSendRequest}>
        Gửi Yêu Cầu
      </Button>
    </form>
  );
};

export default EditRequestForm;
