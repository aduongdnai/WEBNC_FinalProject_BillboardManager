import { serverClient } from "./serverAxiosClient";

const advertisingLicenseRequestApi = {
    getAdvertisingLicenseRequest() {

        const url = `/advertisingLicenseRequest`
        return serverClient.get(url)
    },
    addAdvertisingLicenseRequest(data) {

        const url = `/advertisingLicenseRequest`
        return serverClient.post(url, data)
    }
}
export default advertisingLicenseRequestApi