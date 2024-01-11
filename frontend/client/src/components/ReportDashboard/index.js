import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure } from "@chakra-ui/react";
import { InfoOutlineIcon, SearchIcon } from "@chakra-ui/icons";
import { IoIosInformationCircle } from "react-icons/io";
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
    Icon,
} from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
import { setViewport, } from '../actions/viewportAction'
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";
import axios from "axios";
import { IoSearchOutline } from "react-icons/io5";
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import {  useUser } from "../LoginSignup/userContext";
import Pagination from "./Pagination"
import ReportProcessForm from "../ReportProcessForm";
import {useSelector} from "react-redux"
import { BsMap, BsArrowRightCircle  } from "react-icons/bs";
import { FaMap, FaArrowCircleRight } from "react-icons/fa";

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

    const columns = [
        {
            dataField: 'time',
            text: 'Send Time'
        }, 
        {
            dataField: 'senderName',
            text: 'Sender'
        }, 
        {
            dataField: 'phone',
            text: 'Phone Number'
        }, 
        {
            dataField: 'reportType',
            text: 'Report Type'
        }, 
        {
            dataField: 'area',
            text: 'Address'
        }, 
        {
            dataField: 'status',
            text: 'Status'
        }, 
        {
          dataField: 'action',
          isDummyField: true,
          text: 'Action',
          formatter: (cellContent, row) => {
            return(
              <div style={{display:"flex", alignItems:"center"}}>
              {/* <Icon 
                variant="unstyled" 
                as={FaEye} 
                w={5} 
                h={5} 
                marginRight={5} 
                // marginLeft={2} 
                onClick={
                  () => navigate('/manage-ward',{state: { district: row?.name }})
                }
                _hover={{color:'blue'}}
              /> */}
              {/* <Icon 
                as={TbReportSearch} 
                w={5}
                h={5}
                marginRight={5}
                onClick={
                  () => navigate('/table-advertising-type',{state: { adType: row?.name }})
                }
                _hover={{color:'blue'}}
              /> */}
                <Tooltip label="Xem tóm tắt" placement="top">
                    <span>
                        <Icon 
                            as={IoIosInformationCircle} 
                            w={5} 
                            h={5}
                            marginRight={5}
                            onClick={() => handleViewDetails(row)} // Call handleViewDetails with the selected report
                            _hover={{color:'blue'}}
                        />
                    </span>
                </Tooltip>
                <Tooltip label="Xem bản đồ" placement="top">
                    <span>
                        <Icon 
                            as={FaMap} 
                            w={5} 
                            h={5}
                            marginRight={5}
                            onClick={() => changeViewport(row)}
                            _hover={{color:'blue'}}
                        />
                    </span>
                </Tooltip>
                <Tooltip label="Xem chi tiết" placement="top">
                    <span>
                        <Icon 
                            as={FaArrowCircleRight} 
                            w={5} 
                            h={5}
                            marginRight={5}
                            onClick={() => changViewDetail(row)}
                            _hover={{color:'blue'}}
                        />
                    </span>
                </Tooltip>
              </div>
            )
          }
        }
    ];

    const sizePerPageOptionRenderer = ({
        text,
        page,
        onSizePerPageChange
    }) => (
        <li
          key={ text }
          role="presentation"
          className="dropdown-item"
        >
          <a
            href="#"
            tabIndex="-1"
            role="menuitem"
            data-page={ page }
            onMouseDown={ (e) => {
              e.preventDefault();
              onSizePerPageChange(page);
            } }
            style={ { display:"block",color: 'red', width:"100%" } }
          >
            { text }
          </a>
        </li>
    );

    const options = {
        sizePerPageOptionRenderer,
        alwaysShowAllBtns: true,
        hidePageListOnlyOnePage: true,
        sizePerPageList: [{
          text: '10', value: 10
        }, {
          text: '15', value: 15
        }, {
          text: '20', value: 20
        }],
    }

    const MySearch = (props) => {
        return (
            <div className="form-group has-search">
              <span className="form-control-feedback">
                <Icon as={IoSearchOutline}></Icon>
              </span>
              <input
              className="form-control"
              style={{marginTop:"20px", marginBottom:"15px"}}
              type="text"
              onChange={(event) => {
                props.onSearch(event.target.value)
              }}
              placeholder='Search'
              />
              {/* <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
              <Button leftIcon={<CiCirclePlus size="20" />} justifyContent="flex-start" width="200px" colorScheme='teal' variant='solid' 
                onClick={() =>{
                    onAddModalOpen()
                  }
                }>
                Add
              </Button>
              </div> */}
            </div>
        );
    };

    const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>Report Dashboard</h3>;

    return (
        <div style={{ width: "95%"}}>
            {/* <Table colorScheme='green'>
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
            /> */}
            {report 
                ? 
                (
                    <ToolkitProvider
                        keyField="id"
                        data={ report }
                        columns={ columns }
                        search
                    >
                        {
                        props => (
                            <div>
                            <CaptionElement/>
                            <MySearch 
                                { ...props.searchProps } 
                            />
                            <BootstrapTable
                                { ...props.baseProps }
                                pagination={paginationFactory(options)} 
                                striped
                                rowStyle={{verticalAlign:"middle"}}
                                bordered= {false}
                            />
                            </div>
                        )
                        }
                    </ToolkitProvider>
                )
                : 
                (null)
            }
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
        </div>
    );
};

export default ReportDashboard;
