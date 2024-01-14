import { serverClient } from '../../apis/serverAxiosClient';
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Icon,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useToast
} from "@chakra-ui/react";
import { FaPen } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";

import { IoSearchOutline } from "react-icons/io5";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useSelector } from "react-redux";
import EditAdBoardCBSo from "./EditAdBoardCBSo";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import AddAdBoardCBSo from "./AddAdBoardCBSo";
import DelAdBoardCBSo from "./DelAdBoardCBSo";



const AdBoardsDisplay = () => {
  const userData = useSelector(state => state.auth.userData);
  const navigate = useNavigate();
  const [adBoards, setAdBoards] = useState([]);
  const [location, setLocation] = useState(null);
  const toast = useToast();
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [update, setUpdate] = useState(true);
  const { isOpen: isCBSoOpen, onOpen: onCBSoOpen, onClose: onCBSoClose } = useDisclosure();
  const { locationId } = useParams();


  useEffect(() => {
    const fetchData1 = async() => {
      try{

        const apiresponse = await serverClient.get(`/adboards/${locationId}`)
        setAdBoards(apiresponse.data);
        setUpdate(false);

      }catch(error){
        console.error("Error fetching ad boards:", error);
      }
    }
    const fetchData2 = async() => {
      try{
        const apiresponse = await serverClient.get(`/adlocations/${locationId}`)
        console.log(apiresponse.data);
        setLocation(apiresponse.data[0]);
        setUpdate(false);

      }catch(error){
        console.error("Error fetching ad boards:", error);
      }
    }


    fetchData1();
    fetchData2();
  }, [locationId, update]);


  const handleEditClick = (board) => {
    setIsEdit(true)
    setIsDelete(false)
    setSelectedBoard(board);
    if(userData.role === 'CB-So'){
      onCBSoOpen();
    }
  };


  const columns = [
    {
      dataField: 'boardType',
      text: 'Board Type'
    }, 
    {
      dataField: 'width',
      text: 'Width'
    }, 
    {
      dataField: 'height',
      text: 'Height'
    }, 
    {
      dataField: 'action',
      isDummyField: true,
      text: 'Action',
      formatter: (cellContent, row) => {
        return(
          <div style={{display:"flex", alignItems:"center"}}>
          <Icon 
            as={FaPen} 
            w={4} 
            h={4}
            marginRight={5}
            onClick={() => {
              handleEditClick(row)
            }}
            _hover={{color:'blue'}}
          />
          <Icon 
            as={FaTrashAlt} 
            w={4} 
            h={4}
            marginRight={5}
            onClick={() => {
              setIsEdit(false)
              setIsDelete(true)
              setSelectedBoard(row);
              if(userData.role === 'CB-So'){
                onCBSoOpen();
              }
            }}
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
              if(location.numberAdBoard === adBoards.length){
                toast({
                  title: 'Error',
                  description: "Limited Ad Board Amount",
                  status: 'error',
                  duration: 2000,
                  isClosable: true,
                });
              }
              else{
                setIsEdit(false)
                setIsDelete(false)
                if(userData.role === 'CB-So'){
                  onCBSoOpen();
                }
              }
              }
            }>
            Add
          </Button>
          </div>
        </div>
    );
  };

  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>{location? location.address : ''}</h3>;


  return (
    <div style={{width:"95%"}}>
      {adBoards? (  
        <ToolkitProvider
            keyField="id"
            data={ adBoards }
            columns={ columns }
            search
          >
            {
              props => (
                <div>
                  {location ? <CaptionElement/> : <div/>}
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
      ) : (
        <p>Không tìm thấy bảng quảng cáo nào cho vị trí này.</p>
      )}
      <Modal isOpen={isCBSoOpen} onClose={onCBSoClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh Sửa Bảng Quảng Cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {isEdit ? (selectedBoard && (
              <EditAdBoardCBSo
                info={selectedBoard}
                onClose={onCBSoClose}
                setUpdate={setUpdate}
              />
            )) : 
            (isDelete ? (selectedBoard && (
              <DelAdBoardCBSo
                info={selectedBoard}
                setUpdate={setUpdate}
                onClose={onCBSoClose}
              />
            )) : 
            <AddAdBoardCBSo
            info={location}
            onClose={onCBSoClose}
            setUpdate={setUpdate}
            />
            )
            }
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onCBSoClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdBoardsDisplay;
