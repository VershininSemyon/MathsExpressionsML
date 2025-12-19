
import axios from 'axios';
import { data } from '../config';


const api = axios.create({
    baseURL: `http://${data.backEndHost}:${data.backEndPort}/api/v1/`,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use(async (config) => {
    const storedAuth = localStorage.getItem('authState');
    
    if (storedAuth) {
        try {
            const authData = JSON.parse(storedAuth);
            const accessToken = authData.accessToken;
            config.headers.Authorization = `Bearer ${accessToken}`;
        } 
        catch (error) {
            console.error('Error parsing authState from localStorage:', error);
        }
    }

    return config;
}, (error) => {
    return Promise.reject(error);
});

export default api;
