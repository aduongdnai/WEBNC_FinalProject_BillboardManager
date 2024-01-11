import React, { useEffect, useState } from 'react';
import { Card, CardHeader, Flex, Heading, Box, Text, Button, IconButton, Tooltip, useDisclosure, ButtonGroup } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast,
    VStack
} from '@chakra-ui/react'
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AdvertisingLicenseRequestForm from '../AdvertisingLicenseRequestForm';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';
import adBoardApi from '../../apis/adBoardApi.js';
import { useSelector } from 'react-redux';

function AdBoardList(props) {
    const { info } = props;
    //const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure();
    const { isOpen: isAdvertisingLicenseOpen, onOpen: onAdvertisingLicenseOpen, onClose: onAdvertisingLicenseClose } = useDisclosure();
    const { isOpen: isAdvertisingLicenseDetailOpen, onOpen: onAdvertisingLicenseDetailOpen, onClose: onAdvertisingLicenseDetailClose } = useDisclosure();
    const toast = useToast();
    const user = useSelector(state => state.auth.userData);
    const [adAdvertisingLicenseRequest, setAdAdvertisingLicenseRequest] = useState(false);
    const handleSubmitForm = async (values, actions) => {
        try {
            const result = await AdvertisingLicenseRequestApi.addAdvertisingLicenseRequest(values);
            console.log(result);
            if (result) {
                toast({
                    title: 'Gửi thành công.',
                    description: "Đơn yêu cầu cấp phép bảng quảng cáo của bạn đã được gửi thành công.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });
                const resultUpdate = await adBoardApi.updateAdboard(info._id, { advertisingLicense_id: result.data._id });
                if (resultUpdate) {
                    info.advertisingLicense_id = result.data._id;
                }
            }
        } catch (error) {
            console.log(error);
            toast({
                title: 'Gửi thất bại.',
                description: "Hãy xem lại thông tin đơn yêu cầu.",
                status: 'error',
                duration: 2000,
                isClosable: true,
            });
        }
        onAdvertisingLicenseClose();

    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await AdvertisingLicenseRequestApi.getAdvertisingLicenseRequestByAdBoardId(info._id);
                console.log(result.data);
                setAdAdvertisingLicenseRequest(result.data[0]);
            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };
        fetchData();
    }, [info._id, info.advertisingLicense_id]);
    const handleRejectRequest = async () => {
        try {
            console.log(adAdvertisingLicenseRequest.adBoardId);
            const adboarResult = await adBoardApi.updateAdboard(adAdvertisingLicenseRequest.adBoard, { advertisingLicense_id: null })
            if (adboarResult) {
                info.advertisingLicense_id = null;
            }
            if (adboarResult.msg !== "success") {
                return;
            }
            const result = await AdvertisingLicenseRequestApi.deleteAdvertisingLicenseRequest(adAdvertisingLicenseRequest._id);
            if (result.msg === "success") {
                toast({
                    title: 'Xóa thành công.',
                    description: "Đơn dăng ký đã bị xóa.",
                    status: 'success',
                    duration: 2000,
                    isClosable: true,
                });

            }
            onAdvertisingLicenseDetailClose();
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

        <Card

            variant={"outline"}

            borderRadius="md"
            boxShadow="md"
            mt={4}

        >
            <CardHeader>
                <Flex >
                    <Tooltip label='Xem chi tiết' placement='bottom'>
                        <IconButton
                            isRound={true}
                            icon={<InfoOutlineIcon />}
                            fontSize='20px'
                            variant='outline'
                            colorScheme='teal'
                            mr={2}
                            onClick={onInfoModalOpen}
                        >

                        </IconButton>
                    </Tooltip>
                    <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>{info.boardType}</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                    <Box>
                                        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                                            <Carousel>
                                                {info.images.map((image, index) => (
                                                    <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                                                ))}
                                            </Carousel>

                                        </CloudinaryContext>
                                    </Box>
                                    <Box>

                                        <Text color="gray.500">{info.displayAddress}</Text>
                                        <Text>Số lượng: {info.amount} <b>trụ/bảng</b></Text>
                                        <Text>Kích thước: {info.height}m x {info.width}m </Text>
                                        <Text>Hình thức: <b>{info.advertisingType}</b></Text>
                                        <Text >Loại địa điểm: <b>{info.locationType}</b></Text>
                                        {info.expiryDate && <Text>Ngày hết hạn: {new Date(info.expiryDate).toLocaleDateString()}</Text>}
                                    </Box>
                                </Flex>
                            </ModalBody>

                            <ModalFooter>


                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                        <Box>
                            <Heading size='md'>{info.boardType}</Heading>
                            <Text color="gray.500">{info.displayAddress}</Text>
                            <Text>Số lượng: {info.amount} <b>trụ/bảng</b></Text>
                            <Text>Kích thước: {info.height}m x {info.width}m </Text>
                            <Text>Hình thức: <b>{info.advertisingType}</b></Text>
                            <Text fontWeight={'bold'}></Text>
                            <Text >Loại địa điểm: <b>{info.locationType}</b></Text>

                            {user.role !== "CB-So" &&
                                <ButtonGroup>

                                    {info.advertisingLicense_id !== null ?
                                        <Button colorScheme='blue' variant={"outline"} onClick={onAdvertisingLicenseDetailOpen}>Xem yêu cầu cấp phép</Button>
                                        :
                                        <Button colorScheme='blue' variant={"outline"} onClick={onAdvertisingLicenseOpen}>Gửi yêu cầu cấp phép</Button>
                                    }
                                </ButtonGroup>
                            }


                        </Box>
                    </Flex>
                    <Modal isOpen={isAdvertisingLicenseOpen} onClose={onAdvertisingLicenseClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Gửi yêu cầu cấp phép quảng cáo</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <AdvertisingLicenseRequestForm onSubmit={handleSubmitForm} adboardInfo={info}></AdvertisingLicenseRequestForm>
                            </ModalBody>

                            <ModalFooter>


                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                    <Modal isOpen={isAdvertisingLicenseDetailOpen} onClose={onAdvertisingLicenseDetailClose} scrollBehavior='inside'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader> <InfoOutlineIcon></InfoOutlineIcon> Thông tin chi tiết</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                {adAdvertisingLicenseRequest && <VStack align="start" spacing={4}>
                                    <Heading size="md">Tên Công Ty: {adAdvertisingLicenseRequest.companyInfo.name}</Heading>
                                    <Box>
                                        <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                                            <Carousel>
                                                {adAdvertisingLicenseRequest.adImage.map((image, index) => (
                                                    <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                                                ))}
                                            </Carousel>

                                        </CloudinaryContext>
                                    </Box>
                                    <Text>Email: {adAdvertisingLicenseRequest.companyInfo.contact.email}</Text>
                                    <Text>Số điện thoại: {adAdvertisingLicenseRequest.companyInfo.contact.phone}</Text>
                                    <Text>Nội dung quảng cáo: {adAdvertisingLicenseRequest.adContent}</Text>
                                    <Text>Ngày bắt đầu: {new Date(adAdvertisingLicenseRequest.startDate).toLocaleDateString()}</Text>
                                    <Text>Ngày kết thúc: {new Date(adAdvertisingLicenseRequest.endDate).toLocaleDateString()}</Text>
                                    <Text>Trạng thái: {adAdvertisingLicenseRequest.status}</Text>
                                </VStack>}

                            </ModalBody>
                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onAdvertisingLicenseDetailClose}>
                                    Close
                                </Button>
                                {adAdvertisingLicenseRequest && adAdvertisingLicenseRequest.status !== "Approved" && <Button colorScheme="red" onClick={handleRejectRequest}>Delete</Button>}



                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                </Flex>
            </CardHeader>

        </Card>

    );
}

export default AdBoardList;