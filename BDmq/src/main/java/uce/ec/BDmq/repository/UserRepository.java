package uce.ec.BDmq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uce.ec.BDmq.state.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    User findByuser(String user);
}
