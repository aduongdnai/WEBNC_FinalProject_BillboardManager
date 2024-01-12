import React, { useEffect } from 'react';
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

function AdvertisingLicenseRequestListCBQuanPhuong({ requests }) {
    const [request, setRequest] = React.useState(null);
    const [requestList, setRequestsList] = React.useState(requests);
    const user = useSelector(state => state.auth.userData);
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
                const result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequestByUserId(user._id);
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
            const adboarResult = await adBoardApi.updateAdboardDuong(request.adBoard, { advertisingLicense_id: null })
            if (adboarResult.msg !== "success") {
                return;
            }
            const result = await AdvertisingLicenseRequestApi.deleteAdvertisingLicenseRequest(request._id);
            if (result.msg === "success") {
                toast({
                    title: 'Xóa thành công.',
                    description: "Đơn dăng ký đã bị xóa.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                setUpdate(true);
            }
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
                    {requestList && requestList.map((request, index) => (
                        <Tr key={index}>
                            <Td><Text isTruncated maxWidth="200px">{request.companyInfo.name}</Text></Td>
                            <Td>{request.companyInfo.contact.email}</Td>
                            <Td>{request.companyInfo.contact.phone}</Td>
                            <Td>{new Date(request.startDate).toLocaleDateString()}</Td>
                            <Td>{new Date(request.endDate).toLocaleDateString()}</Td>
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
                        </VStack>}

                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                        {request && request.status !== "Approved" && <Button colorScheme="red" onClick={handleRejectRequest}>Delete</Button>}



                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}

export default AdvertisingLicenseRequestListCBQuanPhuong;