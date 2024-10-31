package uce.ec.BDmq.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;

@RestController
@RequestMapping("/image")
public class ImageController {

    private static final String UPLOAD_DIR = "D:/Proyectos/BDmq/public/assets/images/";

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("imageFile") MultipartFile file) {
        try {
            String imageName = file.getOriginalFilename();
            if (imageName != null) {
                File imageFile = new File(UPLOAD_DIR + imageName);
                file.transferTo(imageFile);
                return ResponseEntity.ok("Image uploaded successfully");
            } else {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No image file provided");
            }
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error uploading image");
        }
    }
}