package uce.ec.BDmq.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.BufferedReader;
import java.io.InputStreamReader;

@RestController
@RequestMapping("/api/python")
public class PythonController {

    @GetMapping("/run-script")
    public ResponseEntity<String> runPythonScript() {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("python", "C:/Users/rensso/Desktop/generate_Recive.py");
            processBuilder.redirectErrorStream(true);
            Process process = processBuilder.start();

            BufferedReader reader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            StringBuilder output = new StringBuilder();
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line).append("\n");
            }
            int exitCode = process.waitFor();
            return new ResponseEntity<>(output.toString(), exitCode == 0 ? HttpStatus.OK : HttpStatus.INTERNAL_SERVER_ERROR);
        } catch (Exception e) {
            return new ResponseEntity<>("Error al ejecutar el script: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
