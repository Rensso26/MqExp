package uce.ec.BDmq.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uce.ec.BDmq.services.SerialService;

@RestController
@RequestMapping("/serial")
public class SerialController {

    private final SerialService serialService;

    public SerialController(SerialService serialService) {
        this.serialService = serialService;
    }

    @PostMapping("/open")
    public ResponseEntity<String> openPort(@RequestParam String portName) {
        try {
            serialService.openSerialPort(portName);
            return ResponseEntity.ok("Puerto abierto correctamente: " + portName);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error abriendo el puerto serial: " + e.getMessage());
        }
    }

    @PostMapping("/send")
    public ResponseEntity<String> sendData(@RequestBody String data) {
        try {
            serialService.writeData(data);
            return ResponseEntity.ok("Datos enviados correctamente: " );
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error enviando datos: " + e.getMessage());
        }
    }

    @GetMapping("/receive")
    public ResponseEntity<String> receiveData() {
        try {
            String data = serialService.readData();
            return ResponseEntity.ok(data);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error recibiendo datos: " + e.getMessage());
        }
    }

    @PostMapping("/close")
    public ResponseEntity<String> closePort() {
        try {
            serialService.closeSerialPort();
            return ResponseEntity.ok("Puerto cerrado correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error cerrando el puerto serial: " + e.getMessage());
        }
    }
}
