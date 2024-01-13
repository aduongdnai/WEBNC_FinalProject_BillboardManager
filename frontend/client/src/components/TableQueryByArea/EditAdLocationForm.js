import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useEffect } from 'react';
import axios from 'axios';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useToast, Input } from '@chakra-ui/react';
import advertisingTypeAPI from '../../apis/advertisingTypeApi';
import { ChakraProvider, ButtonGroup, VStack, Heading, Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent, FormControl, FormLabel, Select } from '@chakra-ui/react';
import adLocationAPI from '../../apis/adLocationApi';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import ImageUploaderWithWidget from '../ImageUploaderWithWidget';
import { useSelector } from 'react-redux';
import { serverClient } from '../../apis/serverAxiosClient';
const EditAdLocationForm = (props) => {
  const userData = useSelector(state => state.auth.userData);
  const { info, onClose } = props;
  const [type, setType] = useState('');
  const [publicId, setPublicId] = useState('');
  const [error, setError] = useState(null);

  const toast = useToast();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await advertisingTypeAPI.getAllType();
        console.log(result);
        const ans = result.data.map((element) => {
          return { ...element, key: element._id, value: element.name }
        })
        console.log(ans);
        setType(ans);
        setPublicId(info.image);

        console.log(type);

      } catch (error) {
        console.error('Error fetching data:', error);

      }
    };
    fetchData();
  }, []);


  const AddNewLocateSchema = Yup.object().shape({
    locationType: Yup.string()
      .oneOf(["Đất công/Công viên/Hành lang an toàn giao thông", "Đất tư nhân/Nhà ở riêng lẻ", "Trung tâm thương mại", "Chợ", "Cây xăng", "Nhà chờ xe buýt"], "Invalid Location Type")
      .required("Loại địa điểm không được để trống"),
    advertisingType: Yup.string()
      .required("Loại điểm quảng cáo không được để trống"),
    planned: Yup.string()
      .required("Loại quy hoạch không được để trống"),
    numberAdBoard: Yup.number().max(3, "Tối đa 3 bảng quảng cáo").required("Số lượng bảng quảng cáo không được để trống"),
    image: Yup.string()
      .max(200, 'Tối đa 200 kí tự'),
    reason: Yup.string()
      .required("Lý do không được để trống"),
  });
  const locateTypeOption = [
    { key: 1, value: "Đất công/Công viên/Hành lang an toàn giao thông" },
    { key: 2, value: "Đất tư nhân/Nhà ở riêng lẻ" },
    { key: 3, value: "Trung tâm thương mại" },
    { key: 4, value: "Chợ" },
    { key: 5, value: "Cây xăng" },
    { key: 6, value: "Nhà chờ xe buýt" }]

  const plannedOption = [
    { key: 1, value: true },
    { key: 2, value: false }
  ]
  const hanleUploadImage = (info) => {
    console.log('Upload success:', info);
    setPublicId(info.public_id);

  }
  const handleChangeImageUrl = (e) => {
    setPublicId(e.target.value);
  }
  const onSubmit = async (values, actions) => {
    try {
      const data = {
        ...values,
        userRequest: userData.email,
        locationId: info._id,
        image: publicId,
        status: "Pending"
      }
      console.log(data);
      const result = await serverClient.post(`/adLocationEditRequest/`, data);
      setError(null);
      setPublicId('');
      if (result.data) {
        toast({
          title: "Gửi yêu cầu thành công",
          status: "success",
          duration: 3000,
          isClosable: true,
        })
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      // Handle errors, and set the error state
      console.error('Error submitting form:', error);
      setError('An error occurred while submitting the form.');
      toast({
        title: "Thêm điểm quảng cáo thất bại",
        description: "Vui lòng thử lại",
        status: "error",
        duration: 3000,
        isClosable: true,
      })
    } 
  }


  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack>
          <Formik
            initialValues={{
              locationType: info.locationType,
              advertisingType: info.advertisingType,
              planned: info.planned,
              numberAdBoard: info.numberAdBoard,
              image: publicId,
              reason: ''
            }}
            validationSchema={AddNewLocateSchema}
            onSubmit={onSubmit}
            debug
          >
            {({ props }) => (
              <VStack
                as={Form}
              >
                <Text as="p" color="red.500">{error}</Text>
                <CustomSelect
                  name="locationType"
                  label="Loại địa điểm"
                  placeholder="Vui lòng chọn loại địa điểm"
                  options={locateTypeOption}
                />
                <CustomSelect
                  name="advertisingType"
                  label="Loại quảng cáo"
                  placeholder="Vui lòng chọn loại địa điểm"
                  options={type}
                />
                <FormControl>
                  <FormLabel htmlFor="planned">Quy hoạch</FormLabel>
                  <Field as={Select} id="planned" name="planned">
                    <option value="">Vui lòng chọn quy hoạch</option>
                    {plannedOption.map((type) => (
                      <option key={type.key} value={type.value}>{type.value ? "Đã quy hoạch" : "Chưa quy hoạch"}</option>
                    ))}

                  </Field>
                  <ErrorMessage name="planned" component="div" className="error-message" style={{ color: 'red' }} />
                </FormControl>
                <CustomInput
                  name="numberAdBoard"
                  label="Số lượng bảng quảng cáo"
                  placeholder="Nhập số lượng"
                  type="number"
                />
                <CustomInput
                  name="image"
                  label="Hình ảnh"
                  placeholder="Bấm nút browse để chọn ảnh"
                  readOnly
                  value={publicId}
                  onChange={handleChangeImageUrl}
                >

                </CustomInput>
                <ImageUploaderWithWidget onUpLoadSuccess={hanleUploadImage}></ImageUploaderWithWidget>
                <CustomInput
                  name="reason"
                  label="Lý do chỉnh sửa"
                  placeholder="Nhập lý do"
                  type="text"
                />

                <ButtonGroup pt="1rem">
                  <Button colorScheme="teal" type="submit">Yêu Cầu</Button>
                </ButtonGroup>
              </VStack>
            )}
          </Formik>
        </VStack>
      </Box>
    </ChakraProvider>

  )
};

export default EditAdLocationForm;
