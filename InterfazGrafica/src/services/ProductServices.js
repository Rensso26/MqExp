import axios from "axios";

const REST_API_BASE_URL = "http://localhost:8080/product";

export const listProducts = () => axios.get(`${REST_API_BASE_URL}/all`);

export const getProductsById = (id) => {
  if (!id) {
    throw new Error('ID del Producto es requerido');
  }
  return axios.get(`${REST_API_BASE_URL}/${id}`);
};

export const createProduct = (product) => axios.post(`${REST_API_BASE_URL}/save`, product);

export const deleteProduct = (id) => axios.delete(`${REST_API_BASE_URL}/${id}`);

export const updateProduct = (id, product) => axios.put(`${REST_API_BASE_URL}/${id}`, product);

export const visibleProduct = (id, product) => axios.put(`${REST_API_BASE_URL}/visible/${id}`, product)
