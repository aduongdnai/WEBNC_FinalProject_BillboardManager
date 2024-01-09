import { serverClient } from "./serverAxiosClient";

const districtAPI = {
    getAllDistrict() {

        const url = `/district`
        return serverClient.get(url)
    },
}
export default districtAPI