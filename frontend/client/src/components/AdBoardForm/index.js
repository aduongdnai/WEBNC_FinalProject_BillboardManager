import React from 'react';
import { Formik, Form } from 'formik'
import CustomInput from '../CustomInput'
import * as Yup from 'yup'
import CustomSelect from '../CustomSelect';
import adLocationAPI from '../../apis/adLocationApi';
import ImageUploaderWithWidget from '../ImageUploaderWithWidget';
import { Icon, useDisclosure } from '@chakra-ui/react'
import { useToast, ButtonGroup, VStack, Heading, Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { AddIcon, ViewIcon } from '@chakra-ui/icons';
import { useState } from 'react';
import adBoardApi from '../../apis/adBoardApi';
function AdBoardForm({ onClose, info, onSubmitForm, setUpdate }) {
    const [error, setError] = useState(null);
    const [publicId, setPublicId] = useState([]);
    const toast = useToast();
    const AddNewBoardSchema = Yup.object().shape({
        boardType: Yup.string()
            .oneOf(["Trụ bảng hiflex", "Trụ màn hình điện tử LED", "Trụ hộp đèn", "Bảng hiflex ốp tường",
                "Màn hình điện tử ốp tường", "Trụ treo băng rôn dọc", "Trụ treo băng rôn ngang", "Trụ/Cụm pano",
                "Cổng chào", "Trung tâm thương mại"]).required('Loại bảng không được bỏ trống'),
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


            const data = {
                ...values,
                location_id: info._id,
                images: publicId,
                expiryDate: null

            }
            console.log(data);
            // Perform any async operations (e.g., API calls) here
            //console.log('Form submitted with values:', data);
            const result = await adBoardApi.addAdBoard(data);
            // Clear any previous errors
            if (result.msg === "success") {
                toast({
                    title: 'Thêm thành công.',
                    description: "Thêm bảng quảng cáo thành công.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                onSubmitForm();
            }
            setError(null);

            // Reset the form
            actions.resetForm();
            setPublicId([]);
            setUpdate(true);
            onClose();
        } catch (error) {
            // Handle errors, and set the error state
            console.error('Error submitting form:', error);
            setError('An error occurred while submitting the form.');
        } finally {
            // Ensure to setSubmitting(false) whether the submission was successful or not
            actions.setSubmitting(false);
        }

    }

    return (
        <VStack>
            <Formik
                initialValues={{

                    locationType: '',
                    width: "",
                    height: "",

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
                            label="Loại bảng quảng cáo"
                            placeholder="Vui lòng chọn bảng quảng cáo"
                            options={boardTypeOption}
                        />
                        <CustomInput
                            name="width"
                            label="Chiều rộng"
                            placeholder="Nhập chiều rộng (VD: 8m)"
                            type="number"
                        />
                        <CustomInput
                            name="height"
                            label="Chiều dài"
                            placeholder="Nhập chiều dài (VD: 10m)"
                            type="number"
                        />
                        <ButtonGroup pt="1rem">
                            <Button colorScheme="teal" type="submit">Add</Button>
                        </ButtonGroup>
                    </VStack>
                )}
            </Formik>
        </VStack>
    );
}

export default AdBoardForm;