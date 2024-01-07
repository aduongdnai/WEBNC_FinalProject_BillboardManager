import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ChakraProvider, Box, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useUser } from '../LoginSignup/userContext';
import emailjs from '@emailjs/browser';
const ReportProcessForm = (props) => {
    const { info } = props;
    const {userData} = useUser();
    const initialValues = {
        status: '',
        processMethod: '',
        //adboard_id: '6582a64745b7528c3f429b7b',
    };

    const validationSchema = Yup.object({
        status: Yup.string().required('Cần cập nhật trạng thái'),
        //processingMethod: Yup.string().required('Cần nhập phương thức xử lý'),
    });

    const recaptchaRef = React.createRef();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue) {
            try {
                values.updatedTime = new Date().toISOString();
                values.processMethod = text;
                const apiResponse = await axios.put(`http://127.0.0.1:5000/api/v1/report/${info._id}`, values);
                console.log(apiResponse.data);
                console.log(info);
                // Send email to info.email              
                sendFeedback("template_9q0017f", {status:values.status,to_name: info.senderName,message: values.processMethod, from_name: `Cán bộ ${userData.area}`, to_email: info.email})

                // Reset the form on successful submission
                resetForm();
                alert("Update successfully!");
                
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
    const sendFeedback = (templateId, variables) => {
        emailjs.send(
          'service_ff8v4uk',
          templateId,
          variables,
          "ckL40Q7vUIBTGKW0J"
        ).then(res => {
          console.log('Email successfully sent!')
        })
        // Handle errors here however you like, or use a React error boundary
        .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err))
      }
    const [text, setText] = useState('');
    return (
        <ChakraProvider>
            <Box p={4}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <FormControl>
                                <FormLabel htmlFor="status">Report Type</FormLabel>
                                <Field as={Select} id="status" name="status">
                                    <option value="">Chọn trạng thái</option>
                                    <option value="Processing">Đang xử lí</option>
                                    <option value="Processed">Đã xử lí xong</option>
                                </Field>
                                <ErrorMessage name="status" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
                            <br />                       
                            <FormControl style={{ height: '250px' }}>
                                <FormLabel htmlFor="processingMethod">Cách thức xử lí</FormLabel>
                                <ReactQuill value={text} onChange={setText} style={{ height: '170px' }} />
                                <ErrorMessage name="processingMethod" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
                            <br />

                          
                            <br />
                            <ReCAPTCHA ref={recaptchaRef} sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" /> {/* Replace with your reCAPTCHA site key */}
                            <br />
                            <Button colorScheme='teal' variant='outline' type="submit" disabled={isSubmitting}>Submit</Button>
                        </Form>
                    )}
                </Formik>
            </Box>
        </ChakraProvider>
    );
};

export default ReportProcessForm;
