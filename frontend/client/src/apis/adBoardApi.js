import { serverClient } from "./serverAxiosClient";

const adBoardApi = {
    getAdBoardByLocationID(id) {

        const url = `/adboards/${id}`
        return serverClient.get(url)
    },
    addAdBoard(data) {

        const url = `/adboards`
        return serverClient.post(url, data)
    }
}
export default adBoardApi