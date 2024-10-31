import { validateCRC16, calculateCRC16 } from './crcServices';
import { sendData } from './SerialServices';

class MachineEmulator {
    constructor() {
        this.totalAmountRequired = 0;
        this.totalAmountReceived = 0;
    }

    async handleReceivedData(data) {
        const message = data.slice(0, -4);
        const receivedCRC = data.slice(-4);

        if (!validateCRC16(message, receivedCRC)) {
            console.error("CRC inválido, mensaje corrupto.");
            return null;
        }

        console.log("Mensaje válido, procesando...");

        const idProducto = message.slice(4, 6);
        const accion = message.slice(6, 8); 
        const valorIngresado = parseInt(message.slice(8, 11), 10); 

        if (message.endsWith("ENV")) {
            if (accion === '00') {
                this.totalAmountRequired = valorIngresado;
                this.totalAmountReceived = 0; 
                console.log(`Inicio de pago. Monto total requerido: ${this.totalAmountRequired}`);
                return await this.sendResponseToBackend(this.generateResponseMessage(idProducto, '00', valorIngresado, 'CON'));
            } else if (accion === '01') {
                this.totalAmountReceived += valorIngresado;
                console.log(`Pago parcial recibido: ${valorIngresado} centavos. Total acumulado: ${this.totalAmountReceived} centavos.`);

                if (this.totalAmountReceived >= this.totalAmountRequired) {
                    console.log("Pago completado.");
                    const finalResponse = await this.sendResponseToBackend(this.generateResponseMessage(idProducto, '02', this.totalAmountReceived, 'CON'));
                    this.totalAmountReceived = 0; 
                    this.totalAmountRequired = 0;
                    return finalResponse;
                } else {
                    const remainingAmount = this.totalAmountRequired - this.totalAmountReceived;
                    console.log(`Faltan ${remainingAmount} centavos para completar el pago.`);
                    return await this.sendResponseToBackend(this.generateResponseMessage(idProducto, '01', valorIngresado, 'CON'));
                }
            }
        } else if (message.endsWith("CON")) {
            console.log("Mensaje con 'CON' recibido. No se requiere más acción.");
        }

        return null;
    }

    generateResponseMessage(idProducto, accion, valor, estado) {
        const origen = 'E0';
        const destino = 'M0';
        const dataString = `${origen}${destino}${idProducto}${accion}${valor.toString().padStart(3, '0')}${estado}`;
        const crc16 = calculateCRC16(dataString);
        return `${dataString}${crc16}`;
    }

    async sendResponseToBackend(message) {
        try {
            console.log("Enviando respuesta al backend:", message);
            await sendData(message);
            console.log("Respuesta enviada al backend exitosamente.");
            return message; 
        } catch (error) {
            console.error("Error en la comunicación con el backend:", error);
            return null;
        }
    }
}

export default new MachineEmulator();
