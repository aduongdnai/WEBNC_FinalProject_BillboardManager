import { serverClient } from "./serverAxiosClient";

const adLocationAPI = {
    getAllAdLocation() {

        const url = `/adlocations`
        return serverClient.get(url)
    },
    addAdLocation(data) {

        const url = `/adlocations`
        return serverClient.post(url, data)
    }
}
export default adLocationAPI