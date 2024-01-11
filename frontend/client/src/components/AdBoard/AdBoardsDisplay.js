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

const AdBoardsDisplay = () => {
  const [adBoards, setAdBoards] = useState([]);
  const [selectedBoard, setSelectedBoard] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { locationId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/adboards/${locationId}`)
      .then((response) => {
        setAdBoards(response.data.data);
      })
      .catch((error) => console.error("Error fetching ad boards:", error));
  }, [locationId]);

  const handleEditClick = (board) => {
    setSelectedBoard(board);
    onOpen();
  };

  const handleSubmit = (data) => {
    // Xử lý logic khi submit form
    console.log(data);
  };

  return (
    <div>
      {adBoards.length > 0 ? (
        <Table>
          <Thead>
            <Tr>
              <Th>STT</Th>
              <Th>ID</Th>
              <Th>Loại Bảng</Th>
              <Th>Kích Thước</Th>
              <Th>Hành động</Th>
            </Tr>
          </Thead>
          <Tbody>
            {adBoards.map((board, index) => (
              <Tr key={board._id}>
                <Td>{index + 1}</Td>
                <Td>{board._id}</Td>
                <Td>{board.boardType}</Td>
                <Td>{`${board.width} x ${board.height}`}</Td>
                <Td>
                  <Button
                    colorScheme="blue"
                    onClick={() => handleEditClick(board)}
                  >
                    Chỉnh sửa bảng quảng cáo
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <p>Không tìm thấy bảng quảng cáo nào cho vị trí này.</p>
      )}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh Sửa Bảng Quảng Cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedBoard && (
              <EditAdBoardForm
                adBoard={selectedBoard}
                onClose={onClose}
                onSubmit={handleSubmit}
              />
            )}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Đóng
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AdBoardsDisplay;
