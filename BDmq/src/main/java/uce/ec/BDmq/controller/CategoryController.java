package uce.ec.BDmq.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uce.ec.BDmq.Interfaces.ControllableName;
import uce.ec.BDmq.services.CategoryService;
import uce.ec.BDmq.state.Category;
import java.util.List;

@RestController
@RequestMapping("/category")
public class CategoryController implements ControllableName<Category> {
    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }


    @Override
    @PostMapping("/save/")
    public ResponseEntity<Category> save(@RequestBody Category entity) {
        Category savedCategory = categoryService.save(entity);
        return ResponseEntity.ok(savedCategory);
    }

    @Override
    @GetMapping("/{name}")
    public ResponseEntity<Category> findByName(@PathVariable String name) {
        Category category = categoryService.findByName(name);
        if (category != null) {
            return ResponseEntity.ok(category);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @GetMapping("/all")
    public ResponseEntity<List<Category>> getAll() {
        List<Category> categoryList = categoryService.findAll();
        if (categoryList.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(categoryList);
    }

    @Override
    @PutMapping("/{name}")
    public ResponseEntity<Category> update(@PathVariable String name,@RequestBody  Category entity) {
        try {
            Category updatedCategory = categoryService.update(name,entity);
            return ResponseEntity.ok(updatedCategory);
        }catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @DeleteMapping("/del/{name}")
    public ResponseEntity<Void> delete(@PathVariable String name) {
        categoryService.delete(name);
        return ResponseEntity.noContent().build();
    }
}
