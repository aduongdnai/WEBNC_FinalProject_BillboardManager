import { serverClient } from "./serverAxiosClient";

const editBoardApi = {
  getAllEditRequests() {
    const url = `/editboards`;
    return serverClient.get(url);
  },
  approveEditRequest(id) {
    const url = `/editboards/approve/${id}`;
    return serverClient.post(url);
  },
  rejectEditRequest(id) {
    const url = `/editboards/reject/${id}`;
    return serverClient.post(url);
  },
};

export default editBoardApi;
