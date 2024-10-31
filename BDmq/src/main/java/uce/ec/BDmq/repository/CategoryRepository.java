package uce.ec.BDmq.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import uce.ec.BDmq.state.Category;

@Repository
public interface CategoryRepository extends JpaRepository<Category, String> {
    Category findByName(String name);
}
