import * as React from 'react';
import { useState } from 'react';
import { Icon, useDisclosure } from '@chakra-ui/react'
import { ButtonGroup, VStack, Heading, Box, Text, Button, Drawer, DrawerOverlay, DrawerBody, DrawerHeader, DrawerContent } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Formik, Form } from 'formik'
import CustomInput from '../CustomInput'
import * as Yup from 'yup'
import CustomSelect from '../CustomSelect';
import adLocationAPI from '../../apis/adLocationApi';
import ImageUploaderWithWidget from '../ImageUploaderWithWidget';
function LocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [error, setError] = useState(null);
    const [publicId, setPublicId] = useState('');
    const displayAddress = `${info.address}`;



    return (
        <div>
            <Box width={350} >

                <Text fontWeight={'bold'}>{info.advertisingType}</Text>
                <Text fontWeight={'bold'}>{info.locationType}</Text>
                {displayAddress}

                <Text fontWeight={'bold'}>{info.planned ? "Đã Quy Hoạch" : "Chưa Quy Hoạch"}</Text>
                <Button colorScheme='blue' onClick={onOpen}>
                    <AddIcon boxSize={5} pr={2} >
                    </AddIcon>
                    Xem Chi tiết
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

export default React.memo(LocationInfo);