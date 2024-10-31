package uce.ec.BDmq.controller;

import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import uce.ec.BDmq.Interfaces.ControllableName;
import uce.ec.BDmq.services.UserService;
import uce.ec.BDmq.state.User;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserController implements ControllableName<User> {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @Override
    @PostMapping("/save/")
    public ResponseEntity<User> save(@RequestBody User entity) {
        User savedUser = userService.save(entity);
        return ResponseEntity.ok(savedUser);
    }

    @Override
    @GetMapping("/{name}")
    public ResponseEntity<User> findByName(@PathVariable String name) {
        User user = userService.findByName(name);
        return ResponseEntity.ok(user);
    }


    @Override
    @GetMapping("/all")
    public ResponseEntity<List<User>> getAll() {
        List<User> users = userService.findAll();
        if(users.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(users);
    }

    @Override
    @PutMapping("/{name}")
    public ResponseEntity<User> update(@PathVariable String name, @RequestBody User entity) {
        try {
            User updatedUser = userService.update(name, entity);
            return ResponseEntity.ok(updatedUser);
        }catch (EntityNotFoundException e){
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @DeleteMapping("/del/{name}")
    public ResponseEntity<Void> delete(@PathVariable String name) {
        userService.delete(name);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User existingUser = userService.findByName(user.getUser());
        if (existingUser != null && existingUser.getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok(Map.of("success", true));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("success", false));
        }
    }



}
