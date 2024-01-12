import * as React from 'react';
import { useState, useEffect } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { Heading } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import adBoardApi from '../../apis/adBoardApi';
import AdBoardList from '../adBoardList';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import ReportForm from '../ReportForm';
import { WarningTwoIcon, RepeatClockIcon } from '@chakra-ui/icons';
import { Carousel } from 'react-responsive-carousel';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
function PlannedLocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [adBoards, setAdBoards] = useState([]);

    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure();
    const { isOpen: isReportDetailOpen, onOpen: onReportDetailOpen, onClose: onReportDetailClose } = useDisclosure();
    const rp = useSelector((state) => state.report.reports.find((r) => r.reference_id === info._id));

    const report = rp ? { ...rp } : { isReported: false, images: [] };
    if (report.status === 'Pending' || report.status === 'Processing') {
        report.isReported = true;
    }
    if (report.status === 'Processed') {
        report.isReported = false;
    }
    const displayAddress = `${info.address}`;

    const navigate = useNavigate();

    const handleViewHistory = () => {
        navigate(`/report`);
    }

    useEffect(() => {
        const fetchData = async () => {
            try {

                const result = await adBoardApi.getAdBoardByLocationID(info._id);

                console.log("adBoards length:" + result.data.length);
                setAdBoards(result.data);


            } catch (error) {
                console.error('Error fetching data:', error);

            }
        };

        // Call the fetchData function when the component mounts or when viewport changes
        fetchData();
    }, [info._id]);
    const handleClose = () => {
        // Perform any additional actions you need here

        onClose();
    };
    return (
        <div>
            <Box width={350} >
                <Text fontWeight={'bold'}>{info.advertisingType}</Text>
                <Text fontWeight={'bold'}>{info.locationType}</Text>
                {displayAddress}
                <Text fontWeight={'bold'}>{info.planned ? "Đã Quy Hoạch" : "Chưa Quy Hoạch"}</Text>
                <Button colorScheme='blue' onClick={onOpen} variant='outline' size='xs'>
                    <ViewIcon boxSize={5} pr={2} >
                    </ViewIcon>
                    Xem Chi Tiết
                </Button>
                <Drawer placement={'right'} onClose={handleClose} isOpen={isOpen} size='md'>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth='1px'>Thông tin địa điểm quảng cáo
                            <br></br>
                            {/* <Button
                                colorScheme={report.isReported ? "yellow" : "red"}
                                leftIcon={<WarningTwoIcon />}
                                onClick={report.isReported ? onReportDetailOpen : onReportModalOpen}
                                variant={"outline"}  // Add the report icon to the left of the button text
                                mt={2}
                                size='sm'
                            >
                                {report.isReported ? "Reported" : "Report"}
                            </Button> */}
                            <Button
                                colorScheme="teal"
                                leftIcon={<RepeatClockIcon />}
                                onClick={handleViewHistory}
                                variant={"outline"}  // Add the report icon to the left of the button text
                                mt={2}
                                ml={2}
                                size='sm'
                            >
                                Report History
                            </Button>
                            <Modal isOpen={isReportModalOpen} onClose={onReportModalClose} size='4xl'>
                                <ModalOverlay />
                                <ModalContent >
                                    <ModalHeader>Report Location Form</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <ReportForm info={{ type: 'plannedLocation', _id: info._id, area: info.area }}></ReportForm>
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
                        </DrawerHeader>
                        <DrawerBody>
                            <Box>
                                <Heading size={"md"}>Có  {adBoards.length} biển quảng cáo</Heading>
                                {adBoards.length > 0 ? (
                                    adBoards.map((adBoard) => (



                                        <AdBoardList key={adBoard._id} info={{ ...adBoard, amount: adBoards.length, displayAddress, locationType: info.locationType, advertisingType: info.advertisingType }}></AdBoardList>


                                    ))
                                ) : (<>Chưa có biển quảng cáo nào được thêm</>)}
                            </Box>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>

        </div>
    );
}

export default React.memo(PlannedLocationInfo);