import { serverClient } from "./serverAxiosClient";

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
    }
}
export default adLocationAPI