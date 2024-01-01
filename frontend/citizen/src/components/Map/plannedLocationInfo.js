import * as React from 'react';
import { useState, useEffect } from 'react';
import { Icon, useDisclosure } from '@chakra-ui/react'
import { Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { Card, CardHeader, CardBody, CardFooter, Flex, Heading, Avatar } from '@chakra-ui/react';
import { ViewIcon, InfoOutlineIcon, CheckIcon } from '@chakra-ui/icons';
import adBoardApi from '../../apis/adBoardApi';
import { outline } from '@cloudinary/url-gen/actions/effect';
import AdBoardList from '../adBoardList';

function PlannedLocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
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
                        <DrawerHeader borderBottomWidth='1px'>Thông tin địa điểm quảng cáo</DrawerHeader>
                        <DrawerBody>
                            <Box>
                                <Heading size={"md"}>Có  {adBoards.length} biển quảng cáo</Heading>
                                {adBoards.length > 0 ? (
                                    adBoards.map((adBoard) => (
                                        // <Card
                                        //     bg="green.100"    // Background color for success
                                        //     variant={outline}     // Text color
                                        //     // Padding
                                        //     borderRadius="md"  // Border radius
                                        //     boxShadow="md"     // Box shadow
                                        // >
                                        //     <CardHeader>
                                        //         <Flex >
                                        //             <InfoOutlineIcon mr={4} boxSize={6} color='green.700'
                                        //             />
                                        //             <Flex flex='1' gap='4' alignItems='center' flexWrap='wrap'>
                                        //                 <Box>
                                        //                     <Heading size='sm'>Thông tin địa điểm</Heading>
                                        //                     <Text color="gray.500">{displayAddress}</Text>
                                        //                     <Text>Hình thức: <b>{info.advertisingType}</b></Text>
                                        //                     <Text fontWeight={'bold'}></Text>
                                        //                     <Text >Loại địa điểm: <b>{info.locationType}</b></Text>

                                        //                 </Box>
                                        //             </Flex>

                                        //         </Flex>
                                        //     </CardHeader>

                                        // </Card>


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