import { serverClient } from "./serverAxiosClient";

const advertisingTypeAPI = {
    getAllType() {
        const url = `/advertisingType`
        return serverClient.get(url)
    },
}
export default advertisingTypeAPI