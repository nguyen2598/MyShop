import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://192.168.1.198:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});
// Interceptors
// Add a request interceptor
axiosClient.interceptors.request.use(
    async function (config) {
        const authJSON: any = await AsyncStorage.getItem('persist:auth');
        const token = authJSON && JSON.parse(authJSON!)?.token?.slice(1, -1);
        // console.log('tokenq: ', token);
        // Do something before request is sent
        config.headers['Authorization'] = `Bearer ${token}`;
        return config;
    },
    function (error) {
        // Do something with request error
        return Promise.reject(error);
    },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
    function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
    },
    function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        return Promise.reject(error);
    },
);

export default axiosClient;
