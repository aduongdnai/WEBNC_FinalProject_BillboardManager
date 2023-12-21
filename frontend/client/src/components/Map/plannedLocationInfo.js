import * as React from 'react';
import { useState } from 'react';
import { Icon, useDisclosure } from '@chakra-ui/react'
import { ButtonGroup, VStack, Heading, Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Formik, Form } from 'formik'
import CustomInput from '../CustomInput'
import * as Yup from 'yup'
import CustomSelect from '../CustomSelect';
import adLocationAPI from '../../apis/adLocationApi';
import ImageUploaderWithWidget from '../ImageUploaderWithWidget';
import adBoardApi from '../../apis/adBoardApi';
function PlannedLocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [error, setError] = useState(null);
    const [publicId, setPublicId] = useState([]);
    const displayAddress = `${info.address}`;
    const AddNewBoardSchema = Yup.object().shape({
        boardType: Yup.string()
            .oneOf(["Trụ bảng hiflex", "Trụ màn hình điện tử LED", "Trụ hộp đèn", "Bảng hiflex ốp tường",
                "Màn hình điện tử ốp tường", "Trụ treo băng rôn dọc", "Trụ treo băng rôn ngang", "Trụ/Cụm pano",
                "Cổng chào", "Trung tâm thương mại"]),
        width: Yup.number()
            .required('Chiều rộng không được bỏ trống'),
        height: Yup.number()
            .required('Chiều dài không được bỏ trống'),
        image: Yup.array()
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

    const onSubmit = async (values, actions) => {
        try {
            const curdate = new Date();
            const expiryDate = new Date(
                curdate.getFullYear() + 2,
                curdate.getMonth(),
                curdate.getDate(),
            )
            const data = {
                ...values,
                location_id: info._id,
                images: publicId,
                expiryDate: expiryDate.toDateString()

            }
            console.log(data);
            // Perform any async operations (e.g., API calls) here
            //console.log('Form submitted with values:', data);
            const result = await adBoardApi.addAdBoard(data);
            // Clear any previous errors
            setError(null);

            // Reset the form
            actions.resetForm();
            setPublicId([]);
        } catch (error) {
            // Handle errors, and set the error state
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form.');
        } finally {
            // Ensure to setSubmitting(false) whether the submission was successful or not
            actions.setSubmitting(false);
        }

    }
    const hanleUploadImage = (info) => {
        console.log('Upload success:', info);
        setPublicId((prevpublicIds) => [...prevpublicIds, info.public_id]);

    }
    const handleChangeImageUrl = (e) => {
        setPublicId(e.target.value);

    }

    return (
        <div>
            <Box width={350} >
                {displayAddress}
                <Text fontWeight={'bold'}>{info.planned ? "Đã Quy Hoạch" : "Chưa Quy Hoạch"}</Text>
                <Button colorScheme='blue' onClick={onOpen}>
                    <AddIcon boxSize={5} pr={2} >
                    </AddIcon>
                    Thêm Bảng Quảng Cáo
                </Button>
                <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size='md'>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth='1px'>Thêm điểm quảng cáo</DrawerHeader>
                        <DrawerBody>
                            <VStack>
                                <Formik
                                    initialValues={{

                                        locationType: '',
                                        width: 0,
                                        height: 0,
                                        image: publicId
                                    }}
                                    validationSchema={AddNewBoardSchema}
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
                                                label="Loại địa điểm"
                                                placeholder="Vui lòng chọn loại địa điểm"
                                                options={boardTypeOption}
                                            />
                                            <CustomInput
                                                name="width"
                                                label="Chiều rộng"
                                                placeholder="Nhập chiều dài (VD: 8m)"
                                                type="number"
                                            />
                                            <CustomInput
                                                name="height"
                                                label="Chiều cao"
                                                placeholder="Nhập khu vực (VD: 10m)"
                                                type="number"
                                            />
                                            <CustomInput
                                                name="image"
                                                label="Hình ảnh"
                                                placeholder="Bấm nút browse để chọn ảnh"
                                                readOnly
                                                value={publicId.join(', ')}
                                                onChange={handleChangeImageUrl}
                                            >
                                            </CustomInput>
                                            <ImageUploaderWithWidget onUpLoadSuccess={hanleUploadImage}></ImageUploaderWithWidget>
                                            <ButtonGroup pt="1rem">
                                                <Button colorScheme="teal" type="submit">Add</Button>
                                            </ButtonGroup>
                                        </VStack>
                                    )}
                                </Formik>
                            </VStack>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>

        </div>
    );
}

export default React.memo(PlannedLocationInfo);