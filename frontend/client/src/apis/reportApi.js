import { serverClient } from "./serverAxiosClient";

const reportApi = {
    getReportByType(type, data) {

        const url = `/report/type/${type}`
        return serverClient.post(url, { area: data })
    },

}
export default reportApi