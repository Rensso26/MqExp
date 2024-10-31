package uce.ec.BDmq.Interfaces;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

public interface ControllableId<T> {

    @PostMapping
    ResponseEntity<T> save(@RequestBody T entity);

    @GetMapping("/{id}")
    ResponseEntity<T> findById(@PathVariable int id);

    @GetMapping("/all")
    ResponseEntity<List<T>> getAll();

    @PutMapping("/{id}")
    ResponseEntity<T> update(@PathVariable int id, @RequestBody T entity);

    @DeleteMapping("/{id}")
    ResponseEntity<Void> delete(@PathVariable int id);
}
