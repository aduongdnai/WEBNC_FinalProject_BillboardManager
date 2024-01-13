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
  Select,
  Text,
  VStack,
  useToast,
} from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";

function Signup() {
  let navigate = useNavigate();
  const toast = useToast();
  const [passwordError, setPasswordError] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [mailErr, setMailErr] = useState("");
  const [nameErr, setNameErr] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
    district: "",
    ward: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordErr("");
    setMailErr("");
    setNameErr("");
    var isInvalid = false;
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      isInvalid = true;
    }
    if (formData.password === '') {
      setPasswordErr("Passwords empty");
      isInvalid = true;
    }
    if (formData.username === '') {
      setNameErr("Username empty");
      isInvalid = true;
    }
    if (formData.email === '') {
      setMailErr("Email empty");
      isInvalid = true;
    }
    if (isInvalid) return;
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/api/v1/auth/signup",
        formData
      );
      console.log("Registration successful:", response.data);
      // Handle successful registration (e.g., redirect to login page)
      setTimeout(() => {
        navigate("/map");
      }, 2000);
      toast({
        title: "Assign successful.",
        description: "",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Registration failed:", error.response.data);
      toast({
        title: "Assign Failed",
        description: "Please provide valid information",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
      // Handle registration failure (e.g., display error to user)
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const roles = ["CB-Phuong", "CB-Quan"];
  const [districts, setDistricts] = useState([])
  const [wards, setWards] = useState([])


  const handleRoleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, district: "", ward: "" }); // Reset giá trị quận và phường khi thay đổi vai trò
    const resDistricts = await axios.get("http://localhost:5000/api/v1/district");
    setDistricts(resDistricts.data.data)
  
  };

  const handleDistrictChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    const resWards = await axios.post("http://localhost:5000/api/v1/ward/findByDistrict", { district: value });
    setWards(resWards.data.data)
  };

  const handleWardChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
        <VStack spacing={1} align={["flex-start", "center"]} w="full">
          <Heading>ASSIGN ACCOUNT</Heading>

        </VStack>

        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={mailErr} // Đánh dấu lỗi nếu có
            ></Input>
            {mailErr && (
              <Text color="red.500" fontSize="sm">
                {mailErr}
              </Text>
            )}
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="username"
            value={formData.username}
            onChange={handleChange}
            isInvalid={nameErr} // Đánh dấu lỗi nếu có
            ></Input>
            {nameErr && (
              <Text color="red.500" fontSize="sm">
                {nameErr}
              </Text>
            )}
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            type="password"
            rounded="none"
            variant="filled"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={passwordErr} // Đánh dấu lỗi nếu có
            ></Input>
            {passwordErr && (
              <Text color="red.500" fontSize="sm">
                {passwordErr}
              </Text>
            )}
        </FormControl>
        <FormControl>
          <FormLabel>Confirm Password</FormLabel>
          <Input
            type="password"
            rounded="none"
            variant="filled"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            isInvalid={passwordError} // Đánh dấu lỗi nếu có
          ></Input>
          {passwordError && (
            <Text color="red.500" fontSize="sm">
              {passwordError}
            </Text>
          )}

          <FormLabel>Role</FormLabel>
          <Select
            rounded="none"
            variant="filled"
            name="role"
            value={formData.role}
            onChange={handleRoleChange}
          >
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </Select>
        </FormControl>

        {formData.role &&
          districts &&
          formData.role !== "CB-So" && (
            <>
              <FormControl mt={4}>
                <FormLabel>Quận</FormLabel>
                <Select
                  rounded="none"
                  variant="filled"
                  name="district"
                  value={formData.district}
                  onChange={handleDistrictChange}
                >
                  <option value="">Select a district</option>
                  {districts.map((district) => (
                    <option key={district._id} value={district.name}>
                      {district.name}
                    </option>
                  ))}
                </Select>
              </FormControl>

              {formData.district && formData.role === "CB-Phuong" && (
                <FormControl mt={4}>
                  <FormLabel>Phường</FormLabel>
                  <Select
                    rounded="none"
                    variant="filled"
                    name="ward"
                    value={formData.ward}
                    onChange={handleWardChange}
                  >
                    <option value="">Select a ward</option>
                    {wards.map((ward) => (
                      <option key={ward._id} value={ward.name}>
                        {ward.name}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            </>
          )}
        <Button
          rounded="none"
          colorScheme="blue"
          w={["full", "auto"]}
          alignSelf="end"
          type="submit"
          onClick={handleSubmit}
        >
          Assign
        </Button>
      </VStack>
    </Box>
  );
}

export default Signup;
