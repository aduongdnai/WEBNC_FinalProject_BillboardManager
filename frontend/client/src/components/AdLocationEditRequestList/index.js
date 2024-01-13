import React from 'react';
import AdvertisingLicenseForm from '../AdvertisingLicenseRequestForm/index.js';
import { Center, Box, Heading } from '@chakra-ui/react';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';
import { useUser } from '../LoginSignup/userContext.js';
import { useToast } from "@chakra-ui/react"
import { useEffect } from 'react';
import AdLocationEditRequestListCBSO from './CB_So.js';
import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
import AdLocationEditRequestListCBQuanPhuong from './CB_quanphuong.js';
import { useSelector } from 'react-redux';


function AdLocationEditRequestList(props) {
    const user = useSelector(state => state.auth.userData);
    const toast = useToast();
    const [requests, setRequests] = React.useState([]);

    useEffect(() => {

        const fetchData = async () => {
            try {
                let result;
                if (user.role === "CB-So") {
                    result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequest();
                }
                else {
                    result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequestByUserId(user._id);
                }
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
                    {user.role === "CB-So" ?
                        <AdLocationEditRequestListCBSO requests={requests}> </AdLocationEditRequestListCBSO>
                        : <AdLocationEditRequestListCBQuanPhuong > </AdLocationEditRequestListCBQuanPhuong>}


                </CardBody>

                <CardFooter>

                </CardFooter>
            </Card>

        </Box>

    );
}

export default AdLocationEditRequestList;