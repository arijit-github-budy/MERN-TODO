import Axios from 'axios';
import configurations from '../config/config.module.js';

const authAxios = Axios.create({
  withCredentials: true,
  timeout: configurations.API_TIMEOUT,
  headers: { "Content-Type": "application/json" },
  baseURL: configurations.BACKEND_BASE_URL
});

authAxios.interceptors.request.use(
  async function (options) {
    const token = window.localStorage.getItem('access_token');
    console.log('authAxios token == ' + token);
    const email = window.localStorage.getItem('user_email');
    console.log('authAxios email == ' + email);
    if (token) {
      options.headers['Authorization'] = `Bearer ${token}`;
    }
    if (email) {
      options.headers['email'] = email;
    }

    return options;
  },
  function (error) {
    console.log('request error: ', error);
    return Promise.reject(error);
  },
);


export default authAxios;
