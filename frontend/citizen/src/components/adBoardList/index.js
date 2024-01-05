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
} from '@chakra-ui/react'
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { outline } from '@cloudinary/url-gen/actions/effect';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import ReportForm from '../ReportForm';
function AdBoardList(props) {
    const { info } = props;
    //const { isOpen, onOpen, onClose } = useDisclosure()
    const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure();
    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure();
    const { isOpen: isReportDetailOpen, onOpen: onReportDetailOpen, onClose: onReportDetailClose } = useDisclosure();
    const rp = JSON.parse(localStorage.getItem(`report_${info._id}`));
    const report = rp ? rp : { isReported: false, images: [] };
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

                        </Box>
                    </Flex>

                </Flex>
                <Button
                    colorScheme={report.isReported ? "yellow" : "red"}
                    leftIcon={<WarningTwoIcon />}
                    ml={10}
                    mt={4}
                    onClick={report.isReported ?   onReportDetailOpen:onReportModalOpen}
                    variant={"outline"}
                >
                    {report.isReported ? "Reported" : "Report"}
                </Button>
                
                <Modal isOpen={isReportModalOpen} onClose={onReportModalClose} size='4xl'>
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader>Report Form</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ReportForm info={{ type: 'adboard', _id: info._id }}></ReportForm>
                        </ModalBody>


                    </ModalContent>
                </Modal>

                <Modal isOpen={isReportDetailOpen} onClose={onReportDetailClose} size='2xl'>
                <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>DETAIL</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                        <Box >
                    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                        <Carousel>
                            {report.images.map((image, index) => (
                                <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                            ))}
                        </Carousel>
                    </CloudinaryContext>
                </Box>
                <Box>
                    <Text>Loại hình: {report.type}</Text>
                    <Text>Loại báo cáo: {report.reportType}</Text>
                    <Text>Tên người gửi: <b>{report.senderName}</b></Text>
                    <Text>Email: <b>{report.email}</b></Text>
                    <Text>Số điện thoại: <b>{report.phone}</b></Text>
                    <Text>Nội dung:<div dangerouslySetInnerHTML={{ __html: report.reportContent }} /></Text>
                    <br />
                    <Text>Trạng thái: <b>{report.status}</b></Text>
                </Box>
                        </ModalBody>


                    </ModalContent>
                </Modal>

            </CardHeader>

        </Card>

    );
}

export default AdBoardList;