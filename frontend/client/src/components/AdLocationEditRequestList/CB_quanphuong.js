import React, { useEffect } from 'react';
import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, ButtonGroup, Button, Center, useToast } from '@chakra-ui/react';
import { ViewIcon, SmallCloseIcon, InfoOutlineIcon, ArrowDownIcon } from '@chakra-ui/icons';
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
    Heading,

} from '@chakra-ui/react'
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { Carousel } from 'react-responsive-carousel';
import userApi from '../../apis/userApi.js';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';
import adBoardApi from '../../apis/adBoardApi.js';
import { useSelector } from 'react-redux';
import axios from 'axios';
function AdLocationEditRequestListCBQuanPhuong() {
    const [request, setRequest] = React.useState(null);
    const [requestList, setRequestsList] = React.useState([]);
    const userData = useSelector(state => state.auth.userData);
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [update, setUpdate] = React.useState(false);
    const toast = useToast();
    const handleViewRequest = async (request) => {
        setRequest(request);
        onOpen();


    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                //const result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequestByUserId(user._id);
                const data = { userRequest: userData.email };
                const result = await axios.post(`http://localhost:5000/api/v1/adLocationEditRequest/findByUserRequest/`, data)
                console.log(result.data);
                setRequestsList(result.data);
                setUpdate(false);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();

    }, [update]);
    const handleRejectRequest = async () => {
        try {
            setUpdate(true);
            onClose();

        } catch (error) {
            console.log(error);
            toast({
                title: 'Xóa thất bại.',
                description: "Vui lòng thử lại",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }

    }
    return (
        <Box width="full" overflowX="auto">
            <Table variant="unstyled">
                <Thead>
                    <Tr>
                        <Th>Time</Th>
                        <Th>Name</Th>
                        <Th>Role</Th>
                        <Th>Address</Th>
                        <Th>Reason</Th>
                        <Th>Status</Th>
                        <Th>Actions</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {requestList && requestList.map((request, index) => (
                        <Tr key={index}>
                            <Td><Text isTruncated maxWidth="200px">{new Date(request.createdAt).toLocaleDateString()}</Text></Td>
                            <Td>{request.user.username}</Td>
                            <Td>{request.user.role === "CB-Phuong" ? `Can Bo Phuong ${request.user.ward} Quan ${request.user.district}` : request.user.role === "CB-Quan" ? `Can Bo Quan ${request.user.district}` : "Can Bo So"}</Td>
                            <Td>{request.adLocation.address}</Td>
                            <Td>{request.reason}</Td>
                            <Td>{request.status}</Td>
                            <Td>
                                <Center>
                                    <ButtonGroup>
                                        <Button variant={"outline"} colorScheme="blue" size="sm" leftIcon={<ViewIcon />} onClick={() => handleViewRequest(request)}>View</Button>

                                    </ButtonGroup>
                                </Center>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader> <InfoOutlineIcon></InfoOutlineIcon> Thông tin chi tiết yêu cầu thay đổi</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {request && <VStack align="start" spacing={4}>
                            <Heading size="md">Yêu cầu chỉnh sửa điểm đặt quảng cáo</Heading>
                            <Text><Text as='b'>Người gửi: </Text>{request.user.username}</Text>
                            <Text><Text as='b'>Email: </Text>{request.user.email}</Text>
                            <Text><Text as='b'>Vai trò: </Text>{request.user.role === "CB-Phuong" ? `Can Bo Phuong ${request.user.ward} Quan ${request.user.district}` : request.user.role === "CB-Quan" ? `Can Bo Quan ${request.user.district}` : "Can Bo So"}</Text>
                            <Text><Text as='b'>Địa điểm: </Text>{request.adLocation.address}</Text>
                            <Text><Text as='b'>Loại địa điểm: </Text>{request.adLocation.locationType} {request.status === "Pending"?`->${request.locationType}`:''} </Text>
                            <Text><Text as='b'>Loại quảng cáo: </Text>{request.adLocation.advertisingType} {request.status === "Pending"?`->${request.advertisingType}`:''}</Text>
                            <Text><Text as='b'>Quy hoạch: </Text>{request.adLocation.planned?"Đã quy hoạch":"Chưa quy hoạch"} {request.status === "Pending"?`->${request.planned?"Đã quy hoạch":"Chưa quy hoạch"}`:''}</Text>
                            <Text><Text as='b'>Số lượng quảng cáo: </Text>{request.adLocation.numberAdBoard}{request.status === "Pending"?`->${request.numberAdBoard}`:''}</Text>
                            <Text><Text as='b'>Hình ảnh: </Text></Text>
                            <Box>
                                <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">

                                    <CloudinaryImage publicId={request.adLocation.image} width="300" height="150" />

                                </CloudinaryContext>
                            </Box>
                            {request.status === "Pending"?(<>
                            <ArrowDownIcon />
                            <Box>
                                <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">

                                    <CloudinaryImage publicId={request.image} width="300" height="150" />


                                </CloudinaryContext>
                            </Box></>):(<></>)}
                            <Text>Lý do: {request.reason}</Text>
                            <Text>Ngày yêu cầu: {new Date(request.createdAt).toLocaleDateString()}</Text>
                            <Text>Trạng thái: {request.status}</Text>
                        </VStack>}

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {request && request.status === "Reject" && <Button colorScheme="red" onClick={handleRejectRequest}>Delete</Button>}



                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    );
}

export default AdLocationEditRequestListCBQuanPhuong;