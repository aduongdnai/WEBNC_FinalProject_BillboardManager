import axios from 'axios'
import store from '../store';
import { updateAccessToken } from '../components/actions/authAction';
export const serverClient = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/v1/',

})
// Add a request interceptor
serverClient.interceptors.request.use(async (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    const refreshToken = localStorage.getItem('refreshToken');
    if (refreshToken) {
        config.headers.rfToken = refreshToken;
    }
    return config;
});

// Add a response interceptor
serverClient.interceptors.response.use(async (response) => {
    // Nếu có accessToken mới từ server, cập nhật vào Redux store và localStorage
    //console.log(response);
    if (response.data && response.data.token) {
        const token = response.data.token;
        store.dispatch(updateAccessToken(token));
    }
    return response.data;
});