import React from 'react';
import { Card, CardHeader, Flex, Heading, Box, Text, Button, IconButton, Tooltip, useDisclosure } from '@chakra-ui/react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useToast
} from '@chakra-ui/react'
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import AdvertisingLicenseRequestForm from '../AdvertisingLicenseRequestForm';
import AdvertisingLicenseRequestApi from '../../apis/advertisingLicenseRequestApi.js';

function AdBoardList(props) {
    const { info } = props;
    //const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure();
    const { isOpen: isAdvertisingLicenseOpen, onOpen: onAdvertisingLicenseOpen, onClose: onAdvertisingLicenseClose } = useDisclosure();
    const toast = useToast();

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
                            <Button colorScheme='blue' variant={"outline"} onClick={onAdvertisingLicenseOpen}>Gửi yêu cầu cấp phép</Button>
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
                </Flex>
            </CardHeader>

        </Card>

    );
}

export default AdBoardList;