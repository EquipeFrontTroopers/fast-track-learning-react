import axios from 'axios';
import jwtDecode from 'jwt-decode';
import getToken from './token';

const api = axios.create({
  baseURL: 'http://localhost:3000/',
});

api.interceptors.request.use((config) => {
  const newConfig = config;
  try {
    console.log('estou no INTERCEPTOR');
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
