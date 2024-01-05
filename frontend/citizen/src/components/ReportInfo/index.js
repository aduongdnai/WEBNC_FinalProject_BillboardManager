import React from 'react';
import { Flex, Box, Text } from '@chakra-ui/react';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { Carousel } from 'react-responsive-carousel';
const ReportInfo = ({ info, adboard, location }) => {
    return (
        <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
            <Box flex='1' m={4}>
                <Box >
                    <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                        <Carousel>
                            {adboard.images.map((image, index) => (
                                <CloudinaryImage key={index} publicId={image} width="300" height="150" />
                            ))}
                        </Carousel>
                    </CloudinaryContext>
                </Box>

                <Box >
                    <Text color="gray.500">{location.address}</Text>
                    <Text>Kiểu bảng: <b>{adboard.boardType} </b></Text>
                    <Text>Kích thước: {adboard.height}m x {info.width}m </Text>
                    <Text>Hình thức: <b>{location.advertisingType}</b></Text>
                    <Text >Loại địa điểm: <b>{location.locationType}</b></Text>
                </Box>
            </Box>

            <Box flex='1' m={4}>
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
                    <Text>Nội dung:<div dangerouslySetInnerHTML={{ __html: info.reportContent }} /></Text>
                    <br />
                    <Text>Trạng thái: <b>{info.status}</b></Text>
                </Box>
            </Box>

        </Flex>
    );
};

export default ReportInfo;
