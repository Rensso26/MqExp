package uce.ec.BDmq.services;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import uce.ec.BDmq.Interfaces.ServiceableName;
import uce.ec.BDmq.repository.UserRepository;
import uce.ec.BDmq.state.User;

import java.util.List;

@Service
public class UserService implements ServiceableName<User> {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    @Transactional
    public User findByName(String name) {
        return userRepository.findByuser(name);
    }

    @Override
    @Transactional
    public List<User> findAll() {
        return userRepository.findAll();
    }

    @Override
    @Transactional
    public User save(User user) {
        return userRepository.save(user);
    }

    @Override
    @Transactional
    public void delete(String name) {
        userRepository.delete(userRepository.findByuser(name));
    }

    @Override
    @Transactional
    public User update(String name, User user) {
        User existingUser = findByName(name);
        existingUser.setUser(user.getUser());
        existingUser.setPassword(user.getPassword());
        return userRepository.save(existingUser);
    }
}
