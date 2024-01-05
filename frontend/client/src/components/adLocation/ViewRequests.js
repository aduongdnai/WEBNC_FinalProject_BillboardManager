// components/ViewRequests.js
import React, { useEffect, useState } from "react";
import axios from "axios";

const ViewRequests = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    // Fetch requests from the server when the component mounts
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

  return (
    <div>
      <h2>View and Approve Requests</h2>
      {/* Render the list of requests */}
      <ul>
        {requests.map((request) => (
          <li key={request._id}>{/* Display request details here */}</li>
        ))}
      </ul>
    </div>
  );
};

export default ViewRequests;
