import React, { useState } from "react";
import AdLocationsTable from "./AdLocationsTable";
import adLocationAPI from "../../apis/adLocationApi";
import AdBoardDetails from "./AdBoardDetails"; // Thêm import này
import { Button } from "@chakra-ui/react";

const AdLocationPage = () => {
  const [adLocations, setAdLocations] = useState([]);
  const [showTable, setShowTable] = useState(false);
  const [selectedLocationId, setSelectedLocationId] = useState(null);

  const handleViewAdLocations = () => {
    adLocationAPI
      .getAllAdLocation()
      .then((response) => {
        setAdLocations(response.data);
        setShowTable(true);
      })
      .catch((error) => console.error("Error fetching ad locations:", error));
  };

  return (
    <div>
      <Button onClick={handleViewAdLocations}>Xem Điểm Quảng Cáo</Button>
      {showTable && <AdLocationsTable adLocations={adLocations} />}
      {selectedLocationId && <AdBoardDetails locationId={selectedLocationId} />}
    </div>
  );
};

export default AdLocationPage;
