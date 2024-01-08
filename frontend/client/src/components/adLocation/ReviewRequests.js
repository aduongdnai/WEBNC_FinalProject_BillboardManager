// ReviewRequests.js

import React, { useState, useEffect } from "react";
import axios from "axios";

const ReviewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Gọi API để lấy danh sách yêu cầu
    const fetchData = async () => {
      try {
        const response = await axios.get("URL_API_GET_REQUESTS");
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchData();
  }, []); // Chạy một lần khi component được tạo

  const handleReview = async (requestId, status) => {
    try {
      // Gửi yêu cầu xét duyệt hoặc từ chối tới API
      const response = await axios.post("URL_API_REVIEW_REQUEST", {
        requestId,
        status,
      });

      // Cập nhật danh sách yêu cầu sau khi xét duyệt
      setRequests((prevRequests) =>
        prevRequests.map((request) =>
          request._id === requestId ? { ...request, status } : request
        )
      );
    } catch (error) {
      console.error("Error reviewing request:", error);
    }
  };

  return (
    <div>
      <h2>Yêu Cầu Đang Chờ Xem Xét</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            <p>{request.editReason}</p>
            <button onClick={() => handleReview(request._id, "approved")}>
              Xét Duyệt
            </button>
            <button onClick={() => handleReview(request._id, "rejected")}>
              Từ Chối
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewRequests;
