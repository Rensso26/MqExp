package uce.ec.BDmq.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uce.ec.BDmq.Interfaces.ControlleableId;
import uce.ec.BDmq.services.ProductService;
import uce.ec.BDmq.state.Product;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController implements ControlleableId<Product> {

    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @Override
    @PostMapping("/save")
    public ResponseEntity<Product> save(@RequestBody Product entity) {
        try {
            String imageName = entity.getImage();
            if (imageName != null && !imageName.isEmpty()) {
                String imagePath = "public/assets/images/" + imageName + ".png";
            }

            Product savedProduct = productService.save(entity);
            return ResponseEntity.ok(savedProduct);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @Override
    @GetMapping("/{id}")
    public ResponseEntity<Product> findById(@PathVariable int id) {
        Product product = productService.findById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @GetMapping("/all")
    public ResponseEntity<List<Product>> getAll() {
        List<Product> products = productService.findAll();
        if (products.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(products);
    }

    @Override
    @PutMapping("/{id}")
    public ResponseEntity<Product> update(@PathVariable int id, @RequestBody Product entity) {
        try {
            Product existingProduct = productService.findById(id);
            if (existingProduct != null) {
                existingProduct.setQuantity(entity.getQuantity());
                Product updatedProduct = productService.save(existingProduct);
                return ResponseEntity.ok(updatedProduct);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/visible/{id}")
    public ResponseEntity<Product> visible (@PathVariable int id, @RequestBody Product entity) {
        try{
            Product existingProduct = productService.findById(id);
            if(existingProduct != null){
                existingProduct.setVisible(entity.isVisible());
                Product updatedProduct = productService.save(existingProduct);
                return ResponseEntity.ok(updatedProduct);
            } else {
                return ResponseEntity.notFound().build();
            }
            } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }
    @Override
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
