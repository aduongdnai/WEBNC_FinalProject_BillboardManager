import { serverClient } from "./serverAxiosClient";

const reportApi = {
    getReportByType(type) {

        const url = `/report/type/${type}`
        return serverClient.get(url)
    },

}
export default reportApi