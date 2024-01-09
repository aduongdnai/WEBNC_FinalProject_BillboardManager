import React from 'react';
import AdvertisingLicenseForm from '../AdvertisingLicenseRequestForm/index.js';
import { Center, Box, Heading } from '@chakra-ui/react';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';
import { useUser } from '../LoginSignup/userContext';
import { useToast } from "@chakra-ui/react"
import { useEffect } from 'react';
import AdvertisingLicenseRequestListCBSO from './CB_So.js';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import AdvertisingLicenseRequestListCBQuanPhuong from './CB_quanphuong.js';


function AdvertisingLicenseRequestList(props) {
    const user = useUser();
    const toast = useToast();
    const [requests, setRequests] = React.useState([]);

    useEffect(() => {
        console.log(user.userData);
        const fetchData = async () => {
            try {
                const result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequest();
                setRequests(result.data);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [])
    return (
        <Box width={"100%"}>
            <Card maxW='8xl'>
                <CardBody>
                    <AdvertisingLicenseRequestListCBSO requests={requests}> </AdvertisingLicenseRequestListCBSO>
                    <AdvertisingLicenseRequestListCBQuanPhuong requests={requests}> </AdvertisingLicenseRequestListCBQuanPhuong>
                </CardBody>

                <CardFooter>

                </CardFooter>
            </Card>

        </Box>

    );
}

export default AdvertisingLicenseRequestList;