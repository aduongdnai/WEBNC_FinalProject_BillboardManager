import React, { useState, useEffect } from "react";
import axios from "axios";

const ViewAndReviewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/v1/review-requests"
        );
        setRequests(response.data.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleReview = async (requestId, status) => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/process-request",
        {
          requestId,
          status,
        }
      );

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
      <h2>View and Review Requests</h2>
      <ul>
        {requests.map((request) => (
          <li key={request._id}>
            {/* Display request details here */}
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

export default ViewAndReviewRequests;
