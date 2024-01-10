import * as React from 'react';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { Box, Text, Button, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';
import { useEffect } from 'react';
import mapAPI from '../../apis/mapApi';
import { CloudinaryContext, Image as CloudinaryImage } from 'cloudinary-react';
import { Carousel } from 'react-responsive-carousel';

function ReportLocationInfo(props) {
    const { info } = props;
    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure();
    const [displayAddress, setDisplayAddress] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const result = await mapAPI.geoCodeToAddress(info.latitude, info.longitude);
            setDisplayAddress(result.results[0].formatted_address);
        }
        fetchData();
    }, [info]);
    return (
        <div>
            <Box width={350} >
                <Text fontWeight={'bold'}>Loại hình: {info.type}</Text>
                <Text fontWeight={'bold'}>Loại báo cáo: {info.reportType}</Text>
                {displayAddress && <Text >Địa chỉ: {displayAddress}</Text>}
                <Text >Trạng thái: {info.status === 'Pending' ? "Đang xử lý" : "Đã xử lý"}</Text>



                <Button
                    colorScheme={"blue"}
                    leftIcon={<ViewIcon />}
                    onClick={onReportModalOpen}
                    variant={"outline"}  // Add the report icon to the left of the button text
                    mt={2}
                    size='sm'
                >
                    Xem chi tiết
                </Button>
                <Modal isOpen={isReportModalOpen} onClose={onReportModalClose} size='4xl'>
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader>Report Location Detail</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box >
                                <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                                    <Carousel>
                                        {info.images.map((image, index) => (
                                            <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                                        ))}
                                    </Carousel>
                                </CloudinaryContext>
                            </Box>
                            <Box>
                                <Text>Loại hình: {info.type}</Text>
                                <Text>Loại báo cáo: {info.reportType}</Text>
                                <Text>Tên người gửi: <b>{info.senderName}</b></Text>
                                <Text>Email: <b>{info.email}</b></Text>
                                <Text>Số điện thoại: <b>{info.phone}</b></Text>
                                <Box>Nội dung:
                                    <div dangerouslySetInnerHTML={{ __html: info.reportContent }} />
                                </Box>
                                <br />
                                <Text>Trạng thái: <b>{info.status}</b></Text>
                            </Box>
                        </ModalBody>


                    </ModalContent>
                </Modal>
            </Box>

        </div>
    );
}

export default React.memo(ReportLocationInfo);