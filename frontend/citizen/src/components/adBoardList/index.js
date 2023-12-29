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
import { InfoOutlineIcon, WarningTwoIcon } from '@chakra-ui/icons';
import { outline } from '@cloudinary/url-gen/actions/effect';
function AdBoardList(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    return (

        <Card
            // Background color for success
            variant={"outline"}     // Text color
            // Padding
            borderRadius="md"  // Border radius
            boxShadow="md"
            mt={4}
        // Box shadow
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
                            <ModalHeader>Modal Title</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                Hello world
                            </ModalBody>

                            <ModalFooter>
                                <Button colorScheme='blue' mr={3} onClick={onClose}>
                                    Close
                                </Button>
                                <Button variant='ghost'>Secondary Action</Button>
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