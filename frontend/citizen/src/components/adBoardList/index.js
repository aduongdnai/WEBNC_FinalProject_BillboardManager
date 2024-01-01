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

function AdBoardList(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    console.log(process.env.REACT_APP_CLOUDINARY_CLOUD_NAME);
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
                            onClick={onOpen}
                        >

                        </IconButton>
                    </Tooltip>
                    <Modal isOpen={isOpen} onClose={onClose}>
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
                                <Button
                                    colorScheme="red"  // Set the button color to red
                                    leftIcon={<WarningTwoIcon />}
                                    ml={10}
                                    mt={4}
                                    variant={"outline"}  // Add the report icon to the left of the button text
                                >
                                    Report
                                </Button>

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
                    colorScheme="red"  // Set the button color to red
                    leftIcon={<WarningTwoIcon />}
                    ml={10}
                    mt={4}
                    variant={"outline"}  // Add the report icon to the left of the button text
                >
                    Report
                </Button>
            </CardHeader>

        </Card>

    );
}

export default AdBoardList;