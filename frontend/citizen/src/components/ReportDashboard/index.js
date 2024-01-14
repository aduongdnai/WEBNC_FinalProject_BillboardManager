import { useState, useEffect } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure } from "@chakra-ui/react";
import { InfoOutlineIcon, SearchIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import ReportInfo from "../ReportInfo";
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDispatch, useSelector } from 'react-redux'
import { setViewport, } from '../actions/viewportAction'
import { useNavigate } from 'react-router-dom';
const ReportDashboard = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedAdboard, setSelectedAdboard] = useState(null);
    const [selectedAdboardLocation, setSelectedAdboardLocation] = useState(null);
    const report = useSelector((state) => state.report.reports);
    const reportLocations = useSelector((state) => state.report.reportLocations);
    const [totalReport, setTotalReport] = useState([]);
    //console.log(report);
    const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure();
    useEffect(() => {
        setTotalReport([...report, ...reportLocations])
    }, [report, reportLocations]);


    const handleViewDetails = async (report) => {
        setSelectedReport(report); // Set the selected report when "View Details" icon is clicked
        console.log(report);
        try {
            const response = await fetch(`http://127.0.0.1:5000/api/v1/adboards/find/${report.reference_id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch ad board details');
            }

            const adboardDetails = await response.json();
            setSelectedAdboard(adboardDetails.data[0]);



            const response2 = await fetch(`http://127.0.0.1:5000/api/v1/adlocations/${adboardDetails.data[0].location_id}`);
            if (!response2.ok) {
                throw new Error('Failed to fetch ad board details');
            }
            const locationDetails = await response2.json();
            setSelectedAdboardLocation(locationDetails.data[0]);


        } catch (error) {
            console.error('Error fetching ad board details:', error.message);
        }
        onInfoModalOpen();
    };


    const dispatch = useDispatch()
    const navigate = useNavigate();
    const changeViewport = async (report) => {
        if (report.type === 'adboard') {
            try {
                const response = await fetch(`http://127.0.0.1:5000/api/v1/adboards/find/${report.reference_id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch ad board details');
                }

                const adboardDetails = await response.json();
                const response2 = await fetch(`http://127.0.0.1:5000/api/v1/adlocations/${adboardDetails.data[0].location_id}`);
                console.log(response2);
                if (!response2.ok) {
                    throw new Error('Failed to fetch ad board details');
                }
                const locationDetails = await response2.json();
                console.log(locationDetails.data[0].coordinates);
                navigate("/");
                const newViewport = {
                    latitude: locationDetails.data[0].coordinates.coordinates[1],
                    longitude: locationDetails.data[0].coordinates.coordinates[0],
                    zoom: 20,
                    transitionDuration: 5000, // Adjust the zoom level as needed

                };

                dispatch(setViewport(newViewport));

            } catch (error) {
                console.error('Error fetching ad board details:', error.message);
            }
        } else {
            try {
                const response2 = await fetch(`http://127.0.0.1:5000/api/v1/report/${report._id}`);
                if (!response2.ok) {
                    throw new Error('Failed to fetch ad board details');
                }
                const locationDetails = await response2.json();
                console.log(locationDetails);
                navigate("/");
                const newViewport = {
                    latitude: locationDetails.data[0].latitude,
                    longitude: locationDetails.data[0].longitude,
                    zoom: 20,
                    transitionDuration: 5000, // Adjust the zoom level as needed

                };

                dispatch(setViewport(newViewport));
            } catch (error) {
                console.error('Error fetching location details:', error.message);
            }
        }


    }
    return (
        <Box>
            <Table variant="simple">
                <Thead>
                    <Tr>
                        <Th>Type</Th>
                        <Th>Report Type</Th>
                        <Th>Sender Name</Th>
                        <Th>Status</Th>
                        <Th></Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {report.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.type}</Td>
                            <Td>{item.reportType}</Td>
                            <Td>{item.senderName}</Td>
                            <Td>{item.status}</Td>
                            <Td>
                                <Tooltip label="View Details" placement="top">
                                    <IconButton
                                        mr={2}
                                        aria-label="View Details"
                                        icon={<InfoOutlineIcon />}
                                        onClick={() => handleViewDetails(item)} // Call handleViewDetails with the selected report
                                    />
                                </Tooltip>
                                <Tooltip label="Show Map" placement="top">
                                    <IconButton
                                        ml={2}
                                        aria-label="Show Map"
                                        icon={<SearchIcon />}
                                        onClick={() => changeViewport(item)}
                                    />
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            {selectedReport && (
                // Pass the selected report as the "info" prop and onClose event

                <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose} size='4xl'>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>DETAIL</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <ReportInfo info={selectedReport} adboard={selectedAdboard} location={selectedAdboardLocation} />
                        </ModalBody>


                    </ModalContent>
                </Modal>
            )}
        </Box>
    );
};

export default ReportDashboard;
