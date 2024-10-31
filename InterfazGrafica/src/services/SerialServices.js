import axios from 'axios';

const REST_API_BASE_URL = "http://localhost:8080/serial";

export const openSerialPort = async (portName) => {
  try {
    const response = await axios.post(`${REST_API_BASE_URL}/open`, null, {
      params: { portName }
    });
    console.log('Puerto serial abierto:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error abriendo el puerto serial:', error);
    throw error;
  }
};

export const sendData = async (message) => {
  try {
    const response = await axios.post(`${REST_API_BASE_URL}/send`, { message });
    console.log('Datos enviados:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error enviando datos:', error);
    throw error;
  }
};

export const receiveData = async () => {
  try {
    const response = await axios.get(`${REST_API_BASE_URL}/receive`);
    console.log('Datos recibidos:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error recibiendo datos:', error);
    throw error;
  }
};

export const closeSerialPort = async () => {
  try {
    const response = await axios.post(`${REST_API_BASE_URL}/close`);
    console.log('Puerto serial cerrado:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error cerrando el puerto serial:', error);
    throw error;
  }
};
