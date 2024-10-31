package uce.ec.BDmq.services;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import uce.ec.BDmq.Interfaces.Serviceable;
import uce.ec.BDmq.repository.ProductRepository;
import uce.ec.BDmq.state.Category;
import uce.ec.BDmq.state.Product;
import java.util.List;

@Service
public class ProductService implements Serviceable<Product> {

    private final ProductRepository productRepository;

    private final CategoryService categoryService;

    public ProductService(ProductRepository productRepository, CategoryService categoryService) {
        this.productRepository = productRepository;
        this.categoryService = categoryService;
    }

    @Override
    public Product findByName(String name) {
        return null;
    }

    public Product findById (Integer id){
        return productRepository.findById(Long.valueOf(id)).orElse(null);
    }

    @Override
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    @Override
    @Transactional
    public Product save(Product product) {
        Category category = categoryService.findOrCreateCategory(product.getCategory().getName());
        product.setCategory(category);
        return productRepository.save(product);
    }

    @Transactional
    public List<Product> findProductByCategory(String categoryName){
        return productRepository.findByCategoryName(categoryName);
    }

    @Override
    public void delete(int id) {
        productRepository.delete(findById(id));
    }

    @Override
    public Product update(String name, Product product) {
        Product existingProduct = findByName(name);
        existingProduct.setName(product.getName());

        return productRepository.save(existingProduct);
    }
}
