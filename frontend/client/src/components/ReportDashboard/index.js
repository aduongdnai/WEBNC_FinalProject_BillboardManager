import { serverClient } from '../../apis/serverAxiosClient';
import { useRef, useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure, Tag, Select } from "@chakra-ui/react";
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
import filterFactory, { Comparator, selectFilter } from 'react-bootstrap-table2-filter';


import {  useUser } from "../LoginSignup/userContext";
import Pagination from "./Pagination"
import ReportProcessForm from "../ReportProcessForm";
import {useSelector} from "react-redux"
import { BsMap, BsArrowRightCircle  } from "react-icons/bs";
import { FaMap, FaArrowCircleRight } from "react-icons/fa";
import "./style.css";


function methodFormatter(cell, row) {
    return (
    <span>
        <div className="custom-css" dangerouslySetInnerHTML={{ __html: cell }} />
    </span>
    );
}

const ITEMS_PER_PAGE = 10;
const ReportDashboard = () => {
    const [selectedReport, setSelectedReport] = useState(null);
    const [selectedAdboard, setSelectedAdboard] = useState(null);
    const [selectedAdboardLocation, setSelectedAdboardLocation] = useState(null);
    const [finish, setFinish] = useState(0);
    const [working, setWorking] = useState(0);
    const currentData = useRef();
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [selectDistrict, setSelectDistrict] = useState("");



    const userData = useSelector((state)=>state.auth.userData)
    //console.log(userData);
    //const { userData } = useUser();
    const [report, setReport] = useState([]);
    const [startData, setStartData] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                
                if (userData && userData.area) {
                    const response = await serverClient.get(`/report/area/${userData.area}`);
                    var districtTemp = []
                    const reportData = response.data.map((element) => {
                        const splitData = element.area.split(", ")
                        const isContain = districtTemp.find((name) => name === `${splitData[splitData.length - 2]}`)
                        if(isContain === undefined) districtTemp.push(`${splitData[splitData.length - 2]}`)
                        return{
                            ...element,
                            processMethod: element.processMethod ? `${element.processMethod}` : "<p>Chưa xử lý</p>",
                            time: new Date(element.time).toLocaleString(),
                        }
                    })
                    setDistrict(districtTemp);
                    setWorking(reportData.filter(x => x.processMethod === "<p>Chưa xử lý</p>").length)
                    setFinish(reportData.length - reportData.filter(x => x.processMethod === "<p>Chưa xử lý</p>").length)
                    console.log(reportData);
                    setStartData(reportData);
                    setReport(reportData);
                }
                
            } catch (error) {
                console.error('Error fetching report:', error.message);
            }
        };

        fetchReport();
    }, [userData]);

    useEffect(() => {
        console.log(district);
    },[district])

    //console.log(report);
    const { isOpen: isInfoModalOpen, onOpen: onInfoModalOpen, onClose: onInfoModalClose } = useDisclosure();
    const { isOpen: isProcessModalOpen, onOpen: onProcessModalOpen, onClose: onProcessModalClose } = useDisclosure();


    const handleViewDetails = async (report) => {
        setSelectedReport(report); // Set the selected report when "View Details" icon is clicked
        console.log(report);
        try {
            const response = await serverClient.get(`/adboards/find/${report.reference_id}`); 
            const adboardDetails = response.data;
            setSelectedAdboard(adboardDetails[0]);
            const response2 = await serverClient.get(`/adlocations/${adboardDetails[0].location_id}`);
            const locationDetails = response2.data;
            setSelectedAdboardLocation(locationDetails[0]);
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
                const response = await serverClient.get(`/adboards/find/${report.reference_id}`);
                const adboardDetails = response.data;
                const response2 = await serverClient.get(`/adlocations/${adboardDetails[0].location_id}`);
                const locationDetails = response2.data;
                console.log(locationDetails[0].coordinates);
                navigate("/");
                const newViewport = {
                    latitude: locationDetails[0].coordinates.coordinates[1],
                    longitude: locationDetails[0].coordinates.coordinates[0],
                    zoom: 20,
                    transitionDuration: 5000, // Adjust the zoom level as needed

                };

                dispatch(setViewport(newViewport));

            } catch (error) {
                console.error('Error fetching ad board details:', error.message);
            }
        } else {
            try {
                const response2 = await serverClient.get(`/adlocations/${report.reference_id}`);
                const locationDetails = response2.data;
                console.log(locationDetails[0].coordinates);
                navigate("/");
                const newViewport = {
                    latitude: locationDetails[0].coordinates.coordinates[1],
                    longitude: locationDetails[0].coordinates.coordinates[0],
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
            dataField: 'processMethod',
            text: 'Process Method',
            formatter: methodFormatter
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
        const [query, setQuery] = useState("");
        useEffect(() => {
            const timeOutId = setTimeout(() => {
                props.onSearch(query)
                //sh(currentData.current.table.props.data.length - currentData.current.table.props.data.filter(x => x.processMethod === "<p>Chưa xử lý</p>").length)
            },500);
            return () => clearTimeout(timeOutId);
        }, [query]);
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
                setQuery(event.target.value)
                // console.log(currentData.current.table.props.data);
              }}
              placeholder='Search'
              />
              <div style={{width:"100%",display:"flex", justifyContent:"space-between"}}>
              
                <div>
                    <Tag colorScheme="teal">{finish} Report finished</Tag>
                    <Tag colorScheme="red" style={{marginLeft:"10px"}}>{working} Report is working on</Tag>
                </div>
                <div style={{display:"flex"}}>
                    {district.length !== 0 ? (
                    <Select value={selectDistrict} marginRight="20px" width="200px" colorScheme='teal' placeholder="Select District" onChange={(e) => {
                        const filter = e.target.value;
                        setSelectDistrict(filter);
                        // if(filter === "All") {
                        //     setReport(startData)
                        // }
                        // else{
                            var newReport = []
                            startData.forEach((element) => {
                                if(element.area.includes(filter)){
                                    newReport.push(element)
                                }
                            })
                            console.log(newReport);
                            setReport(newReport);
                        // }

                    }} >
                        {district !== 0 && district.map((e) => (
                            <option value={e}>{e}</option>
                        ))}
                        {/* <option value="All">All</option> */}
                    </Select>
                    ) : <></>
                    }
                    <Button leftIcon={<IoSearchOutline size="20" />} justifyContent="flex-start" width="200px" colorScheme='teal' variant='solid'>
                    Add
                    </Button>
                </div>
              </div>
            </div>
        );
    };

    const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>Report Dashboard</h3>;

    return (
        <div style={{ width: "95%"}}>
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
                                ref={currentData}
                                { ...props.baseProps }
                                pagination={paginationFactory(options)} 
                                striped
                                rowStyle={{verticalAlign:"middle"}}
                                bordered= {false}
                                filter={filterFactory()}
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
