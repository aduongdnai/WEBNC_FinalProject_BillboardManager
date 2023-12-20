import * as React from 'react';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { ViewIcon } from '@chakra-ui/icons';

function PlannedLocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();

    const displayAddress = `${info.address}`;


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
                        <DrawerHeader borderBottomWidth='1px'>Thêm điểm quảng cáo</DrawerHeader>
                        <DrawerBody>

                        </DrawerBody>
                    </DrawerContent>
                </Drawer>
            </Box>

        </div>
    );
}

export default React.memo(PlannedLocationInfo);