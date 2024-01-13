import React, { useEffect, useState } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, ButtonGroup, Button, Center, useToast } from '@chakra-ui/react';
import { ViewIcon, SmallCloseIcon, InfoOutlineIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    VStack,
    Heading
} from '@chakra-ui/react'
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { Carousel } from 'react-responsive-carousel';
import userApi from '../../apis/userApi';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';
import adBoardApi from '../../apis/adBoardApi.js';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setViewport, } from '../actions/viewportAction'
import adLocationApi from '../../apis/adLocationApi.js';
import { FaMap } from 'react-icons/fa'

function AdvertisingLicenseRequestListCBSO({ requests, setUpdate }) {
    const [request, setRequest] = React.useState(null);
    const [requestList, setRequestsList] = React.useState(requests);
    const user = useSelector(state => state.auth.userData);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const toast = useToast();

    const navigate = useNavigate();
    const dispatch = useDispatch()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequest();
                setRequestsList(result.data);

            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, []);
    const handleViewRequest = async (request) => {

        try {
            console.log(request);
            const result = await userApi.getUserByID(request.user_id);
            console.log(result);
            setRequest({ ...request, poster_email: result.data.email });
        } catch (error) {
            console.log(error);
        }
        onOpen();


    }
    const handleApproveRequest = async () => {

        const result = await AdvertisingLicenseRequestApi.updateAdvertisingLicenseRequest(request._id, { status: "Approved" });
        console.log(result);
        if (result.msg === "success") {
            setUpdate(true);
            const adboarResult = await adBoardApi.updateAdboardDuong(request.adBoard, { images: request.adImage, expiryDate: request.endDate })
            toast({
                title: 'Approve thành công.',
                description: "Đơn dăng ký đã được approve thành công.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
        onClose();
    }
    const handleRejectRequest = async () => {

        const result = await AdvertisingLicenseRequestApi.updateAdvertisingLicenseRequest(request._id, { status: "Rejected" });
        if (result.msg === "success") {
            setUpdate(true);
            const adboarResult = await adBoardApi.updateAdboardDuong(request.adBoard, { advertisingLicense_id: null })
            toast({
                title: 'Từ chối thành công.',
                description: "Đơn dăng ký đã bị từ chối.",
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
        }
        onClose();
    }
    const handleChangeViewPort = async (request) => {
        const location = await AdvertisingLicenseRequestApi.getAdlocation(request.adBoard);
        console.log(location);

        const newViewport = {
            latitude: location.data[0].coordinates.coordinates[1],
            longitude: location.data[0].coordinates.coordinates[0],
            zoom: 20,
            transitionDuration: 5000, // Adjust the zoom level as needed

        };
        dispatch(setViewport(newViewport));
        navigate("/");
    }
    return (
        <Box width="full" overflowX="auto">
            <Table variant="striped">
                <Thead>
                    <Tr>
                        <Th>Company Name</Th>
                        <Th>Contact Email</Th>
                        <Th>Contact Phone</Th>
                        <Th>Start Date</Th>
                        <Th>End Date</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {requests && requests.map((request, index) => (
                        <Tr key={index}>
                            <Td><Text isTruncated maxWidth="200px">{request.companyInfo.name}</Text></Td>
                            <Td>{request.companyInfo.contact.email}</Td>
                            <Td>{request.companyInfo.contact.phone}</Td>
                            <Td>{new Date(request.startDate).toLocaleDateString()}</Td>
                            <Td>{new Date(request.endDate).toLocaleDateString()}</Td>
                            <Td>{request.status}</Td>
                            <Td>

                                <ButtonGroup>
                                    <Button variant={"outline"} colorScheme="blue" size="sm" leftIcon={<ViewIcon />} onClick={() => handleViewRequest(request)}>View</Button>
                                    <Button variant={"outline"} colorScheme="blue" size="sm" leftIcon={<FaMap />} onClick={() => handleChangeViewPort(request)}>Map</Button>

                                </ButtonGroup>

                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> <InfoOutlineIcon></InfoOutlineIcon> Thông tin chi tiết</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {request && <VStack align="start" spacing={4}>
                            <Heading size="md">Tên Công Ty: {request.companyInfo.name}</Heading>
                            <Box>
                                <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                                    <Carousel>
                                        {request.adImage.map((image, index) => (
                                            <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                                        ))}
                                    </Carousel>

                                </CloudinaryContext>
                            </Box>
                            <Text>Email: {request.companyInfo.contact.email}</Text>
                            <Text>Số điện thoại: {request.companyInfo.contact.phone}</Text>
                            <Text>Nội dung quảng cáo: {request.adContent}</Text>
                            <Text>Ngày bắt đầu: {new Date(request.startDate).toLocaleDateString()}</Text>
                            <Text>Ngày kết thúc: {new Date(request.endDate).toLocaleDateString()}</Text>
                            <Text>Trạng thái: {request.status}</Text>
                            <Text>Email người gửi yêu cầu: {request.poster_email}</Text>
                        </VStack>}

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {request && request.status === "Pending" &&
                            <Button mr={3} colorScheme='green' onClick={handleApproveRequest}>Approve</Button>
                        }
                        {request && request.status === "Pending" &&
                            <Button colorScheme="red" onClick={handleRejectRequest}>Reject</Button>
                        }

                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AdvertisingLicenseRequestListCBSO;