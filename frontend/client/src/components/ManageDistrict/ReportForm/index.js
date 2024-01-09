import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ChakraProvider, Box, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import ReCAPTCHA from "react-google-recaptcha";
import { useToast, Input } from '@chakra-ui/react';

const ReportForm = (props) => {
    const { name,id } = props;
    const toast = useToast();
    const initialValues = {
        name: name,
    };

    const validationSchema = Yup.object({
        name: Yup.string().required('Cần nhập tên'),
    });
    const recaptchaRef = React.createRef();
    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        const recaptchaValue = recaptchaRef.current.getValue();
        if (recaptchaValue) {
            try {
                console.log(values);
                var apiResponse;
                if(name === '')
                    apiResponse = await axios.post(`http://127.0.0.1:5000/api/v1/district`, values);
                else{
                    apiResponse = await axios.put(`http://127.0.0.1:5000/api/v1/district/${id}`,values)
                } 
                console.log(apiResponse.data);
                // Send email to info.email       
                resetForm();  
                   
                setTimeout(() => {
                    window.location.reload();
                  }, 2000);


                toast({
                    title: 'Successful.',
                    description: id?("Quận đã được cập nhật."):("Quận đã được thêm mới."),
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                  });
                
                
                
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
    
    return (
        <ChakraProvider>
            <Box p={4}>
                <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                    {({ isSubmitting }) => (
                        <Form>
                            <FormControl>
                                <FormLabel htmlFor="name">Name</FormLabel>
                                <Field as={Input} type="text" id="name" name="name" />
                                <ErrorMessage name="name" component="div" className="error-message" style={{ color: 'red' }} />
                            </FormControl>
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

export default ReportForm;
