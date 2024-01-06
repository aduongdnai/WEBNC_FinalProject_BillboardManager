// AdBoardsTable.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const AdBoardsTable = ({ locationId }) => {
  const [adBoards, setAdBoards] = useState([]);

  useEffect(() => {
    axios
      .get(`/api/v1/adboards/by-location/${locationId}`)
      .then((response) => setAdBoards(response.data))
      .catch((error) => console.error("Error fetching ad boards", error));
  }, [locationId]);

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Type</Th>
          <Th>Width</Th>
          <Th>Height</Th>
          {/* Thêm các cột khác nếu cần */}
        </Tr>
      </Thead>
      <Tbody>
        {adBoards.map((board) => (
          <Tr key={board._id}>
            <Td>{board.boardType}</Td>
            <Td>{board.width}</Td>
            <Td>{board.height}</Td>
            {/* Hiển thị thêm dữ liệu khác nếu muốn */}
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default AdBoardsTable;
