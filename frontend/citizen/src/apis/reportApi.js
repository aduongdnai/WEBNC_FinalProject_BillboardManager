import { serverClient } from "./serverAxiosClient";

const reportApi = {
    getReportByType(type) {

        const url = `/report/type/${type}`
        return serverClient.get(url)
    },
    getReportByID(id) {

        const url = `/report/${id}`
        return serverClient.get(url)
    }

}
export default reportApi