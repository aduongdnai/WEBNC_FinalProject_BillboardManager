import * as React from 'react';
import { useState, useEffect } from 'react';
import { Divider, Icon, useDisclosure, Tooltip, IconButton, Flex } from '@chakra-ui/react'
import { ButtonGroup, VStack, Heading, Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { AddIcon, ViewIcon, EditIcon } from '@chakra-ui/icons';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import AdBoardList from '../adBoardList';
import adBoardApi from '../../apis/adBoardApi';
import AdBoardForm from '../AdBoardForm';
import { Carousel } from 'react-responsive-carousel';
import { Image as CloudinaryImage, CloudinaryContext } from 'cloudinary-react';
import { useSelector } from 'react-redux';

function PlannedLocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAddAdBoardOpen, onOpen: onAddAdBoardOpen, onClose: onAddAdBoardClose } = useDisclosure();
    const [adBoards, setAdBoards] = useState([]);
    const user = useSelector(state => state.auth.userData);
    const displayAddress = `${info.address}`;

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
    const handleSubmitForm = async (values, actions) => {
        try {

            const result = await adBoardApi.getAdBoardByLocationID(info._id);

            console.log("adBoards length:" + result.data.length);
            setAdBoards(result.data);


        } catch (error) {
            console.error('Error fetching data:', error);

        }
    }
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

                <Drawer placement={'right'} onClose={onClose} isOpen={isOpen} size='md'>
                    <DrawerOverlay />
                    <DrawerContent>
                        <DrawerHeader borderBottomWidth='1px'>
                            <Flex justifyContent='space-between' alignItems='center'>
                                <Heading size={"md"}>Thông tin địa điểm quảng cáo </Heading>

                                {info.planned && adBoards.length < info.numberAdBoard && user.role === "CB-So" &&
                                    <Tooltip label='Thêm bảng quảng cáo' placement='bottom'>
                                        <IconButton
                                            icon={<AddIcon />}
                                            fontSize='20px'
                                            variant='outline'
                                            colorScheme='teal'
                                            mr={2}
                                            onClick={onAddAdBoardOpen}
                                        >
                                        </IconButton>
                                    </Tooltip>}
                            </Flex>


                        </DrawerHeader>
                        <DrawerBody>
                            <Box>
                                <CloudinaryContext cloudName={process.env.REACT_APP_CLOUDINARY_CLOUD_NAME} secure="true" upload_preset="my_unsigned_preset">
                                    <Carousel>
                                        <CloudinaryImage publicId={info.image} width="150" height="50" />
                                    </Carousel>
                                </CloudinaryContext>
                                <Text><strong>Loại quảng cáo:</strong> {info.advertisingType}</Text>
                                <Text><strong>Loại địa điểm:</strong> {info.locationType}</Text>
                                <Text><strong>Địa chỉ :</strong> {displayAddress}</Text>
                                <Text><strong>Tình trạng:</strong> {info.planned ? "Đã Quy Hoạch" : "Chưa Quy Hoạch"}</Text>
                            </Box>
                            <Divider></Divider>
                            <Box>
                                <Heading size={"md"}>Có  {adBoards.length} biển quảng cáo</Heading>

                                {adBoards.length > 0 ? (
                                    adBoards.map((adBoard) => (
                                        <AdBoardList key={adBoard._id} info={{ ...adBoard, amount: adBoards.length, displayAddress, locationType: info.locationType, advertisingType: info.advertisingType }}></AdBoardList>
                                    ))
                                ) : (<>Chưa có biển quảng cáo nào được thêm</>)}
                            </Box>
                            <Modal isOpen={isAddAdBoardOpen} onClose={onAddAdBoardClose} size='4xl'>
                                <ModalOverlay />
                                <ModalContent >
                                    <ModalHeader>Thêm bảng quảng cáo</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody>
                                        <AdBoardForm info={info} onClose={onAddAdBoardClose} onSubmitForm={handleSubmitForm}></AdBoardForm>
                                    </ModalBody>
                                </ModalContent>
                            </Modal>
                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>

        </div>
    );
}

export default React.memo(PlannedLocationInfo);