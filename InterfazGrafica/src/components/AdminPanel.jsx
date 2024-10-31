import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { listProducts, deleteProduct, updateProduct, visibleProduct} from '../services/ProductServices';
import { listCategories, deleteCategory } from '../services/CategoryServices';

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productsResponse = await listProducts();
        const categoriesResponse = await listCategories();
        setProducts(productsResponse.data);
        setCategories(categoriesResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDeleteProduct = async (id) => {
    try {
      await deleteProduct(id);
      setProducts(products.filter(product => product.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const handleDeleteCategory = async (name) => {
    try {
      await deleteCategory(name);
      setCategories(categories.filter(category => category.name !== name));
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleIncreaseQuantity = async (id, currentQuantity) => {
    try {
      const updatedProduct = { quantity: currentQuantity + 1 };
      await updateProduct(id, updatedProduct);
      setProducts(products.map(product =>
        product.id === id ? { ...product, quantity: currentQuantity + 1 } : product
      ));
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const handleDecreaseQuantity = async (id, currentQuantity) => {
    if (currentQuantity > 0) {
      try {
        const updatedProduct = { quantity: currentQuantity - 1 };
        await updateProduct(id, updatedProduct);
        setProducts(products.map(product =>
          product.id === id ? { ...product, quantity: currentQuantity - 1 } : product
        ));
      } catch (error) {
        console.error('Error updating product quantity:', error);
      }
    }
  };

  const handleCreateProduct = () => {
    navigate('/create-product');
  };

  const handleReplenish = async (id, replenish) => {
    try {
      const updatedProduct = { quantity: replenish };
      await updateProduct(id, updatedProduct);
      setProducts(products.map(product =>
        product.id === id ? { ...product, quantity: replenish } : product
      ));
    } catch (error) {
      console.error('Error updating product quantity:', error);
    }
  };

  const handleToggleActive = async (id, currentStatus) => {
    try {
      const updatedProduct = { visible: !currentStatus }; 
      await visibleProduct(id, updatedProduct);
      setProducts(products.map(product =>
        product.id === id ? { ...product, visible: !currentStatus } : product
      ));
    } catch (error) {
      console.error('Error updating product status:', error);
    }
  };
  

  return (
    <div className="container mt-4">
      <h1>Panel de Administración</h1>
      <button type="button" className="btn btn-secondary btn-sm mb-3" onClick={handleCreateProduct}>Crear Producto</button>

      <h2>Productos</h2>
      <ul className="list-group mb-4">
        {products.map(product => (
          <li key={product.id} className="list-group-item d-flex justify-content-between align-items-center">
            {product.name}
            <div>
            <button
                type="button"
                className={`btn ${product.visible ? 'btn-primary' : 'btn-light'} mx-2`}
                onClick={() => handleToggleActive(product.id, product.visible)}
                style={{ opacity: product.visible ? 1 : 0.5 }}
              >
                {product.visible ? 'Visible' : 'No Visible'}
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={() => handleReplenish(product.id, product.replenish)}
              >
                Rellenar
              </button>
              <button
                type="button"
                className="btn btn-secondary btn-sm mx-1"
                onClick={() => handleDecreaseQuantity(product.id, product.quantity)}
              >
                -
              </button>
              <span>{product.quantity}</span>
              <button
                type="button"
                className="btn btn-secondary btn-sm mx-1"
                onClick={() => handleIncreaseQuantity(product.id, product.quantity)}
              >
                +
              </button>
              <button
                type="button"
                className="btn btn-danger btn-sm mx-2"
                onClick={() => handleDeleteProduct(product.id)}
              >
                Eliminar Producto
              </button>
            </div>
          </li>
        ))}
      </ul>

      <h2>Categorías</h2>
      <ul className="list-group">
        {categories.map(category => (
          <li key={category.name} className="list-group-item d-flex justify-content-between align-items-center">
            {category.name}
            <button
              type="button"
              className="btn btn-danger btn-sm"
              onClick={() => handleDeleteCategory(category.name)}
            >
              Eliminar Categoría
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
