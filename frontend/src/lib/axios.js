import axios from 'axios';

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:5020/api',
    withCredentials: true,  
})