import axios from 'axios'; 

const API_BASE_URL = 'http://localhost:8080/payments'; 

export const startPendingPayment = async (productId, amountDue) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/start`, {
      productId,
      amountDue,
    });
    return response.data; 
  } catch (error) {
    console.error("Error al iniciar el pago pendiente:", error);
    throw error; 
  }
};

export const updatePendingPayment = async (paymentId, amountReceived) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/update`, {
      paymentId,
      amountReceived,
    });
    return response.data; 
  } catch (error) {
    console.error("Error al actualizar el pago pendiente:", error);
    throw error;
  }
};

export const finalizePayment = async (paymentId) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/finalize/${paymentId}`);
    return response.data;
  } catch (error) {
    console.error("Error al finalizar el pago:", error);
    throw error;
  }
};
