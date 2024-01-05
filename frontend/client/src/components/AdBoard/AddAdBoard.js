import React, { useState } from "react";
import axios from "axios";

const AddAdBoard = () => {
  const [adBoardData, setAdBoardData] = useState({
    location_id: "",
    boardType: "",
    width: 0,
    height: 0,
    // Thêm các trường khác tùy thuộc vào model của bạn
  });

  const handleChange = (e) => {
    setAdBoardData({ ...adBoardData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("/api/adboards", adBoardData)
      .then((response) => console.log(response))
      .catch((error) => console.error("Error adding ad board:", error));
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        name="location_id"
        value={adBoardData.location_id}
        onChange={handleChange}
        placeholder="Location ID"
      />
      <input
        name="boardType"
        value={adBoardData.boardType}
        onChange={handleChange}
        placeholder="Board Type"
      />
      {/* Thêm input cho width, height, và các trường khác */}
      <button type="submit">Add Ad Board</button>
    </form>
  );
};

export default AddAdBoard;
