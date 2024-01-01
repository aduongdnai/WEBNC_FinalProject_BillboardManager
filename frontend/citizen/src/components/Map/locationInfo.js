import * as React from 'react';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
function LocationInfo(props) {
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


            </Box>

        </div>
    );
}

export default React.memo(LocationInfo);