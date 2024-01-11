import * as React from 'react';
import { useState } from 'react';
import { useDisclosure } from '@chakra-ui/react'
import { Box, Text, Button, Modal, ModalBody, ModalContent, ModalOverlay, ModalCloseButton, ModalHeader } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { WarningTwoIcon } from '@chakra-ui/icons';
import ReportForm from '../ReportForm';
function LocationInfo(props) {
    const { info } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { isOpen: isReportModalOpen, onOpen: onReportModalOpen, onClose: onReportModalClose } = useDisclosure();
    const displayAddress = `${info.address}`;


    return (
        <div>
            <Box width={350} >

                <Text fontWeight={'bold'}>{info.advertisingType}</Text>
                <Text fontWeight={'bold'}>{info.locationType}</Text>
                {displayAddress}

                <Text fontWeight={'bold'}>{info.planned ? "Đã Quy Hoạch" : "Chưa Quy Hoạch"}</Text>
                <Button
                    colorScheme={"red"}
                    leftIcon={<WarningTwoIcon />}
                    onClick={onReportModalOpen}
                    variant={"outline"}  // Add the report icon to the left of the button text
                    mt={2}
                    size='sm'
                >
                    Report
                </Button>
                <Modal isOpen={isReportModalOpen} onClose={onReportModalClose} size='4xl'>
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader>Report Location Form</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ReportForm info={{ ...info, type: 'plannedLocation', _id: info._id, area: info.area }}></ReportForm>
                        </ModalBody>


                    </ModalContent>
                </Modal>
            </Box>

        </div>
    );
}

export default React.memo(LocationInfo);