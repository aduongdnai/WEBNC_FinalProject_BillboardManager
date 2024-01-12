// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";

// const AdBoardsDisplay = () => {
//   const [adBoards, setAdBoards] = useState([]);
//   const { locationId } = useParams(); // Lấy locationId từ URL

//   const navigate = useNavigate();
//   const handleEdit = (boardId) => {
//     // Chuyển hướng đến trang chỉnh sửa với boardId
//     navigate.push(`/edit-adboard/${boardId}`);
//   };

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/v1/adboards/${locationId}`)
//       .then((response) => {
//         setAdBoards(response.data.data);
//       })
//       .catch((error) => console.error("Error fetching ad boards:", error));
//   }, [locationId]);

//   return (
//     <div>
//       {adBoards.length > 0 ? (
//         <Table>
//           <Thead>
//             <Tr>
//               <Th>ID</Th>
//               <Th>Loại Bảng</Th>
//               <Th>Kích Thước</Th>
//               <Th>Hành động</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {adBoards.map((board, index) => (
//               <Tr key={board._id}>
//                 <Td>{index + 1}</Td>
//                 <Td>{board.boardType}</Td>
//                 <Td>{`${board.width} x ${board.height}`}</Td>

//                 <Td>
//                   <Button
//                     colorScheme="blue"
//                     onClick={() => handleEdit(board._id)}
//                   >
//                     Chỉnh sửa bảng quảng cáo
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       ) : (
//         <p>Không tìm thấy bảng quảng cáo nào cho vị trí này.</p>
//       )}
//     </div>
//   );
// };

// export default AdBoardsDisplay;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";
// import {
//   Table,
//   Thead,
//   Tbody,
//   Tr,
//   Th,
//   Td,
//   Button,
//   Modal,
//   ModalOverlay,
//   ModalContent,
//   ModalHeader,
//   ModalFooter,
//   ModalBody,
//   ModalCloseButton,
//   useDisclosure,
// } from "@chakra-ui/react";
// import { useNavigate } from "react-router-dom";
// import EditAdBoardForm from "./EditAdBoardForm.js";

// const AdBoardsDisplay = () => {
//   const [adBoards, setAdBoards] = useState([]);
//   const { locationId } = useParams(); // Lấy locationId từ URL
//   const navigate = useNavigate();

//   const { isOpen, onOpen, onClose } = useDisclosure();
//   const [selectedBoard, setSelectedBoard] = useState(null);

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/v1/adboards/${locationId}`)
//       .then((response) => {
//         setAdBoards(response.data.data);
//       })
//       .catch((error) => console.error("Error fetching ad boards:", error));
//   }, [locationId]);

//   const handleEdit = (boardId) => {
//     navigate(`/edit-adboard/${boardId}`);
//   };

//   return (
//     <div>
//       {adBoards.length > 0 ? (
//         <Table>
//           <Thead>
//             <Tr>
//               <Th>STT</Th>
//               <Th>ID</Th>
//               <Th>Loại Bảng</Th>
//               <Th>Kích Thước</Th>
//               <Th>Hành động</Th>
//             </Tr>
//           </Thead>
//           <Tbody>
//             {adBoards.map((board, index) => (
//               <Tr key={board._id}>
//                 <Td>{index + 1}</Td>
//                 <Td>{board._id}</Td>
//                 <Td>{board.boardType}</Td>
//                 <Td>{`${board.width} x ${board.height}`}</Td>
//                 <Td>
//                   <Button
//                     colorScheme="blue"
//                     onClick={() => handleEdit(board._id)}
//                   >
//                     Chỉnh sửa bảng quảng cáo
//                   </Button>
//                 </Td>
//               </Tr>
//             ))}
//           </Tbody>
//         </Table>
//       ) : (
//         <p>Không tìm thấy bảng quảng cáo nào cho vị trí này.</p>
//       )}

//       <Modal isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader>Chỉnh Sửa Bảng Quảng Cáo</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody>
//             {selectedBoard && (
//               <EditAdBoardForm
//                 adBoard={selectedBoard}
//                 onClose={onClose}
//                 // You might need to pass other props like onSubmit
//               />
//             )}
//           </ModalBody>
//           <ModalFooter>
//             <Button colorScheme="blue" mr={3} onClick={onClose}>
//               Đóng
//             </Button>
//           </ModalFooter>
//         </ModalContent>
//       </Modal>
//     </div>
//   );
// };

// export default AdBoardsDisplay;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import {
  Table,
  Icon,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from "@chakra-ui/react";
import EditAdBoardForm from "./EditAdBoardForm"; // Điều chỉnh đường dẫn import
import { FaEye,FaPen } from "react-icons/fa";
import { IoSearchOutline } from "react-icons/io5";
import BootstrapTable from 'react-bootstrap-table-next';
import paginationFactory from 'react-bootstrap-table2-paginator';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit/dist/react-bootstrap-table2-toolkit';
import { useSelector } from "react-redux";
import EditAdBoardCBSo from "./EditAdBoardCBSo";



const AdBoardsDisplay = () => {
  const userData = useSelector(state => state.auth.userData);
  const [adBoards, setAdBoards] = useState([]);
  const [location, setLocation] = useState(null);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const [update, setUpdate] = useState(true);
  const { isOpen: isCBSoOpen, onOpen: onCBSoOpen, onClose: onCBSoClose } = useDisclosure();
  const { locationId } = useParams();

  useEffect(() => {
    const fetchData1 = async() => {
      try{

        const apiresponse = await axios.get(`http://localhost:5000/api/v1/adboards/${locationId}`)
        setAdBoards(apiresponse.data.data);
        setUpdate(false);

      }catch(error){
        console.error("Error fetching ad boards:", error);
      }
    }
    const fetchData2 = async() => {
      try{
        const apiresponse = await axios.get(`http://localhost:5000/api/v1/adlocations/${locationId}`)
        console.log(apiresponse.data.data);
        setLocation(apiresponse.data.data[0]);
        setUpdate(false);

      }catch(error){
        console.error("Error fetching ad boards:", error);
      }
    }


    fetchData1();
    fetchData2();
  }, [locationId, update]);


  const handleEditClick = (board) => {
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
          </div>
        </div>
    );
  };

  const CaptionElement = () => <h3 style={{ borderRadius: '0.25em', textAlign: 'center', color: 'purple', border: '1px solid purple', padding: '0.5em', marginTop:"15px" }}>{location? location.address : ''}</h3>;


  return (
    <div style={{width:"95%"}}>
      {adBoards.length > 0 ? (  
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
            {selectedBoard && (
              <EditAdBoardCBSo
                info={selectedBoard}
                onClose={onCBSoClose}
                setUpdate={setUpdate}
              />
            )}
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
