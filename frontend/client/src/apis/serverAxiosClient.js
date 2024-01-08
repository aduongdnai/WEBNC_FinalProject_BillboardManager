import axios from 'axios'

const serverClient = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1/',

})
// Add a request interceptor
serverClient.interceptors.request.use(function (config) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    // const refreshToken = localStorage.getItem('refreshToken');
    // if (refreshToken) {
    //     config.headers.rfToken = refreshToken;
    // }
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
});

// Add a response interceptor
serverClient.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
}, function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});
export { serverClient }