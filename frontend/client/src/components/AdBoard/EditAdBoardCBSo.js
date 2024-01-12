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
import adBoardApi from '../../apis/adBoardApi';
import CustomInput from '../CustomInput';
import CustomSelect from '../CustomSelect';
import ImageUploaderWithWidget from '../ImageUploaderWithWidget';


const EditAdBoardCBSo = (props) => {
    const { info,setUpdate, onClose } = props;
    const [type, setType] = useState('');
    const [publicId, setPublicId] = useState([]);
    const displayAddress = `${info.address}`;
    const [error, setError] = useState(null);

    const toast = useToast();
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await advertisingTypeAPI.getAllType();
                console.log(result);
                const ans = result.data.map((element) => {
                    return {...element, key: element._id, value: element.name}
                })
                console.log(ans);
                setType(ans);
                setPublicId(info.images);
                setUpdate(false);
    
                console.log(type);
    
            } catch (error) {
                console.error('Error fetching data:', error);
    
            }
        };
    
        // Call the fetchData function when the component mounts or when viewport changes
        fetchData();
      }, []);
    
    const AdBoardSchema = Yup.object().shape({
        boardType: Yup.string()
            .oneOf(["Trụ bảng hiflex", "Trụ màn hình điện tử LED", "Trụ hộp đèn", "Bảng hiflex ốp tường",
                "Màn hình điện tử ốp tường", "Trụ treo băng rôn dọc", "Trụ treo băng rôn ngang", "Trụ/Cụm pano",
                "Cổng chào", "Trung tâm thương mại"]).required('Loại bảng không được bỏ trống'),
        width: Yup.number()
            .required('Chiều rộng không được bỏ trống'),
        height: Yup.number()
            .required('Chiều dài không được bỏ trống'),
        images: Yup.array()
    });

    const boardTypeOption = [
        { key: 1, value: "Trụ bảng hiflex" },
        { key: 2, value: "Trụ màn hình điện tử LED" },
        { key: 3, value: "Trụ hộp đèn" },
        { key: 4, value: "Bảng hiflex ốp tường" },
        { key: 5, value: "Màn hình điện tử ốp tường" },
        { key: 6, value: "Trụ treo băng rôn dọc" },
        { key: 7, value: "Trụ treo băng rôn ngang" },
        { key: 8, value: "Trụ/Cụm pano" },
        { key: 9, value: "Cổng chào" },
        { key: 10, value: "Trung tâm thương mại" },
    ]

    
    const hanleUploadImage = (info) => {
        console.log('Upload success:', info);
        setPublicId((prevpublicIds) => [...prevpublicIds, info.public_id]);

    }
    const handleChangeImageUrl = (e) => {
        setPublicId(e.target.value);
    }

    const onSubmit = async (values, actions) => {

        try {

            const data = {
                ...values,
                images: publicId,
                // coordinates: {
                //     type: "Point",
                //     coordinates: [
                //         info.location.lng,
                //         info.location.lat
                //     ]
                // }
            }
            console.log(data);
            // Perform any async operations (e.g., API calls) here
            //console.log('Form submitted with values:', data);
            // var result = true;
            const result = await adBoardApi.updateAdboardDuong(info._id,data);
            // Clear any previous errors
            setError(null);

            // Reset the form
            // actions.resetForm();
            setPublicId([]);
            if (result) {
                toast({
                    title: "Chỉnh sửa điểm quảng cáo thành công",
                    status: "success",
                    duration: 3000,
                    isClosable: true,
                })
                setTimeout(() => {
                    onClose();
                }, 200);
                setUpdate(true);
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
        } finally {
            // Ensure to setSubmitting(false) whether the submission was successful or not
            actions.setSubmitting(false);
        }

    }


    return(
        <ChakraProvider>
            <Box p={4}>
            <VStack>
                <Formik
                    initialValues={{
                        boardType: info.boardType,
                        width: info.width,
                        height: info.height,
                        images: publicId
                    }}
                    validationSchema={AdBoardSchema}
                    onSubmit={onSubmit}
                    debug
                >
                    {({ props }) => (
                        <VStack
                            as={Form}
                        >
                            <Text as="p" color="red.500">{error}</Text>
                            <CustomSelect
                                name="boardType"
                                label="Loại bảng"
                                placeholder="Vui lòng chọn loại bảng"
                                options={boardTypeOption}
                            />
                            <CustomInput
                                name="width"
                                label="Chiều rộng"
                                placeholder="Nhập chiều rộng"
                                type="number"
                            />
                            <CustomInput
                                name="height"
                                label="Chiều dài"
                                placeholder="Nhập chiều dài"
                                type="number"
                            />
                            <CustomInput
                                name="images"
                                label="Hình ảnh"
                                placeholder="Bấm nút browse để chọn ảnh"
                                readOnly
                                value={
                                    publicId ? publicId.join(", ") : publicId
                                }
                                onChange={handleChangeImageUrl}
                            >
                            </CustomInput>
                            <ImageUploaderWithWidget onUpLoadSuccess={hanleUploadImage}></ImageUploaderWithWidget>
                            <ButtonGroup pt="1rem">
                                <Button colorScheme="teal" type="submit">Update</Button>
                            </ButtonGroup>
                        </VStack>
                    )}
                </Formik>
            </VStack>
            </Box>
        </ChakraProvider>

    )
};

export default EditAdBoardCBSo;
