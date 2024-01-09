import { serverClient } from "./serverAxiosClient";

const userApi = {
    getUserByID(id) {

        const url = `/users/${id}`
        return serverClient.get(url)
    },

}
export default userApi