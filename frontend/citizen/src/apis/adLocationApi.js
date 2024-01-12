import { serverClient } from "./serverAxiosClient";
import adBoardApi from "./adBoardApi";
const adLocationAPI = {
    getAllAdLocation() {

        const url = `/adlocations`
        return serverClient.get(url)
    },
    addAdLocation(data) {

        const url = `/adlocations`
        return serverClient.post(url, data)
    },
    getAdLocationByFilters(filters) {

        const url = `/adlocations/filter`
        return serverClient.get(url, { params: filters })
    },
    async doesAdLocationHaveAdBoard(location_id) {
        const adBoards = await adBoardApi.getAdBoardByLocationID(location_id);
        return adBoards.data.length > 0;
    }
}
export default adLocationAPI