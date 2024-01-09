import * as React from 'react';
import { useState, useEffect } from 'react';
import { Icon, useDisclosure } from '@chakra-ui/react'
import { ButtonGroup, VStack, Heading, Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { AddIcon, ViewIcon } from '@chakra-ui/icons';
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

function PlannedLocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isAddAdBoardOpen, onOpen: onAddAdBoardOpen, onClose: onAddAdBoardClose } = useDisclosure();
    const [adBoards, setAdBoards] = useState([]);

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
                            <Heading size={"md"}>Thông tin địa điểm quảng cáo </Heading>

                            <Button size="sm" leftIcon={<AddIcon></AddIcon>} colorScheme='green' variant="outline" onClick={onAddAdBoardOpen} >Thêm bảng quảng cáo</Button></DrawerHeader>
                        <DrawerBody>
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