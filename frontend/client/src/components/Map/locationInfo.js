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
function LocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [error, setError] = useState(null);
    const [publicId, setPublicId] = useState('');
    const displayAddress = `${info.address}`;
    const AddNewLocateSchema = Yup.object().shape({
        address: Yup.string()
            .max(200, 'Tối đa 200 kí tự')
            .required('Địa chỉ không được để trống'),
        area: Yup.string()
            .max(200, 'Tối đa 200 kí tự')
            .required('Khu vực không được để trống'),
        locationType: Yup.string()
            .oneOf(["Đất công/Công viên/Hành lang an toàn giao thông", "Đất tư nhân/Nhà ở riêng lẻ", "Trung tâm thương mại", "Chợ", "Cây xăng", "Nhà chờ xe buýt"], "Invalid Location Type")
            .required("Loại địa điểm không được để trống"),
        advertisingType: Yup.string()
            .oneOf(["Cổ động chính trị", "Quảng cáo thương mại", "Xã hội hoá"], "Invalid Advertisement Type")
            .required("Loại điểm quảng cáo không được để trống"),
        image: Yup.string()
            .max(200, 'Tối đa 200 kí tự')

        // planned: Yup.bool()
        //     .required("Trạng thái của điểm quảng cáo không được bỏ trống"),


    });
    const locateTypeOption = [
        { key: 1, value: "Đất công/Công viên/Hành lang an toàn giao thông" },
        { key: 2, value: "Đất tư nhân/Nhà ở riêng lẻ" },
        { key: 3, value: "Trung tâm thương mại" },
        { key: 4, value: "Chợ" },
        { key: 5, value: "Cây xăng" },
        { key: 6, value: "Nhà chờ xe buýt" }]
    const advertisingTypeOption = [
        { key: 1, value: "Cổ động chính trị" },
        { key: 2, value: "Quảng cáo thương mại" },
        { key: 3, value: "Xã hội hoá" }]
    const onSubmit = async (values, actions) => {

        try {

            const data = {
                ...values,
                image: publicId,
                planned: true,
                coordinates: {
                    type: "Point",
                    coordinates: [
                        info.location.lng,
                        info.location.lat
                    ]
                }
            }
            console.log(data);
            // Perform any async operations (e.g., API calls) here
            //console.log('Form submitted with values:', data);
            const result = await adLocationAPI.addAdLocation(data);
            // Clear any previous errors
            setError(null);

            // Reset the form
            actions.resetForm();
            setPublicId('');
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
        setPublicId(info.public_id);

    }
    const handleChangeImageUrl = (e) => {
        setPublicId(e.target.value);
        console.log("cl " + publicId);
    }

    return (
        <div>
            <Box width={350} >
                {displayAddress}
                <Text fontWeight={'bold'}>{info.planned ? "Đã Quy Hoạch" : "Chưa Quy Hoạch"}</Text>
                <Button colorScheme='blue' onClick={onOpen}>
                    <AddIcon boxSize={5} pr={2} >
                    </AddIcon>
                    Thêm Điểm Quảng Cáo
                </Button>
                <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size='md'>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth='1px'>Thêm điểm quảng cáo</DrawerHeader>
                        <DrawerBody>

                            <VStack>
                                <Formik
                                    initialValues={{
                                        address: displayAddress,
                                        area: info.area,
                                        locationType: '',
                                        advertisingType: '',
                                        image: publicId
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
                                            <CustomInput
                                                name="address"
                                                label="Địa chỉ"
                                                placeholder="Nhập địa chỉ (VD: 123 Trường Chinh)"
                                                type="text"
                                            />
                                            <CustomInput
                                                name="area"
                                                label="Khu vực"
                                                placeholder="Nhập khu vực (VD: Tân Hưng Thuân, Quận 12, HCM)"
                                                type="text"
                                            />
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
                                                options={advertisingTypeOption}
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

export default React.memo(LocationInfo);