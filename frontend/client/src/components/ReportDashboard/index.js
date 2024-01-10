import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure } from "@chakra-ui/react";
import { InfoOutlineIcon, SearchIcon } from "@chakra-ui/icons";
import { Tooltip } from "@chakra-ui/react";
import ReportInfo from "../ReportInfo";
import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setViewport, } from '../actions/viewportAction'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import {  useUser } from "../LoginSignup/userContext";
import Pagination from "./Pagination"
import ReportProcessForm from "../ReportProcessForm";
import {useSelector} from "react-redux"
import { BsMap, BsArrowRightCircle  } from "react-icons/bs";
const ITEMS_PER_PAGE = 10;
const ReportDashboard = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedAdboard, setSelectedAdboard] = useState(null);
    const [selectedAdboardLocation, setSelectedAdboardLocation] = useState(null);

    const userData = useSelector((state)=>state.auth.userData)
    //console.log(userData);
    //const { userData } = useUser();
    const [report, setReport] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                
                if (userData && userData.area) {
                    const response = await axios.get(`http://127.0.0.1:5000/api/v1/report/area/${userData.area}`);
                    const reportData = response.data;
                    setReport(reportData);
                }
                
            } catch (error) {
                console.error('Error fetching report:', error.message);
            }
        };

        fetchReport();
    }, [userData]);



    //console.log(report);
    const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure();
    const { isOpen: isProcessModalOpen, onOpen: onProcessModalOpen, onClose: onProcessModalClose } = useDisclosure();


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
                const response2 = await fetch(`http://127.0.0.1:5000/api/v1/adlocations/${report.reference_id}`);
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
                console.error('Error fetching location details:', error.message);
            }
        }


    }
    const changViewDetail = async (report) => {
        navigate(`/report/${report._id}`);
    }
    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = report.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <Box style={{ width: "100%", height: "100vh" }}>
            <Table colorScheme='green'>
                <Thead>
                    <Tr>
                        <Th>Thời điểm gửi</Th>
                        <Th>Tên người gửi</Th>
                        <Th>Điện thoại</Th>
                        <Th>Loại hình báo cáo</Th>
                        <Th>Địa điểm</Th>
                        <Th>Trạng thái</Th>
                        <Th>Hành động</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentItems.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item.time}</Td>
                            <Td>{item.senderName}</Td>
                            <Td>{item.phone}</Td>
                            <Td>{item.reportType}</Td>
                            <Td style={{ width: "200px" }}>{item.area}</Td>
                            <Td>{item.status}</Td>
                            <Td>
                                <Tooltip label="Xem tóm tắt" placement="top">
                                    <IconButton
                                        isRound={true}
                                        variant='outline'
                                        colorScheme='teal'
                                        mr={2}
                                        aria-label="View Details"
                                        icon={<InfoOutlineIcon />}
                                        onClick={() => handleViewDetails(item)} // Call handleViewDetails with the selected report
                                    />
                                </Tooltip>
                                <Tooltip label="Xem bản đồ" placement="top">
                                    <IconButton
                                        isRound={true}
                                        variant='outline'
                                        colorScheme='teal'
                                        ml={2}
                                        aria-label="Show Map"
                                        icon={<BsMap  />}
                                        onClick={() => changeViewport(item)}
                                    />
                                </Tooltip>
                                <Tooltip label="Xem chi tiết" placement="top">
                                    <IconButton
                                        isRound={true}
                                        variant='outline'
                                        colorScheme='teal'
                                        ml={2}
                                        aria-label="Show Map"
                                        icon={<BsArrowRightCircle  />}
                                        onClick={() => changViewDetail(item)}
                                    />
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(report.length / ITEMS_PER_PAGE)}
                onPageChange={setCurrentPage}
            />
            {selectedReport && (
                // Pass the selected report as the "info" prop and onClose event
                <Box>
                    <Modal isOpen={isInfoModalOpen} onClose={onInfoModalClose} size='4xl'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Chi tiết báo cáo</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <ReportInfo info={selectedReport} adboard={selectedAdboard} location={selectedAdboardLocation} />
                            </ModalBody>
                            <ModalFooter>
                                <Button

                                    variant='outline'
                                    colorScheme='teal'
                                    onClick={()=>{
                                        onProcessModalOpen()}}
                                >

                                    Cập nhật thông tin xử lí
                                </Button>
                            </ModalFooter>

                        </ModalContent>
                    </Modal>
                    <Modal isOpen={isProcessModalOpen} onClose={onProcessModalClose} size='3xl'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Xử lí báo cáo</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>
                                <ReportProcessForm info={selectedReport} />
                            </ModalBody>
                            

                        </ModalContent>
                    </Modal></Box>

            )}
        </Box>
    );
};

export default ReportDashboard;
