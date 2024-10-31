import crc from 'crc';

export const calculateCRC16 = (data) => {
    return crc.crc16(data).toString(16).padStart(4, '0').toUpperCase();
};

export const validateCRC16 = (data, crcValue) => {
    const calculatedCRC = calculateCRC16(data);
    return calculatedCRC === crcValue.toUpperCase();
};
