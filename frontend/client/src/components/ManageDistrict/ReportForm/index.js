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
import { useEffect } from 'react';

const ReportForm = (props) => {
    const { name,id, isDelete, onClose, setUpdate } = props;
    // const [isExist, setIsExist] = useState(null);
    const toast = useToast();
    if(!isDelete){
        const initialValues = {
            name: name,
        };

        const validationSchema = Yup.object({
            name: Yup.string().required('Cần nhập tên'),
        });

        
        const recaptchaRef = React.createRef();
        // useEffect(() => {
        //     // This will log the updated state after it has been set
        //     if(isExist)
        // }, [isExist]);
        const handleSubmit = async (values, { setSubmitting, resetForm }) => {
            const recaptchaValue = recaptchaRef.current.getValue();
            if (recaptchaValue) {
                try {
                    console.log(values);
                    var apiResponse;
                    var isExist = null;
                    var isContain = null;
                    if(name === ''){
                        const apiCheck = await serverClient.post(`/district/findDistrict`, {area: values.name});
                        console.log(apiCheck.data);
                        if(apiCheck.data && apiCheck.data.length === 0){
                            apiResponse = await serverClient.post(`/district`, values);
                            initialValues.name = values.name
                            setUpdate(true);
                            isExist = false
                            isContain = false
                        }
                        if(apiCheck.data.data.length > 0) {
                            isExist = true
                        }
                        // console.log(isExist.state);
                    }
                    else{
                        const apiCheck = await serverClient.post(`/district/findDistrict`, {area: values.name});
                        const apiContain = await serverClient.post(`/adlocations/findByArea`, {area: name});
                        if(apiCheck.data && apiCheck.data.length === 0){
                            if(apiContain.data && apiContain.data.length === 0){
                                apiResponse = await serverClient.put(`/district/${id}`,values);
                                initialValues.name = values.name
                                setUpdate(true);
                                isContain = false;
                            }
                            else isContain = true;
                            isExist = false
                        }
                        else isExist = true
                    } 
                    
                
                    if(isExist === false && isContain === false) {
                        resetForm();  
                        setTimeout(() => {
                            onClose()
                        }, 1000);
                    }               
                    
                    toast({
                        title: isContain? ('Error') : (isExist ? ('Error') : ('Successful.')),
                        description:isContain ? ("Quận đã có điểm quảng cáo") : (isExist? ("Quận đã tồn tại") : (id?("Quận đã được cập nhật."):("Quận đã được thêm mới."))),
                        status:isContain ? ('error') : (isExist ? ('error') : ('success')),
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
    }
    else{
        const handleSubmit = async(values, { setSubmitting, resetForm }) =>{
            try{
                var isContain = null;
                const apiContain = await serverClient.post(`/adlocations/findByArea`, {area: name});
                if(apiContain.data && apiContain.data.length === 0){
                    console.log("get here");
                    const apiResponse = await serverClient.delete(`/district/${id}`);
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
                    description:isContain ? ("Quận đã có điểm quảng cáo") : ("Quận đã được xóa."),
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
