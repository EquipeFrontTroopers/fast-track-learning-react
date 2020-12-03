import axios from 'axios';
import { getToken } from './token';

const api = axios.create({
  baseURL: 'https://app-fast.herokuapp.com/',
});

api.interceptors.request.use((config) => {
  const newConfig = config;
  try {
    const token = getToken();
    if (token) {
      newConfig.headers.Authorization = `Bearer ${token}`;
    }
    return newConfig;
  } catch (err) {
    console.log(err);
    return config;
  }
});

export default api;
