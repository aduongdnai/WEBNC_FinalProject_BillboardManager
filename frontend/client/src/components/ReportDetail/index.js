import React, { useState, useEffect } from 'react';
import {
    Flex, Box, Text, Heading, useDisclosure, Button, Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { useParams } from "react-router-dom";
import ReportProcessForm from "../ReportProcessForm";
import axios from 'axios';
const ReportDetail = () => {
    const { rpId } = useParams();
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedAdboard, setSelectedAdboard] = useState(null);
    const [selectedAdboardLocation, setSelectedAdboardLocation] = useState(null);
    const { isOpen: isProcessModalOpen, onOpen: onProcessModalOpen, onClose: onProcessModalClose } = useDisclosure();
    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get(`http://127.0.0.1:5000/api/v1/report/${rpId}`);
                const selectedReportData = response.data.data[0];
                setSelectedReport(selectedReportData);

                //console.log(selectedReportData);
                if (selectedReportData.type === 'adboard') {
                    const adboardResponse = await axios.get(`http://127.0.0.1:5000/api/v1/adboards/find/${selectedReportData.reference_id}`);
                    const selectedAdboardData = adboardResponse.data.data[0];
                    setSelectedAdboard(selectedAdboardData);

                    const locationResponse = await axios.get(`http://127.0.0.1:5000/api/v1/adlocations/${selectedAdboardData.location_id}`);
                    const locationData = locationResponse.data.data[0];
                    setSelectedAdboardLocation(locationData);
                }



            } catch (error) {
                console.error('Error fetching:', error.message);
            }
        }
        fetchReport();
    }, [rpId]); // Include missing dependencies in the dependency array
    if (!selectedReport) {
        return <div>Loading...</div>; // or any other loading indication
    }

    if (selectedReport.type === 'plannedLocation') {
        return (
            <Box m={10}>
                <Heading>Chi tiết báo cáo</Heading>
                <Button

                    variant='outline'
                    colorScheme='teal'
                    onClick={() => {
                        onProcessModalOpen()
                    }}
                >

                    Cập nhật thông tin xử lí
                </Button>

                <Box >
                    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                        <Carousel>
                            {selectedReport.images.map((image, index) => (
                                <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                            ))}
                        </Carousel>
                    </CloudinaryContext>
                </Box>
                <Box>
                    <Text>Loại hình: {selectedReport.type}</Text>
                    <Text>Loại báo cáo: {selectedReport.reportType}</Text>
                    <Text>Tên người gửi: <b>{selectedReport.senderName}</b></Text>
                    <Text>Email: <b>{selectedReport.email}</b></Text>
                    <Text>Số điện thoại: <b>{selectedReport.phone}</b></Text>
                    <Text>Nội dung:<div dangerouslySetInnerHTML={{ __html: selectedReport.reportContent }} /></Text>
                    <br />
                    <Text>Trạng thái: <b>{selectedReport.status}</b></Text>
                </Box>
                <Modal isOpen={isProcessModalOpen} onClose={onProcessModalClose} size='3xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Xử lí báo cáo</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ReportProcessForm info={selectedReport} />
                        </ModalBody>


                    </ModalContent>
                </Modal></Box>
        );
    }
    if (!selectedAdboard || !selectedAdboardLocation) {
        return <div>Loading...</div>; // or any other loading indication
    }
    if (selectedReport.type === 'adboard') {
        return (
            <Box m={10}>
                <Heading>Chi tiết báo cáo</Heading>
                <Button

                    variant='outline'
                    colorScheme='teal'
                    onClick={() => {
                        onProcessModalOpen()
                    }}
                >

                    Cập nhật thông tin xử lí
                </Button>
                <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                    <Box flex='1' m={4} >
                        <Box >
                            <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                                {selectedAdboard.images && selectedAdboard.images.length > 0 ? (
                                    <Carousel>
                                        {selectedAdboard.images.map((image, index) => (
                                            <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                                        ))}
                                    </Carousel>
                                ) : (
                                    <p>No images available</p>
                                )}
                            </CloudinaryContext>
                        </Box>

                        <Box >
                            <Text color="gray.500">{selectedAdboardLocation.address}</Text>
                            <Text>Kiểu bảng: <b>{selectedAdboard.boardType} </b></Text>
                            <Text>Kích thước: {selectedAdboard.height}m x {selectedReport.width}m </Text>
                            <Text>Hình thức: <b>{selectedAdboardLocation.advertisingType}</b></Text>
                            <Text >Loại địa điểm: <b>{selectedAdboardLocation.locationType}</b></Text>
                        </Box>
                    </Box>

                    <Box flex='1' m={4}>
                        <Box >
                            <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                                <Carousel>
                                    {selectedReport.images.map((image, index) => (
                                        <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                                    ))}
                                </Carousel>
                            </CloudinaryContext>
                        </Box>
                        <Box>
                            <Text>Loại hình: {selectedReport.type}</Text>
                            <Text>Loại báo cáo: {selectedReport.reportType}</Text>
                            <Text>Tên người gửi: <b>{selectedReport.senderName}</b></Text>
                            <Text>Email: <b>{selectedReport.email}</b></Text>
                            <Text>Số điện thoại: <b>{selectedReport.phone}</b></Text>
                            <Text>Nội dung:<div dangerouslySetInnerHTML={{ __html: selectedReport.reportContent }} /></Text>
                            <br />
                            <Text>Trạng thái: <b>{selectedReport.status}</b></Text>
                            <Text>Cách thức xử lí: <b>{selectedReport.processMethod ? selectedReport.processMethod : 'Chưa xử lí'}</b></Text>
                        </Box>
                    </Box>

                </Flex>
                <Modal isOpen={isProcessModalOpen} onClose={onProcessModalClose} size='3xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Xử lí báo cáo</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ReportProcessForm info={selectedReport} />
                        </ModalBody>


                    </ModalContent>
                </Modal>
            </Box>
        );
    }



};

export default ReportDetail;
