import { serverClient } from "./serverAxiosClient";

const wardAPI = {
    getAllWardByDistrict(district) {
        const url = `/ward/findByDistrict`
        return serverClient.post(url,district)
    },
}
export default wardAPI