import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/user";

export const listProducts = () => axios.get(`${REST_API_BASE_URL}all`);

export const loginUser = (username, password) => {
    return axios.post(`${REST_API_BASE_URL}/login`, {
      user: username,
      password: password
    });
  };