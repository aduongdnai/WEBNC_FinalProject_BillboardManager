import { serverClient } from "./serverAxiosClient";

const adBoardApi = {
    getAdBoardByLocationID(id) {

        const url = `/adboards/${id}`
        return serverClient.get(url)
    },
    addAdBoard(data) {

        const url = `/adboards`
        return serverClient.post(url, data)
    },
    updateAdboard(id, data) {

        const url = `/adboards/${id}`
        return serverClient.patch(url, data)
    }
}
export default adBoardApi