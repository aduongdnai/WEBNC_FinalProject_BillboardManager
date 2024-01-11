import { serverClient } from "./serverAxiosClient";
import adBoardApi from "./adBoardApi";
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
  async doesAdLocationHaveAdBoard(location_id) {
    const adBoards = await adBoardApi.getAdBoardByLocationID(location_id);
    return adBoards.data.length > 0;
  }
};
export default adLocationAPI;
