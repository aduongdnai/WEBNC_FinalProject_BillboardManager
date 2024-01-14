import { serverClient } from '../../../apis/serverAxiosClient';
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
    const { name,id, isDelete, onClose, setUpdate } = props;

    const toast = useToast();
    if(!isDelete){
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
                    var isExist = null;
                    console.log(name);
                    if(name === ''){
                        const apiCheck = await serverClient.post(`/advertisingType/findType`, {area: values.name});
                        if(apiCheck.data.length === 0){
                            apiResponse = await serverClient.post(`/advertisingType`, values);
                            initialValues.name = values.name
                            setUpdate(true);
                            isExist = false
                        }
                        if(apiCheck.data.data.length > 0) {
                            isExist = true
                        }
                    }
                    else{
                        const apiCheck = await serverClient.post(`/advertisingType/findType`, {area: values.name});
                        // const apiContain = await serverClient.post(`/adlocations/findByAdType`, {area: `${name}`});
                        if(apiCheck.data.length === 0){
                            // if(apiContain.data.data.length === 0){
                                apiResponse = await serverClient.put(`/advertisingType/${id}`,values)
                                const apiUpdate = await serverClient.put(`/adlocations/updateAdType`,{oldAdType: name, newAdType: values.name})
                                initialValues.name = values.name
                                setUpdate(true);
                            // }
                            // else isContain = true;
                            isExist = false
                        }
                        else isExist = true
                    } 
                    if(isExist === false) {
                        resetForm();  
                        setTimeout(() => {
                            onClose()
                        }, 1000);
                    }        


                    toast({
                        title:(isExist ? ('Error') : ('Successful.')),
                        description:(isExist? ("Loại quảng cáo đã tồn tại") : (id?("Loại quảng cáo đã được cập nhật."):("Loại quảng cáo đã được thêm mới."))),
                        status:(isExist ? ('error') : ('success')),
                        duration: 2000,
                        isClosable: true,
                    });


                    // toast({
                    //     title: 'Successful.',
                    //     description: id?("Phường đã được cập nhật."):("Phường đã được thêm mới."),
                    //     status: 'success',
                    //     duration: 2000,
                    //     isClosable: true,
                    // });
                    
                    
                    
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
    }
    else{
        const handleSubmit = async(values, { setSubmitting, resetForm }) =>{
            try{
                var isContain = null;
                console.log(values);
                const apiContain = await serverClient.post(`/adlocations/findByAdType`, {area: `${name}`});
                console.log(apiContain);
                if(apiContain.data.length === 0){
                    console.log("get here");
                    const apiResponse = await serverClient.delete(`advertisingType/${id}`);
                    setUpdate(true);
                    isContain = false;
                }
                else isContain = true;
                if(isContain === false) {
                    resetForm();
                    setTimeout(() => {
                        onClose()
                    }, 1000);
                }
                toast({
                    title: isContain? ('Error') : ('Successful.'),
                    description:isContain ? ("Loại quảng cáo đã tồn tại điểm quảng cáo") : ("Loại quảng cáo đã được xóa."),
                    status:isContain ? ('error') : ('success'),
                    duration: 2000,
                    isClosable: true,
                }); 
            }catch (error) {
                // Handle any errors from the server
                console.error(error);
            } finally {
                // Reset the submitting state
                setSubmitting(false);
            }
        }
        return(
            <ChakraProvider>
                <Box p={4}>
                    <Formik initialValues={{name:''}} onSubmit={handleSubmit}>
                        {({ isSubmitting }) => (
                            <Form>
                                <FormLabel htmlFor="name">Want to delete?</FormLabel>
                                <br />
                                <div style={{display:"flex", justifyContent:"space-between"}}>
                                    <Button colorScheme='red' variant='outline' type="submit" disabled={isSubmitting}>Yes</Button>
                                    <Button colorScheme='teal' variant='outline' onClick={onClose}>No</Button>
                                </div>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </ChakraProvider>
        )
    }
};

export default ReportForm;
