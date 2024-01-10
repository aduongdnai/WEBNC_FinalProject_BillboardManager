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
    Heading
} from '@chakra-ui/react'

import { useEffect } from "react";
import axios from "axios";
import Pagination from "../ReportDashboard/Pagination"
import ReportProcessForm from "../ReportProcessForm";

import { BsFillTrashFill, BsFillPencilFill } from "react-icons/bs";
const ITEMS_PER_PAGE = 10;
const ReportTypesManagement = () => {
    //console.log(userData);
    //const { userData } = useUser();
    const [reportTypes, setReportTypes] = useState([]);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/api/v1/reportTypes');
                setReportTypes(response.data.data);
            } catch (error) {
                console.error('Error fetching report:', error.message);
            }
        };

        fetchReport();
    }, []);



    //console.log(report);
    const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
    const { isOpen: isDelModalOpen, onOpen: onDelModalOpen, onClose: onDelModalClose } = useDisclosure();
    const { isOpen: isAddModalOpen, onOpen: onAddModalOpen, onClose: onAddModalClose } = useDisclosure();

    const [selectedReportType, setSelectedReportType] = useState(null);
    const [name, setName] = useState('')
    const toast = useToast();
    const handleEdit = async (reportType) => {
        try {
            const response = await axios.put(`http://127.0.0.1:5000/api/v1/reportTypes/${reportType._id}`, { name: name });

            toast({
                title: "Update successful.",
                description: "You've successfully updated.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            onEditModalClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }

    };

    const handleDelete = async (reportType) => {
        try {
            const response = await axios.delete(`http://127.0.0.1:5000/api/v1/reportTypes/${reportType._id}`);

            toast({
                title: "Delete successful.",
                description: "You've successfully deleted.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            onDelModalClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const handleAddNew = async () => {
        try {
            const response = await axios.post(`http://127.0.0.1:5000/api/v1/reportTypes/`, { name: name });

            toast({
                title: "Add successful.",
                description: "You've successfully added.",
                status: "success",
                duration: 2000,
                isClosable: true,
            });
            onAddModalClose();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }


    const [currentPage, setCurrentPage] = useState(1);
    const indexOfLastItem = currentPage * ITEMS_PER_PAGE;
    const indexOfFirstItem = indexOfLastItem - ITEMS_PER_PAGE;
    const currentItems = reportTypes.slice(indexOfFirstItem, indexOfLastItem);
    return (
        <Box style={{ width: "100%", height: "100vh" }}>
            <Heading mx={5}>
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
            </Heading>
            <Table colorScheme='green'>
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
            />
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
                                <Button

                                    variant='outline'
                                    colorScheme='red'
                                    onClick={() => {
                                        handleDelete(selectedReportType)
                                    }}
                                >

                                    Lưu
                                </Button>


                            </ModalBody>
                            <ModalFooter>
                                
                            </ModalFooter>

                        </ModalContent>
                    </Modal>
                </Box>

            )}
        </Box>
    );
};

export default ReportTypesManagement;
