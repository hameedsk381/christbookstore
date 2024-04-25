import axios from 'axios';

// Set up a reusable axios instance
const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Change this to your API's URL
});

api.interceptors.request.use(function(config) {
    const token = JSON.parse(localStorage.getItem('user')).token;
  
    config.headers.Authorization =  token ? `Bearer ${token}` : '';
    return config;
});

export default api;

