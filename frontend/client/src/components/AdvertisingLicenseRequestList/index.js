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
import { useSelector } from 'react-redux';


function AdvertisingLicenseRequestList(props) {
    const user = useSelector(state => state.auth.userData);
    const toast = useToast();
    const [requests, setRequests] = React.useState([]);
    const [update, setUpdate] = React.useState(false);
    useEffect(() => {

        const fetchData = async () => {
            try {
                let result;
                if (user.role === "CB-So") {
                    result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequest();
                    setUpdate(false);
                }
                else {
                    result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequestByUserId(user._id);
                    setUpdate(false);
                }
                setRequests(result.data);
                console.log(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [update])
    return (
        <Box width={"100%"}>
            <Card maxW='8xl'>
                <CardBody>
                    {user.role === "CB-So" ?
                        <AdvertisingLicenseRequestListCBSO requests={requests} setUpdate={setUpdate}> </AdvertisingLicenseRequestListCBSO>
                        : <AdvertisingLicenseRequestListCBQuanPhuong requests={requests} setUpdate={setUpdate}> </AdvertisingLicenseRequestListCBQuanPhuong>}


                </CardBody>

                <CardFooter>

                </CardFooter>
            </Card>

        </Box>

    );
}

export default AdvertisingLicenseRequestList;