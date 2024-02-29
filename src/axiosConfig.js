import axios from 'axios';
import Cookies from 'js-cookie';

const setupAxiosInterceptors = () => {
    axios.interceptors.request.use(
      (config) => {
        const token = Cookies.get('token'); // Retrieve the token from cookies
        if (token) {
          config.headers.Authorization = `Bearer ${token}`; // Attach the token to the Authorization header
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  };

  export default setupAxiosInterceptors;
  
  