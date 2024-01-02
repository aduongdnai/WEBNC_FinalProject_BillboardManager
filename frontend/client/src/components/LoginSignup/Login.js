import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormLabel,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { useToast } from '@chakra-ui/react';
import { useUser } from "./userContext";
function Login() {
  const { setUser } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const toast = useToast();
  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/v1/auth/login", {
        email: email,
        password: password,
      });

      console.log(response.data); // In kết quả trả về từ server vào console
      setTimeout(() => {
        navigate('/map');
      }, 2000);
      setUser(email);
      // Hiển thị thông báo khi đăng nhập thành công
      toast({
        title: 'Login successful.',
        description: "You've successfully logged in.",
        status: 'success',
        duration: 2000,
        isClosable: true,
      });

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
          <Text>
            <Link to="/signup">Don't have an account? Signup</Link>
          </Text>
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
          <Button variant="link" colorScheme="blue">
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
    </Box>
  );
}

export default Login;