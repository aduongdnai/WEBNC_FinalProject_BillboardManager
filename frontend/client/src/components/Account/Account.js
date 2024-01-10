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
  Stack,
  Text,
  VStack,
  WrapItem,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Account() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePasswordClick = () => {
    setShowChangePassword(true);
  };
  const handleSavePasswordClick = () => {
    console.log("Current Password:", currentPassword);
    console.log("New Password:", newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setShowChangePassword(false);
  };
  const toast = useToast();
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
  // useEffect(() => {
  //   // Lấy access token từ localStorage
  //   const accessToken = localStorage.getItem('accessToken');

  //   // Xuất ra console log để hiển thị access token
  //   console.log("Access Token:", accessToken);
  // }, []);

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
          User Profile
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
                  <FormLabel>E-mail Address</FormLabel>
                  <Input variant="filled" value={userData.email} isReadOnly />
                  <FormLabel>Username:</FormLabel>
                  <Input
                    variant="filled"
                    value={userData.username}
                    isReadOnly={!isEditing}
                    onChange={handleInputChange}
                    name="username"
                  />
                  <FormLabel>password:</FormLabel>
                  {!showChangePassword ? (
                    <Flex>
                      <Input
                        type="password"
                        variant="filled"
                        value={userData.password}
                        isReadOnly
                        w={"50%"}
                      />
                      <Button
                        ml={5}
                        colorScheme="blue"
                        w={"40%"}
                        onClick={handleChangePasswordClick}
                      >
                        Đổi mật khẩu
                      </Button>
                    </Flex>
                  ) : (
                    <Flex flexDirection="column">
                      <Input
                        type="password"
                        variant="filled"
                        placeholder="Mật khẩu hiện tại"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        mb={3}
                      />
                      <Input
                        type="password"
                        variant="filled"
                        placeholder="Mật khẩu mới"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        mb={3}
                      />
                      <Button
                        colorScheme="blue"
                        onClick={handleSavePasswordClick}
                      >
                        Lưu mật khẩu mới
                      </Button>
                    </Flex>
                  )}

                  <FormLabel>role:</FormLabel>
                  <Input variant="filled" value={userData.role} isReadOnly />
                  {userData.ward !== null && ( // Kiểm tra nếu giá trị của ward không phải null thì hiển thị input
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
                  <FormLabel>district:</FormLabel>
                  <Input
                    variant="filled"
                    value={userData.district}
                    isReadOnly={!isEditing}
                    onChange={handleInputChange}
                    name="district"
                  />
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
            Chỉnh sửa
          </Button>
        )}
        <Link to="/premium">
          <Button ml={5} colorScheme="blue">
            Nâng cấp lên gói CB_Quận/CB_Sở
          </Button>
        </Link>
      </Box>
    </>
  );
}

export default Account;
