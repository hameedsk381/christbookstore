import axios from 'axios';
import { serverUrl } from './serverapi';

// Set up a reusable axios instance
const api = axios.create({
    baseURL: `${serverUrl}/api`, // Change this to your API's URL
});

api.interceptors.request.use(function(config) {
    const token = JSON.parse(localStorage.getItem('user')).token;
  
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default api;

