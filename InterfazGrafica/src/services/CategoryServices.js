import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/category";

export const listCategories = () => axios.get(`${REST_API_BASE_URL}/all`)

export const deleteCategory = (name) => axios.delete(`${REST_API_BASE_URL}/del/${name}`);
