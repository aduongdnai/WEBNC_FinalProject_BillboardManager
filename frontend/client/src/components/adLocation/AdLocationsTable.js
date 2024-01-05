import React, { useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import EditAdLocationForm from "./EditAdLocationForm1";
import { useNavigate } from "react-router-dom";

const AdLocationsTable = ({ adLocations }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const navigate = useNavigate();

  const handleDetailsClick = (locationId) => {
    navigate(`/ad-boards/${locationId}`);
  };

  const handleEditClick = (location) => {
    setSelectedLocation(location);
    onOpen();
  };

  const handleSubmit = (data) => {
    // Xử lý logic khi submit form
    console.log(data);
  };

  return (
    <>
      <Table>
        <Thead>
          <Tr>
            <Th>STT</Th>
            <Th>Address</Th>
            <Th>Area</Th>
            <Th>Type</Th>
            <Th>Hành Động</Th>
            <Th>Hành Động</Th>
          </Tr>
        </Thead>
        <Tbody>
          {adLocations.map((location, index) => (
            <Tr key={location._id}>
              <Td>{index + 1}</Td>
              <Td>{location.address}</Td>
              <Td>{location.area}</Td>
              <Td>{location.locationType}</Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => handleDetailsClick(location._id)}
                >
                  Xem chi tiết bảng quảng cáo
                </Button>
              </Td>
              <Td>
                <Button
                  colorScheme="blue"
                  onClick={() => handleEditClick(location)}
                >
                  Chỉnh sửa bảng quảng cáo
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Chỉnh Sửa Điểm Đặt Quảng Cáo</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedLocation && (
              <EditAdLocationForm
                adLocation={selectedLocation}
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
    </>
  );
};

export default AdLocationsTable;
