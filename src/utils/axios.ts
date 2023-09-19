import axios from 'axios';
export const authInstance = axios.create();
authInstance.defaults.baseURL = 'https://chativerse-api.onrender.com/api/v1';
authInstance.defaults.withCredentials = true;
