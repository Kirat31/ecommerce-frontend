import axios from "axios";

const BASE_URL = "http://localhost:4000/api/auth"; // Update this with your backend API URL

const AuthService = {
  login: (credentials) => {
    return axios.post(`${BASE_URL}/login`, credentials);
  },
  register: (userData) => {
    return axios.post(`${BASE_URL}/register`, userData);
  },
};

export default AuthService;
