import React, { useState, useEffect } from "react";
import editBoardRequestApi from "../../apis/editBoardApi.js"; // Update the import path as needed
import "./reviewBoardRequest.css"; // Create and style accordingly

const ReviewBoardRequestsPage = () => {
  const [boardRequests, setBoardRequests] = useState([]);

  useEffect(() => {
    editBoardRequestApi
      .getAllEditRequests()
      .then((response) => setBoardRequests(response.data))
      .catch((error) => console.error(error));
  }, []);

  const handleApprove = (id) => {
    editBoardRequestApi
      .approveEditRequest(id)
      .then(() => {
        // Update UI after approving
        alert("Board request approved successfully.");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred while approving the request.");
      });
  };

  const handleReject = (id) => {
    editBoardRequestApi
      .rejectEditRequest(id)
      .then(() => {
        // Update UI after rejecting
        alert("Board request rejected.");
      })
      .catch((error) => {
        console.error(error);
        alert("Error occurred while rejecting the request.");
      });
  };

  return (
    <div>
      <h1>Review Board Edit Requests</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Board Type</th>
            <th>Dimensions</th>
            <th>Edit Time</th>
            <th>Edit Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {boardRequests.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>
                {request.updatedDetails
                  ? request.updatedDetails.boardType
                  : "N/A"}
              </td>
              <td>
                {request.updatedDetails
                  ? `${request.updatedDetails.width} x ${request.updatedDetails.height}`
                  : "N/A"}
              </td>
              <td>
                {request.updatedDetails && request.updatedDetails.editTime
                  ? new Date(
                      request.updatedDetails.editTime
                    ).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>{request.editReason}</td>
              <td>
                <button
                  className="approve-btn"
                  onClick={() => handleApprove(request._id)}
                >
                  Approve
                </button>
                <button
                  className="reject-btn"
                  onClick={() => handleReject(request._id)}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewBoardRequestsPage;
