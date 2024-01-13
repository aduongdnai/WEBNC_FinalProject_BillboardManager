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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  VStack,
  WrapItem,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { serverClient } from "../../apis/serverAxiosClient";
function Account() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSavePasswordClick = async () => {
    if (newPassword !== confirmNewPassword) {
      // Check if the new password and confirmation password match
      toast({
        title: "Password confirmation failed",
        description: "New password and confirmation password do not match.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      return; // Prevent further execution if passwords don't match
    }
    try {
      const response = serverClient.put(`/users/change-password/${userData._id}`,{
        oldPassword: currentPassword,
        newPassword: newPassword
      })
      
      toast({
        title: "Password changed successfully",
        description: "Your password has been updated.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setCurrentPassword("");
      setNewPassword("");
      onClose(); // Close the modal after password change
    } catch (error) {
      console.error("Error changing password:", error);
      // Handle error here
      toast({
        title: "Error changing password",
        description: "An error occurred while changing your password.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  const toast = useToast();

  const userData = useSelector(state => state.auth.userData);

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
                    isReadOnly
                    name="username"
                  />
                  <FormLabel>role:</FormLabel>
                  <Input variant="filled" value={userData.role === "CB-So"?"Cán bộ Sở":userData.role === "CB-Quan"?"Cán bộ Quận":"Cán bộ Phường"} isReadOnly />
                  {userData.ward !== null && ( // Kiểm tra nếu giá trị của ward không phải null thì hiển thị input
                    <>
                      <FormLabel>ward:</FormLabel>
                      <Input
                        variant="filled"
                        value={userData.ward}
                        isReadOnly
                        name="ward"
                      />
                    </>
                  )}
                  <FormLabel>district:</FormLabel>
                  <Input
                    variant="filled"
                    value={userData.district}
                    isReadOnly
                    name="district"
                  />
                </Stack>
              </Flex>
            </Box>
          </Stack>
        </Flex>
        <Button ml={5} colorScheme="blue" onClick={onOpen}>
          Đổi mật khẩu
        </Button>

        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Đổi mật khẩu</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormLabel>Mật khẩu hiện tại</FormLabel>
              <Flex flexDirection="column">
                <Input
                  type="password"
                  variant="filled"
                  placeholder="Mật khẩu hiện tại"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  mb={3}
                />
                <FormLabel>Mật khẩu Mới</FormLabel>
                <Input
                  type="password"
                  variant="filled"
                  placeholder="Mật khẩu mới"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  mb={3}
                />
                <FormLabel>Xác nhận mật khẩu Mới</FormLabel>
                <Input
                  type="password"
                  variant="filled"
                  placeholder="Xác nhận mật khẩu mới"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}

                  mb={3}
                />
              </Flex>
            </ModalBody>

            <ModalFooter>
              <Button variant="ghost" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="blue" onClick={handleSavePasswordClick}>
                Lưu mật khẩu mới
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

      </Box>
    </>
  );
}

export default Account;
