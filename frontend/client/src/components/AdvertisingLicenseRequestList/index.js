import React from 'react';
import AdvertisingLicenseForm from '../AdvertisingLicenseRequestForm/index.js';
import { Center, Box, Heading } from '@chakra-ui/react';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';
import { useUser } from '../LoginSignup/userContext';
import { useToast } from "@chakra-ui/react"
function AdvertisingLicenseRequestList(props) {
    const user = useUser();
    const toast = useToast();
    const handleSubmitForm = async (values, actions) => {
        try {
            const result = await AdvertisingLicenseRequestApi.addAdvertisingLicenseRequest(values);
            console.log(result);
            if (result) {
                toast({
                    title: 'Đăng ký thành công.',
                    description: "Đơn dăng ký của bạn đã được gửi thành công.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Đăng ký thất bại.',
                description: "Hãy xem lại thông tin đăng ký.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }


    }
    return (
        <Box width={"100%"}>
            <Center>
                <Heading as="h1" size="lg" p="5">Đơn đăng ký cấp phép quảng cáo</Heading>
            </Center>
            <Center>

                <AdvertisingLicenseForm onSubmit={handleSubmitForm}>

                </AdvertisingLicenseForm>
            </Center>
        </Box>

    );
}

export default AdvertisingLicenseRequestList;