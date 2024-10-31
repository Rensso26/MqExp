package uce.ec.BDmq.Interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface ControlleableName<T> {
    @PostMapping
    ResponseEntity<T> save(@RequestBody T entity);

    @GetMapping("/{name}")
    ResponseEntity<T> findByName(@PathVariable String name);

    @GetMapping("/all")
    ResponseEntity<List<T>> getAll();

    @PutMapping
    ResponseEntity<T> update(@PathVariable String name, @RequestBody T entity);

    @DeleteMapping("/{name}")
    ResponseEntity<Void> delete(@PathVariable String name);
}
