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
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";

function Account() {
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

  const handleSaveClick = () => {
    // Xử lý logic lưu thông tin sau khi chỉnh sửa 
    setIsEditing(false); 
  };
  useEffect(() => {
    const accessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1OTUxYTE2Y2NjZTIwMzY1MDBjMmJkMCIsImlhdCI6MTcwNDcyNDM4MSwiZXhwIjoxNzA0NzI1NTgxfQ.F6f7TYmIjq-EtrYyUec1EyvsQRZVHdDyByyTOLzFDOc';
    const config = {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    };
    axios.get("http://127.0.0.1:5000/v1/user", config)
      .then((response) => {
        // Assuming the response data contains the user data
        const userDataFromBackend = response.data;
        setUserData(userDataFromBackend);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
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
                  <Input
                    variant="filled"
                    value={userData.email}
                    isReadOnly
                  />
                  <FormLabel>Username:</FormLabel>
                  <Input
                    variant="filled"
                    value={userData.username}
                    isReadOnly={!isEditing} 
                    onChange={handleInputChange}
                    name="username"
                  />
                  <FormLabel>password:</FormLabel>
                  <Input
                    variant="filled"
                    value={userData.password}
                    isReadOnly
                  />
                  <FormLabel>role:</FormLabel>
                  <Input variant="filled" value={userData.role} isReadOnly />
                  <FormLabel>ward:</FormLabel>
                  <Input variant="filled" value={userData.ward} isReadOnly />
                  <FormLabel>district:</FormLabel>
                  <Input
                    variant="filled"
                    value={userData.district}
                    isReadOnly
                  />
                </Stack>
              </Flex>
            </Box>
          </Stack>
        </Flex>
        {isEditing ? ( // Kiểm tra nếu đang ở trạng thái chỉnh sửa thì hiển thị nút "Lưu"
          <Button colorScheme="blue" onClick={handleSaveClick}>
            Lưu
          </Button>
        ) : ( // Ngược lại, hiển thị nút "Chỉnh sửa"
          <Button colorScheme="blue" onClick={handleEditClick}>
            Chỉnh sửa
          </Button>
        )}
      </Box>
    </>
  );
}

export default Account;
