import { useState } from "react";
import { Box, Table, Thead, Tbody, Tr, Th, Td, IconButton, useDisclosure } from "@chakra-ui/react";
import { InfoOutlineIcon, } from "@chakra-ui/icons";
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
    Flex,
    Input,
    FormLabel,
    useToast,
    Heading,
    Icon
} from '@chakra-ui/react'
import { FaTrashAlt } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import { CiCirclePlus } from "react-icons/ci";

import { useEffect } from "react";
import axios from "axios";
import Pagination from "../ReportDashboard/Pagination"
import ReportProcessForm from "../ReportProcessForm";
import { FaEye,FaPen } from "react-icons/fa";
import { TbReportSearch } from "react-icons/tb";
import { useNavigate, useLocation } from 'react-router-dom';

import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
const ITEMS_PER_PAGE = 10;
const ReportTypesManagement = () => {
    //console.log(userData);
    //const { userData } = useUser();
    const navigate = useNavigate();
    const [reportTypes, setReportTypes] = useState([]);
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { isOpen: isDelModalOpen, onOpen: onDelModalOpen, onClose: onDelModalClose } = useDisclosure();
    const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();

    const [selectedReportType, setSelectedReportType] = useState(null);
    const [name, setName] = useState('')
    const [update, setUpdate] = useState(true);
    const toast = useToast();
    const handleEdit = async (reportType) => {
        try {
            var isExist = null;
            console.log(reportType);
            const apiCheck = await axios.post(`http://127.0.0.1:5000/api/v1/reportTypes/findRpType`, { area: name });
            if(apiCheck.data.data.length === 0){
                const response = await axios.put(`http://127.0.0.1:5000/api/v1/reportTypes/${reportType._id}`, { name: name });
                const apiUpdate = await axios.post(`http://127.0.0.1:5000/api/v1/report/updateRpType`,{oldRpType: reportType.name, newRpType: name})
                setUpdate(true);
                isExist = false
            }
            else isExist = true;

            if(isExist === false) {
                setName('')
                setTimeout(() => {
                    onEditModalClose();
                }, 1000);
            }        
            toast({
                title:(isExist ? ('Error') : ('Successful.')),
                description:(isExist? ("Loại báo cáo đã tồn tại") : ("Loại báo cáo đã được cập nhật.")),
                status:(isExist ? ('error') : ('success')),
                duration: 2000,
                isClosable: true,
            });
            
        } catch (error) {
            console.log(error);
        }

    };

    const handleDelete = async (reportType) => {
        try {
            var isContain = null;
            const apiContain = await axios.post(`http://127.0.0.1:5000/api/v1/report/findByRpType`, {area: `${reportType.name}`});

            if(apiContain.data.data.length === 0){
                const response = await axios.delete(`http://127.0.0.1:5000/api/v1/reportTypes/${reportType._id}`);
                setUpdate(true);
                isContain = false;
            }
            else isContain = true;

            if(isContain === false) {
                setTimeout(() => {
                    onDelModalClose();
                }, 1000);
            }

            toast({
                title: isContain? ('Error') : ('Successful.'),
                description:isContain ? ("Loại báo cáo đã tồn tại báo cáo") : ("Loại báo cáo đã được xóa."),
                status:isContain ? ('error') : ('success'),
                duration: 2000,
                isClosable: true,
            }); 
            
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddNew = async () => {
        try {
            var isExist = null;
            const apiCheck = await axios.post(`http://127.0.0.1:5000/api/v1/reportTypes/findRpType`, { area: name });
            if(apiCheck.data.data.length === 0){
                const response = await axios.post(`http://127.0.0.1:5000/api/v1/reportTypes/`, { name: name });
                setUpdate(true);
                isExist = false
            }
            else isExist = true
            if(isExist === false) {
                setName('')
                setTimeout(() => {
                    onAddModalClose();
                }, 1000);
            }        
            toast({
                title:(isExist ? ('Error') : ('Successful.')),
                description:(isExist? ("Loại báo cáo đã tồn tại") : ("Loại báo cáo đã được thêm mới.")),
                status:(isExist ? ('error') : ('success')),
                duration: 2000,
                isClosable: true,
            });

        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/v1/reportTypes');
                setReportTypes(response.data.data);
                setUpdate(false);
            } catch (error) {
                console.error('Error fetching report:', error.message);
            }
        };

        fetchReport();
    }, [update]);

    const columns = [
        {
          dataField: 'name',
          text: 'Report Type'
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
              <Icon 
                as={FaPen} 
                w={4} 
                h={4}
                marginRight={5}
                onClick={
                  () => {
                    setSelectedReportType(row)
                    onEditModalOpen()
                  }
                }
                _hover={{color:'blue'}}
              />
              <Icon 
                as={FaTrashAlt} 
                w={4} 
                h={4}
                marginRight={5}
                onClick={
                  () => {
                    setSelectedReportType(row)
                    onDelModalOpen() 
                  }
                }
                _hover={{color:'red'}}
              />
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
              <div style={{width:"100%",display:"flex",justifyContent:"flex-end"}}>
              <Button leftIcon={<CiCirclePlus size="20" />} justifyContent="flex-start" width="200px" colorScheme='teal' variant='solid' 
                onClick={() =>{
                    onAddModalOpen()
                  }
                }>
                Add
              </Button>
              </div>
            </div>
        );
    };

    const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>Report Type Management</h3>;

    
    

    //console.log(report);
    

    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = reportTypes.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <div style={{width:"95%"}}>
            {/* <Heading mx={5}>
                Quản lý loại hình báo cáo
                <Button ml={5}

                                variant='outline'
                                colorScheme='teal'
                                onClick={() => {
                                    onAddModalOpen()
                                }}
                            >

                                Thêm mới
                            </Button>
            </Heading> */}
            {/* <Table colorScheme='green'>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Tên loại hình</Th>
                        <Th>Hành động </Th>
                        <Th>
                            
                        </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {currentItems.map((item, index) => (
                        <Tr key={index}>
                            <Td>{item._id}</Td>
                            <Td>{item.name}</Td>
                            <Td>
                                <Tooltip label="Chỉnh sửa" placement="top">
                                    <IconButton
                                        isRound={true}
                                        variant='outline'
                                        colorScheme='teal'
                                        ml={2}
                                        aria-label="Show Map"
                                        icon={<BsFillPencilFill />}
                                        onClick={() => { setSelectedReportType(item); onEditModalOpen() }}
                                    />
                                </Tooltip>
                                <Tooltip label="Xóa" placement="top">
                                    <IconButton
                                        isRound={true}
                                        variant='outline'
                                        colorScheme='teal'
                                        ml={2}
                                        aria-label="Show Map"
                                        icon={< BsFillTrashFill />}
                                        onClick={() => { setSelectedReportType(item); onDelModalOpen() }}
                                    />
                                </Tooltip>
                            </Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(reportTypes.length / ITEMS_PER_PAGE)}
                onPageChange={setCurrentPage}
            /> */}
            <div style={{width:"100%"}}>
                {reportTypes ? (
                    <ToolkitProvider
                        keyField="id"
                        data={ reportTypes }
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
                    ) : (null)
                }
            </div>
            <Modal isOpen={isAddModalOpen} onClose={onAddModalClose} size='4xl'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Thêm mới kiểu loại báo cáo</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>

                                <FormLabel>Tên</FormLabel>
                                <Flex flexDirection="column">
                                    <Input
                                        type="name"
                                        variant="filled"
                                        placeholder="Tên"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        mb={3}
                                    />

                                </Flex>


                            </ModalBody>
                            <ModalFooter>
                                <Button

                                    variant='outline'
                                    colorScheme='teal'
                                    onClick={() => {
                                        handleAddNew()
                                    }}
                                >

                                    Lưu
                                </Button>
                            </ModalFooter>

                        </ModalContent>
                    </Modal>
            {selectedReportType && (
                // Pass the selected report as the "info" prop and onClose event
                <Box>
                    <Modal isOpen={isEditModalOpen} onClose={onEditModalClose} size='4xl'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Chỉnh sửa kiểu loại báo cáo</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>

                                <FormLabel>Tên mới</FormLabel>
                                <Flex flexDirection="column">
                                    <Input
                                        type="name"
                                        variant="filled"
                                        placeholder="Tên mới"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        mb={3}
                                    />

                                </Flex>


                            </ModalBody>
                            <ModalFooter>
                                <Button

                                    variant='outline'
                                    colorScheme='teal'
                                    onClick={() => {
                                        handleEdit(selectedReportType)
                                    }}
                                >

                                    Lưu
                                </Button>
                            </ModalFooter>

                        </ModalContent>
                    </Modal>
                    <Modal isOpen={isDelModalOpen} onClose={onDelModalClose} size='4xl'>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Xóa kiểu loại báo cáo</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody>

                                <FormLabel>Bạn chắc chắn muốn xóa?</FormLabel>
                                

                            </ModalBody>
                            <ModalFooter>
                            <Button

                            variant='outline'
                            colorScheme='red'
                            onClick={() => {
                                handleDelete(selectedReportType)
                            }}
                            >

                            Yes
                            </Button>

                            </ModalFooter>

                        </ModalContent>
                    </Modal>
                </Box>

            )}
        </div>
    );
};

export default ReportTypesManagement;
