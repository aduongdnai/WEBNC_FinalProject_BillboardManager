import React, { useState, useEffect } from "react";
import editRequestApi from "../../apis/editRequestApi"; // Đảm bảo đường dẫn này chính xác
import "./reviewRequest.css";
const ReviewRequestsPage = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    editRequestApi
      .getAllEditRequests()
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const handleApprove = (id) => {
    editRequestApi
      .approveEditRequest(id)
      .then(() => {
        // Cập nhật UI sau khi phê duyệt
        alert("Yêu cầu đã được phê duyệt thành công."); // Thay thế bằng SweetAlert nếu cần
      })
      .catch((error) => {
        console.error(error);
        alert("Đã xảy ra lỗi khi phê duyệt yêu cầu.");
      });
  };

  const handleReject = (id) => {
    editRequestApi
      .rejectEditRequest(id)
      .then(() => {
        // Cập nhật UI sau khi từ chối
        alert("Yêu cầu đã bị từ chối.");
      })
      .catch((error) => {
        console.error(error);
        alert("Đã xảy ra lỗi khi từ chối yêu cầu.");
      });
  };

  return (
    <div>
      <h1>Review Edit Requests</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location Type</th>
            <th>Advertising Type</th>
            <th>Edit Time</th>
            <th>Edit Reason</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request._id}>
              <td>{request._id}</td>
              <td>
                {request.updatedDetails
                  ? request.updatedDetails.locationType
                  : "N/A"}
              </td>
              <td>
                {request.updatedDetails
                  ? request.updatedDetails.advertisingType
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
export default ReviewRequestsPage;
