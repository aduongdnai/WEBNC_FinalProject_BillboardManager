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
const ReportForm = (props) => {
    const { info } = props;
    console.log(info);
    const initialValues = {
        type: info.type,
        reportType: '',
        senderName: '',
        email: '',
        phone: '',
        reportContent: '',
        images: [],
        area: info.area,
        status: 'Pending',
        processingMethod: '',
        //adboard_id: '6582a64745b7528c3f429b7b',
    };

    const validationSchema = Yup.object({
        reportType: Yup.string().required('Report Type is required'),
        senderName: Yup.string().required('Sender Name is required'),
        email: Yup.string().email('Invalid email').required('Email is required'),
        phone: Yup.string().required('Phone is required'),
        //reportContent: Yup.string().required('Report Content is required'),
        images: Yup.array().max(2, 'No more than 2 images'),
    });

    const recaptchaRef = React.createRef();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue) {
            try {

                // If reCAPTCHA verification is successful, make the API call
                values.images = publicId;
                values.reportContent = text;
                values.reference_id = info._id;
                values.time = new Date().toISOString();

                const apiResponse = await axios.post('http://127.0.0.1:5000/api/v1/report', values);
                console.log(apiResponse.data);

                // Reset the form on successful submission
                resetForm();
                alert("Report submitted successfully!");

                var rp = localStorage.getItem('report');
                rp = rp ? JSON.parse(rp) : [];
                rp.push(apiResponse.data);
                localStorage.setItem('report', JSON.stringify(rp));

                localStorage.setItem(`report_${values.reference_id}`, JSON.stringify({ ...apiResponse.data, isReported: true }));
            } catch (error) {
                // Handle any errors from the server
                console.error(error);
            } finally {
                // Reset the submitting state
                setSubmitting(false);
            }
        } else {
            alert("Please verify that you are a human!");
        }

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
            <Box p={4}>
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
                            <ReCAPTCHA ref={recaptchaRef} sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" /> {/* Replace with your reCAPTCHA site key */}
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
