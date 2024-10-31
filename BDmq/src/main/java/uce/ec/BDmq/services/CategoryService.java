package uce.ec.BDmq.services;

import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uce.ec.BDmq.Interfaces.ServiceableName;
import uce.ec.BDmq.repository.CategoryRepository;
import uce.ec.BDmq.state.Category;

import java.util.List;

@Service
public class CategoryService implements ServiceableName<Category> {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }


    @Override
    @Transactional
    public Category findByName(String name) {
        return categoryRepository.findByName(name);
    }

    @Override
    @Transactional
    public List<Category> findAll() {
        return categoryRepository.findAll();
    }

    @Transactional
    public Category findOrCreateCategory(String name) {
        Category category = findByName(name);
        if (category == null) {
            category = new Category();
            category.setName(name);
            category = save(category);
        }
        return category;
    }


    @Override
    @Transactional
    public Category save(Category category) {
        if(category.getName()!=null){
            return categoryRepository.save(category);
        }
        return null;
    }

    @Override
    @Transactional
    public void delete(String name) {
        categoryRepository.delete(categoryRepository.findByName(name));
    }

    @Override
    @Transactional
    public Category update(String name, Category category) {
        Category existing = categoryRepository.findByName(name);

        existing.setName(category.getName());

        return categoryRepository.save(existing);
    }
}
