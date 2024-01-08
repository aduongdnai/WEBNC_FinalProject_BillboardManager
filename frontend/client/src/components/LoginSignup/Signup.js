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
import React, { useState } from "react";
import axios from "axios";

function Signup() {
  let navigate = useNavigate();
  const toast = useToast();
  const [passwordError, setPasswordError] = useState("");

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
    if (formData.password !== formData.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/v1/auth/register",
        formData
      );
      console.log("Registration successful:", response.data);
      // Handle successful registration (e.g., redirect to login page)
      setTimeout(() => {
        navigate("/login");
      }, 2000);
      toast({
        title: "Register successful.",
        description: "You've successfully registered in.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Registration failed:", error.response.data);
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
  const roles = ["CB-Phuong"];
  const districts = Array.from({ length: 12 }, (_, i) => `${i + 1}`); // Tạo mảng ['1', '2', ..., '12']
  const wards = Array.from({ length: 12 }, (_, i) => `${i + 1}`); // Tạo mảng ['1', '2', ..., '12']
  const roleOptions = {
    "CB-Phuong": {
      label: "Phường",
      districtOptions: districts.map((district) => ({
        value: district,
        label: `Quận ${district}`,
        wards: wards.map((ward) => ({
          value: ward,
          label: `Phường ${ward}`,
        })),
      })),
    },
    // "CB-Quan": {
    //   label: "Quận",
    //   districtOptions: districts.map((district) => ({
    //     value: district,
    //     label: `Quận ${district}`,
    //   })),
    // },
    // "CB-So": { label: "Không có lựa chọn" }, // Có thể thêm xử lý cho trường hợp khác nếu cần
  };
  const handleRoleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, district: "", ward: "" }); // Reset giá trị quận và phường khi thay đổi vai trò
  };

  const handleDistrictChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
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
          <Heading>Signup</Heading>
          <Text>
            <Link to="/login">Already have an account? Login</Link>
          </Text>
        </VStack>

        <FormControl>
          <FormLabel>E-mail Address</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="email"
            value={formData.email}
            onChange={handleChange}
          ></Input>
        </FormControl>
        <FormControl>
          <FormLabel>Username</FormLabel>
          <Input
            rounded="none"
            variant="filled"
            name="username"
            value={formData.username}
            onChange={handleChange}
          ></Input>
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
          ></Input>
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
          roleOptions[formData.role] &&
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
                  {roleOptions[formData.role].districtOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
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
                    {roleOptions[formData.role].districtOptions
                      .find((option) => option.value === formData.district)
                      ?.wards.map((ward) => (
                        <option key={ward.value} value={ward.value}>
                          {ward.label}
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
          Signup
        </Button>
      </VStack>
    </Box>
  );
}

export default Signup;
