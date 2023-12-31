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
function Login() {

const { setUser, setUserArea, setUserData } = useUser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let navigate = useNavigate();
  const toast = useToast();
  const handleLogin = async () => {
    try {
      // const response = await axios.post("http://127.0.0.1:5000/v1/auth/login", {
      //   email: email,
      //   password: password,
      // });
      const response = await authApi.login({
        email: email,
        password: password,
      });

      console.log(response.data);

      if (response.data.success){
        
        localStorage.setItem('accessToken', response.data.token);
        localStorage.setItem('refreshToken',  response.data.rfToken);
        localStorage.setItem('isAuth',  true);

        const area = (response.data.userData.ward 
          ? `Phường ${response.data.userData.ward}, ` 
          : ``) 
        + 
          (response.data.userData.district 
          ? `Quận ${response.data.userData.district}, ` 
          : ``)
        + 
          `Hồ Chí Minh`;
  
        setUserArea(area);

        const userData = response.data.userData;
        userData.area = area;
        setUserData(JSON.stringify(userData));

        response.data.userData.area = area
        store.dispatch(loginSuccess(response.data.token, response.data.rfToken, response.data.userData))

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