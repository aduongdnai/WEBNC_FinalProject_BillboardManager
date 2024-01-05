import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";

const AdBoardsDisplay = () => {
  const [adBoards, setAdBoards] = useState([]);
  const { locationId } = useParams(); // Lấy locationId từ URL

  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/v1/adboards/${locationId}`)
      .then((response) => {
        setAdBoards(response.data.data);
      })
      .catch((error) => console.error("Error fetching ad boards:", error));
  }, [locationId]);

  return (
    <div>
      {adBoards.length > 0 ? (
        <Table>
          <Thead>
            <Tr>
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
                <Td>{board.boardType}</Td>
                <Td>{`${board.width} x ${board.height}`}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <p>Không tìm thấy bảng quảng cáo nào cho vị trí này.</p>
      )}
    </div>
  );
};

export default AdBoardsDisplay;
