import { serverClient } from "./serverAxiosClient";

const adLocationAPI = {
  getAllAdLocation() {
    const url = `/adlocations`;
    return serverClient.get(url);
  },
  getAdLocationByArea(param) {
    const url = `/adlocations/findByArea`;
    return serverClient.post(url, param);
  },
  getAdLocationByAdType(param) {
    const url = `/adlocations/findByAdType`;
    return serverClient.post(url, param);
  },
  addAdLocation(data) {
    const url = `/adlocations`;
    return serverClient.post(url, data);
  },
  updateAdLocation(id, data) {
    const url = `/adlocations/update/${id}`;
    return serverClient.post(url, data);
  },
};
export default adLocationAPI;
