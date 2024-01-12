import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { ChakraProvider, Box, FormControl, FormLabel, Select, Button } from '@chakra-ui/react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useToast, Input } from '@chakra-ui/react';
import { useEffect } from 'react';


const DelAdBoardCBSo = (props) => {
    const { info,id, onClose, setUpdate } = props;
    const toast = useToast();

    const handleSubmit = async(values, { setSubmitting, resetForm }) =>{
        try{
            var isContain = null;
            const apiAdLicense = await axios.get(`http://127.0.0.1:5000/api/v1/advertisingLicenseRequest/adboard/${info._id}`);
            const apiReport = await axios.post(`http://127.0.0.1:5000/api/v1/report/adBoardtype/${info._id}`);
            if(apiAdLicense.data.data.length === 0 && apiReport.data.data.length === 0){
                console.log("get here");
                const apiResponse = await axios.delete(`http://127.0.0.1:5000/api/v1/adboards/${info._id}`);
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
                description:isContain ? ("Bảng quảng cáo đang xin cấp phép / có report") : ("Bảng quảng cáo đã được xóa."),
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
                            </div>
                        </Form>
                    )}
                </Formik>
            </Box>
        </ChakraProvider>
    )
}


export default DelAdBoardCBSo;
