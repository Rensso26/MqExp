package uce.ec.BDmq.services;
import jssc.SerialPort;
import jssc.SerialPortException;
import org.springframework.stereotype.Service;

@Service
public class SerialService {

    private SerialPort serialPort;

    public void openSerialPort(String portName) throws SerialPortException {
        serialPort = new SerialPort(portName);
        serialPort.openPort();
        serialPort.setParams(SerialPort.BAUDRATE_9600,
                SerialPort.DATABITS_8,
                SerialPort.STOPBITS_1,
                SerialPort.PARITY_NONE);
    }

    public void writeData(String data) throws SerialPortException {
        if (serialPort != null && serialPort.isOpened()) {
            serialPort.writeString(data);
        }
    }

    public String readData() throws SerialPortException {
        if (serialPort != null && serialPort.isOpened()) {
            return serialPort.readString();
        }
        return null;
    }

    public void closeSerialPort() throws SerialPortException {
        if (serialPort != null && serialPort.isOpened()) {
            serialPort.closePort();
        }
    }
}
