import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    VStack,
    ButtonGroup,
    Text,
} from '@chakra-ui/react';
import CustomInput from '../CustomInput';
import ImageUploaderWithWidget from '../ImageUploaderWithWidget';
import CustomDateInput from '../CustomDateInput';
import { useUser } from '../LoginSignup/userContext';
import { useSelector } from 'react-redux';
const validationSchema = Yup.object({
    companyName: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    phone: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    adContent: Yup.string().required('Required'),
    adImage: Yup.array(),
    startDate: Yup.date().required('Required'),
    endDate: Yup.date().required('Required').min(Yup.ref('startDate'), 'End date can\'t be before start date'),
});

const AdvertisingLicenseRequestForm = ({ onSubmit, adboardInfo }) => {
    const [error, setError] = useState(null);
    const [publicId, setPublicId] = useState([]);
    const user = useSelector(state => state.auth.userData);
    console.log("ll", adboardInfo);
    const handleChangeImageUrl = (e) => {
        setPublicId(e.target.value);

    }
    const hanleUploadImage = (info) => {
        console.log('Upload success:', info);
        setPublicId((prevpublicIds) => [...prevpublicIds, info.public_id]);

    }
    const handleSubmit = (values, actions) => {
        setError(null);
        values.adImage = publicId;
        const advertisingLicense = {
            companyInfo: {
                name: values.companyName,
                contact: {
                    email: values.email,
                    phone: values.phone,
                    address: values.address,
                }
            },
            adContent: values.adContent,
            adImage: values.adImage,
            startDate: values.startDate,
            endDate: values.endDate,
            user_id: user._id,
            adBoard: adboardInfo._id,
            status: "Pending",
        };

        onSubmit(advertisingLicense, actions);
    }
    return (
        <Formik
            initialValues={{

                companyName: '',
                email: '',
                phone: '',
                address: '',
                adContent: '',
                adImage: '',
                startDate: '',
                endDate: '',
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            debug
        >
            {({ props }) => (
                <VStack
                    as={Form}
                    width={"100%"}
                    maxWidth="400px"
                >
                    <Text as="p" color="red.500">{error}</Text>


                    <CustomInput
                        name="companyName"
                        label="Tên công ty"
                        placeholder="Ví dụ: Công ty TNHH ABC"
                        type="text"
                    />
                    <CustomInput
                        name="email"
                        label="Email công ty"
                        placeholder="Ví dụ: abcxyz@gmail.com"
                        type="email"
                    />
                    <CustomInput
                        name="phone"
                        label="Số điện thoại công ty"
                        placeholder="Ví dụ: 0123456789"
                        type="text"
                    />
                    <CustomInput
                        name="address"
                        label="Địa chỉ công ty"
                        placeholder="Ví dụ: 123 Nguyễn Văn Linh, Quận 7, TP.HCM"
                        type="text"
                    />
                    <CustomInput
                        name="adContent"
                        label="Nội dung quảng cáo"
                        placeholder="Slogan, thông điệp quảng cáo"
                        type="text"
                    />
                    <CustomDateInput
                        name="startDate"
                        label="Ngày bắt đầu quảng cáo"
                        placeholder="Slogan, thông điệp quảng cáo"

                    />
                    <CustomDateInput
                        name="endDate"
                        label="Ngày kết thúc quảng cáo"
                        placeholder="Slogan, thông điệp quảng cáo"

                    />
                    <CustomInput
                        name="adImage"
                        label="Hình ảnh biển quảng cáo"
                        placeholder="Bấm nút browse để chọn ảnh"
                        readOnly
                        value={publicId.join(', ')}
                        onChange={handleChangeImageUrl}
                    >
                    </CustomInput>
                    <ImageUploaderWithWidget onUpLoadSuccess={hanleUploadImage} folder="advertisingLicense"></ImageUploaderWithWidget>
                    <ButtonGroup pt="1rem">
                        <Button colorScheme="teal" type="submit">Submit</Button>
                    </ButtonGroup>
                </VStack>
            )}
        </Formik>
    );
};

export default AdvertisingLicenseRequestForm;