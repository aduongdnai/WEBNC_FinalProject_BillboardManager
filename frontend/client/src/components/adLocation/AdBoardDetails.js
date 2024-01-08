import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
import { useParams } from "react-router-dom";

const AdBoardsDetails = () => {
  const [adBoards, setAdBoards] = useState([]);
  const { locationId } = useParams();

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/adboards/${locationId}`)
      .then((response) => setAdBoards(response.data.data))
      .catch((error) => console.error("Error fetching ad boards", error));
  }, [locationId]);

  const handleEdit = (boardId) => {
    // Logic để chỉnh sửa bảng quảng cáo
  };
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Board Type</Th>
          <Th>Width</Th>
          <Th>Height</Th>
          <Th>Hành động</Th>
          {/* Thêm các cột khác nếu cần */}
        </Tr>
      </Thead>
      <Tbody>
        {adBoards.map((board, index) => (
          <Tr key={index}>
            <Td>{board._id}</Td>
            <Td>{board.boardType}</Td>
            <Td>{board.width}</Td>
            <Td>{board.height}</Td>
            <Td>
              <Button colorScheme="blue" onClick={() => handleEdit(board._id)}>
                Chỉnh sửa bảng quảng cáo
              </Button>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AdBoardsDetails;

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { Table, Thead, Tbody, Tr, Th, Td, Button } from "@chakra-ui/react";
// import { useParams, useHistory } from "react-router-dom";

// const AdBoardsDetails = () => {
//   const [adBoards, setAdBoards] = useState([]);
//   const { locationId } = useParams();
//   const history = useHistory();

//   useEffect(() => {
//     axios
//       .get(`http://localhost:5000/api/v1/adboards/${locationId}`)
//       .then((response) => {
//         setAdBoards(response.data.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching ad boards", error);
//       });
//   }, [locationId]);

//   const handleEdit = (boardId) => {
//     // Chuyển hướng đến trang chỉnh sửa với boardId
//     history.push(`/edit-adboard/${boardId}`);
//   };

//   return (
//     <Table>
//       <Thead>
//         <Tr>
//           <Th>ID</Th>
//           <Th>Board Type</Th>
//           <Th>Width</Th>
//           <Th>Height</Th>
//           <Th>Hành động</Th>
//         </Tr>
//       </Thead>
//       <Tbody>
//         {adBoards.map((board) => (
//           <Tr key={board._id}>
//             <Td>{board._id}</Td>
//             <Td>{board.boardType}</Td>
//             <Td>{board.width}</Td>
//             <Td>{board.height}</Td>
//             <Td>
//               <Button colorScheme="blue" onClick={() => handleEdit(board._id)}>
//                 Chỉnh sửa
//               </Button>
//             </Td>
//           </Tr>
//         ))}
//       </Tbody>
//     </Table>
//   );
// };

// export default AdBoardsDetails;
