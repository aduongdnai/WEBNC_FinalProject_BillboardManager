import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay, useDisclosure, Flex
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useUser } from "./userContext";
import * as authApi from "../../apis/authApi"
import store from "../../store";
import { loginSuccess } from "../actions/authAction";
import emailjs from '@emailjs/browser';
import { serverClient } from '../../apis/serverAxiosClient';
function Login() {

  const { setUser, setUserArea, setUserData } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const toast = useToast();
  const handleLogin = async () => {
    try {
      const response = await authApi.login({
        email: email,
        password: password,
      });

      console.log(response);

      if (response.success) {

        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('refreshToken', response.rfToken);
        localStorage.setItem('isAuth', true);

        const area = (response.userData.ward
          ? `Phường ${response.userData.ward}, `
          : ``)
          +
          (response.userData.district
            ? `Quận ${response.userData.district}, `
            : ``)
          +
          `Hồ Chí Minh`;

        setUserArea(area);

        const userData = response.userData;
        userData.area = area;
        setUserData(JSON.stringify(userData));

        response.userData.area = area
        store.dispatch(loginSuccess(response.token, response.rfToken, response.userData))

        setTimeout(() => {
          navigate('/map');
        }, 2000);
        toast({
          title: 'Login successful.',
          description: "You've successfully logged in.",
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
      else {
        toast({
          title: 'Login failed.',
          description: "Please check your information and try again.",
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }

      // setUser(response.data.data.user.username);



      // Hiển thị thông báo khi đăng nhập thành công


    } catch (error) {
      console.error(error); // Xử lý lỗi nếu có
      // Hiển thị thông báo khi đăng nhập thất bại
      toast({
        title: 'Login failed.',
        description: "Please check your credentials and try again.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  };
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentEmail, setCurrentEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [_otp, set_Otp] = useState("");

  const sendEmail = (templateId, variables) => {
    emailjs.send(
      'service_ff8v4uk',
      templateId,
      variables,
      "ckL40Q7vUIBTGKW0J"
    ).then(res => {
      console.log('Email successfully sent!')
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
  }
  const handleSendOtp = async () => {
    if (currentEmail === "") {
      toast({
        title: 'Eamil missing.',
        description: "Please enter your email and try again.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    set_Otp((prevOtp) => {
      // Generate a new OTP
      const newOtp = Math.floor(1000 + Math.random() * 9000).toString();

      // Send email with the new OTP
      sendEmail("template_lej7tf9", { to_name: currentEmail, message: `OTP của bạn là: ${newOtp}`, to_email: currentEmail });

      // Display success message
      toast({
        title: 'Please check your email',
        description: "",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

      // Log the new OTP
      console.log("New OTP:", newOtp);

      // Return the new OTP to update the state
      return newOtp;
    });
  }

  const sendPw = async () => {
    console.log(otp, _otp);
    sendEmail("template_lej7tf9", { to_name: currentEmail, message: `Mật khẩu mới của bạn là: 12345678`, to_email: currentEmail })
  }

  const handleForgetPassword = async () => {
    console.log(otp, _otp);
    try {

      if (otp === _otp) {
        const response = await serverClient.post(`/users/resetpassword`, {
          email: currentEmail,
          resetToken: "RESETTOKEN",
        });
        if (response.success) {
          sendPw()
          toast({
            title: 'Please check your email',
            description: "",
            status: 'success',
            duration: 2000,
            isClosable: true,
          });
          onClose();
        }
      } else {
        toast({
          title: 'Invalid OTP',
          description: "Please check your otp and try again.",
          status: 'error',
          duration: 2000,
          isClosable: true,
        });
      }


    } catch (error) {
      console.error(error); // Xử lý lỗi nếu có
      // Hiển thị thông báo khi đăng nhập thất bại
      toast({
        title: 'Login failed.',
        description: "Please check your credentials and try again.",
        status: 'error',
        duration: 2000,
        isClosable: true,
      });
    }
  }

  return (
    <Box
      w={["full", "md"]}
      p={[8, 10]}
      mt={[20, "10vh"]}
      mx="auto"
      border={["none", "1px"]}
      borderColor={["", "gray.300"]}
      borderRadius={10}
    >
      <VStack spacing={4} align="flex-start" w="full">
        <VStack spacing={1} align={['flex-start', 'center']} w='full'>
          <Heading>Login</Heading>

        </VStack>
        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            rounded="none"
            variant="filled"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Input>
        </FormControl>
        <HStack w="full" justify="space-between">
          <Checkbox>Remember me.</Checkbox>
          <Button variant="link" colorScheme="blue" onClick={onOpen}>
            Forgot password?
          </Button>
        </HStack>
        <Button
          rounded="none"
          colorScheme="blue"
          w={["full", "auto"]}
          alignSelf="end"
          onClick={handleLogin}
        >
          Login
        </Button>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Quên mật khẩu</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormLabel>Email</FormLabel>
            <Flex flexDirection="column">
              <Input
                type="email"
                variant="filled"
                placeholder="Email"
                value={currentEmail}
                onChange={(e) => setCurrentEmail(e.target.value)}
                mb={3}
              />
              <FormLabel>OTP</FormLabel>
              <Flex flexDirection="row">
                <Input
                  type="otp"
                  variant="filled"
                  placeholder="OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  mb={3}
                  mr={2}
                />
                <Button colorScheme="blue" onClick={handleSendOtp}>
                  Gửi OTP
                </Button>
              </Flex>
            </Flex>
          </ModalBody>

          <ModalFooter>
            <Button variant="ghost" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="blue" onClick={handleForgetPassword}>
              Xác nhận
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default Login;