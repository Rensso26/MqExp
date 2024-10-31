import { calculateCRC16 } from './crcServices';
import { sendData } from './SerialServices';
import MachineEmulator from './MachineEmulator';

class PayService {
    async handlePurchase(product, paymentMethod, updatePendingAmount) {
      if (paymentMethod === 'efectivo') {
            const origen = 'M0';
            const destino = 'E0';
            const idProducto = product.id.toString().padStart(2, '0');
            const accion = '00';
            const valorCobrar = (product.price * 100).toFixed(0).padStart(3, '0');
            const estado = 'ENV';
            const dataString = `${origen}${destino}${idProducto}${accion}${valorCobrar}${estado}`;

            const crc16 = calculateCRC16(dataString);
            const message = `${dataString}${crc16}`;

            console.log("Mensaje enviado al emulador:", message);
        
            try {
                const serverResponse = await sendData(message);
                console.log("Respuesta del servidor:", serverResponse);
                
                const emulatorResponse = await this.waitForEmulatorResponse(message);
                
                console.log("Respuesta recibida del emulador:", emulatorResponse);
                
                if (emulatorResponse && emulatorResponse.includes('CON')) {
                    const amountReceived = this.extractAmountFromResponse(emulatorResponse);
                    updatePendingAmount(amountReceived);
                    return emulatorResponse;
                } else {
                    console.error("No se recibió la respuesta CON del emulador.");
                    throw new Error("Respuesta del emulador no válida");
                }
    
            } catch (error) {
                console.error("Error en la comunicación RS232:", error);
                throw error;
            }
        }
    }
  async waitForEmulatorResponse(originalMessage) {
      const maxRetries = 3;
      let retries = 0;

      return new Promise((resolve, reject) => {
          const checkResponse = async () => {
              try {
                  const emulatorResponse = await MachineEmulator.handleReceivedData(originalMessage);
                  
                  console.log("Respuesta del emulador:", emulatorResponse);
                  
                  if (emulatorResponse && typeof emulatorResponse === 'string') {
                      if (emulatorResponse.includes('CON')) {
                          resolve(emulatorResponse);
                      } 
                      // Aquí agregamos la lógica para la acción 01
                      else if (emulatorResponse.includes('01')) {
                          // Cambiamos ENV por CON y ajustamos el emisor y destinatario
                          const updatedResponse = this.updateResponseForPayment(emulatorResponse);
                          resolve(updatedResponse);
                      } else {
                          console.error("No se recibió la respuesta CON. Reintentando...");
                          if (retries < maxRetries) {
                              retries++;
                              setTimeout(checkResponse, 3000); 
                          } else {
                              reject("Máximo de reintentos alcanzado. Cancelando...");
                          }
                      }
                  } else {
                      console.error("Respuesta del emulador es undefined o no es un string");
                      reject("Respuesta del emulador no válida.");
                  }
              } catch (err) {
                  console.error("Error al manejar la respuesta del emulador:", err);
                  reject("Error en la comunicación con el emulador.");
              }
          };

          checkResponse();
      });
  }

  updateResponseForPayment(response) {
      const updatedMessage = response.replace('ENV', 'CON'); 
      const emisor = 'E0'; 
      const destinatario = 'M0'; 
      return updatedMessage.replace('E0', destinatario).replace('M0', emisor);
  }

  extractAmountFromResponse(response) {
    const amountString = response.slice(10, 13); 
    return parseInt(amountString, 10);
  }
}
export default new PayService();
