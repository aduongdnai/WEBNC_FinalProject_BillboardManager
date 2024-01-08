import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
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
            {/* Hiển thị thêm thông tin khác của board */}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AdBoardsDetails;
