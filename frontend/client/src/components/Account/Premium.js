import {
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  VStack,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Premium() {
  const toast = useToast();
  const [isRoleSelectDisabled, setIsRoleSelectDisabled] = useState(true);
  const [userData, setUserData] = useState({
    email: "",
    username: "",
    password: "",
    role: "",
    ward: "",
    district: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const handleEditClick = () => {
    setIsEditing(!isEditing);
    setIsRoleSelectDisabled(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await axios.put(
        `http://127.0.0.1:5000/api/v1/users/${userData._id}`, // Endpoint cập nhật người dùng
        userData // Dữ liệu người dùng cần cập nhật
      );

      // Nếu cập nhật thành công, thiết lập trạng thái chỉnh sửa về false
      setIsEditing(false);
      console.log("User updated successfully", response.data);
      toast({
        title: "Update successful.",
        description: "You've successfully updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Error updating user:", error);
      // Xử lý lỗi khi cập nhật thông tin người dùng
    }
  };
  const handleRoleChange = (e) => {
    const { value } = e.target;
  
    // Nếu giá trị role thay đổi thành CB_Sở, đặt ward và district về null
    if (value === 'CB_Sở') {
      setUserData({ ...userData, role: value, ward: null, district: null });
    } else {
      // Nếu giá trị role không phải CB_Sở, chỉ cập nhật giá trị của role
      setUserData({ ...userData, role: value });
    }
  };
  useEffect(() => {
    const storedUserInfo = localStorage.getItem("userData");
    if (storedUserInfo) {
      const userInfo = JSON.parse(storedUserInfo);
      const { _id } = userInfo;

      const fetchUserData = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:5000/api/v1/users/${_id}`
          );
          const user = response.data.data;
          setUserData(user);
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      };

      fetchUserData();
    }
  }, []);

  return (
    <>
      <Box
        p={[8, 10]}
        mt={[20, "0vh"]}
        mx="auto"
        border={["none", "1px"]}
        borderColor={["", "gray.300"]}
        borderRadius={10}
      >
        <Heading size="md" mb={4}>
          Role user
        </Heading>
        <Flex align="center" w={"60vw"}>
          <Stack w="100%" direction="row" spacing={8}>
            <Box w="100%" p={4}>
              <Flex mb={4}>
                <Box w="50%" h="100%" borderRadius="full" mr={4}>
                  <WrapItem>
                    <Avatar
                      w={["50%", "80%"]}
                      h={["50%", "80%"]}
                      name="Dan Abrahmov"
                      src="https://i.pinimg.com/originals/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg"
                    />
                  </WrapItem>
                </Box>
                <Stack spacing={2} w="50%">
                  <FormLabel>role:</FormLabel>
                  <Select
                    disabled={isRoleSelectDisabled}
                    variant="filled"
                    value={userData.role}
                    isReadOnly={!isEditing}
                    onChange={handleRoleChange}
                    // Tùy chọn roles
                  >
                    <option value="CB_Phường">CB_Phường</option>
                    <option value="CB_Quận">CB_Quận</option>
                    <option value="CB_Sở">CB_Sở</option>
                    {/* Các tùy chọn khác nếu có */}
                  </Select>
                  {userData.role !== "CB_Sở" && ( // Nếu role không phải là CB_Sở thì hiển thị trường ward
                    <>
                      <FormLabel>ward:</FormLabel>
                      <Input
                        variant="filled"
                        value={userData.ward}
                        isReadOnly={!isEditing}
                        onChange={handleInputChange}
                        name="ward"
                      />
                    </>
                  )}
                  {userData.role !== "CB_Sở" && ( // Nếu role không phải là CB_Sở thì hiển thị trường district
                    <>
                      <FormLabel>district:</FormLabel>
                      <Input
                        variant="filled"
                        value={userData.district}
                        isReadOnly={!isEditing}
                        onChange={handleInputChange}
                        name="district"
                      />
                    </>
                  )}
                </Stack>
              </Flex>
            </Box>
          </Stack>
        </Flex>
        {isEditing ? (
          <Button colorScheme="blue" onClick={handleSaveClick}>
            Lưu
          </Button>
        ) : (
          <Button colorScheme="blue" onClick={handleEditClick}>
            Nâng cấp
          </Button>
        )}
      </Box>
    </>
  );
}

export default Premium;
