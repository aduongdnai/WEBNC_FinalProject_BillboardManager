import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ChakraProvider, Box, FormControl, FormLabel, Select, Input, Button, Heading } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // import styles
import ReCAPTCHA from "react-google-recaptcha";
import ImageUploaderWithWidget from '../ImageUploaderWithWidget';
import CustomInput from '../CustomInput';
import ReactDOM from 'react-dom';
const ReportForm = () => {
    const initialValues = {
        reportType: '',
        senderName: '',
        email: '',
        phone: '',
        reportContent: '',
        images: [],
        status: 'Pending',
        adboard_id: '6582a64745b7528c3f429b7b',
    };

    const validationSchema = Yup.object({
        reportType: Yup.string().required('Report Type is required'),
        senderName: Yup.string().required('Sender Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        //reportContent: Yup.string().required('Report Content is required'),
        images: Yup.array().max(2, 'No more than 2 images'),
        adboard_id: Yup.string().required('Location ID is required'),
    });

    const handleSubmit = async (values, { setSubmitting }) => {
        const response = await axios.post('http://127.0.0.1:5000/api/v1/report', values);
        console.log(response.data);

    };
    const [publicId, setPublicId] = useState([]);
    const [text, setText] = React.useState('');
    const hanleUploadImage = (info) => {
        console.log('Upload success:', info);
        setPublicId((prevpublicIds) => [...prevpublicIds, info.public_id]);
        //initialValues.images.push(info.public_id);

    }
    const handleChangeImageUrl = (e) => {
        setPublicId(e.target.value);

    }
    return (
        <ChakraProvider>
            <Box px={20}>
                <Heading as='h2' size='xl' >Report Form</Heading>
                <br />
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <FormControl>
                                <FormLabel htmlFor="reportType">Report Type</FormLabel>
                                <Field as={Select} id="reportType" name="reportType">
                                    <option value="">Select Report Type</option>
                                    <option value="Tố giác sai phạm">Tố giác sai phạm</option>
                                    <option value="Đăng ký nội dung">Đăng ký nội dung</option>
                                    <option value="Đóng góp ý kiến">Đóng góp ý kiến</option>
                                    <option value="Giải đáp thắc mắc">Giải đáp thắc mắc</option>
                                </Field>
                                <ErrorMessage name="reportType" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
                            <br />
                            <FormControl>
                                <FormLabel htmlFor="senderName">Sender Name</FormLabel>
                                <Field as={Input} type="text" id="senderName" name="senderName" />
                                <ErrorMessage name="senderName" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
                            <br />
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Field as={Input} type="email" id="email" name="email" />
                                <ErrorMessage name="email" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
                            <br />
                            <FormControl>
                                <FormLabel htmlFor="phone">Phone</FormLabel>
                                <Field as={Input} type="text" id="phone" name="phone" />
                                <ErrorMessage name="phone" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
                            <br />
                            <FormControl style={{ height: '250px' }}>
                                <FormLabel htmlFor="reportContent">Report Content</FormLabel>
                                <ReactQuill value={text} onChange={setText} style={{ height: '170px' }} />
                                <ErrorMessage name="reportContent" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
                            <br />

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

                            <br />
                            <ReCAPTCHA sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" /> {/* Replace with your reCAPTCHA site key */}
                            <br />
                            <Button colorScheme='red' variant='outline' type="submit" disabled={isSubmitting}>Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </ChakraProvider>
    );
};

export default ReportForm;
