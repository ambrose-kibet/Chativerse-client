import axios from 'axios';
export const authInstance = axios.create();
authInstance.defaults.baseURL = 'http://localhost:3001/api/v1';
authInstance.defaults.withCredentials = true;
