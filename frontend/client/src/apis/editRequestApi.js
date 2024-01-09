import { serverClient } from "./serverAxiosClient";

const editRequestApi = {
  getAllEditRequests() {
    const url = `/editrequests`;
    return serverClient.get(url);
  },
  approveEditRequest(id) {
    const url = `/editrequests/approve/${id}`;
    return serverClient.post(url);
  },
  rejectEditRequest(id) {
    const url = `/editrequests/reject/${id}`;
    return serverClient.post(url);
  },
};

export default editRequestApi;
