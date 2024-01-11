import { serverClient } from "./serverAxiosClient";

const advertisingLicenseRequestApi = {
    getAdvertisingLicenseRequest() {

        const url = `/advertisingLicenseRequest`
        return serverClient.get(url)
    },
    addAdvertisingLicenseRequest(data) {

        const url = `/advertisingLicenseRequest`
        return serverClient.post(url, data)
    },
    getAdvertisingLicenseRequestByUserId(id) {

        const url = `/advertisingLicenseRequest/${id}`
        return serverClient.get(url)
    },
    updateAdvertisingLicenseRequest(id, data) {

        const url = `/advertisingLicenseRequest/${id}`
        return serverClient.patch(url, data)
    },
    getAdvertisingLicenseRequestByAdBoardId(id) {

        const url = `/advertisingLicenseRequest/adboard/${id}`
        return serverClient.get(url)
    },
    deleteAdvertisingLicenseRequest(id) {

        const url = `/advertisingLicenseRequest/${id}`
        return serverClient.delete(url)
    }
}
export default advertisingLicenseRequestApi