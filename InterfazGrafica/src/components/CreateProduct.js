import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createProduct } from '../services/ProductServices';

const CreateProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [calories, setCalories] = useState('');
  const [replenish, setReplenish] = useState(''); // Nuevo estado para replenish
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const imageNameWithoutExtension = file.name.split('.')[0]; 
      setImage(imageNameWithoutExtension); 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('imageFile', selectedImage);

    try {
      await fetch('http://localhost:8080/image/upload', {
        method: 'POST',
        body: formData,
      });

      await createProduct({
        name,
        description,
        price: parseFloat(price),
        quantity: parseInt(quantity, 10),
        replenish: parseInt(replenish, 10), // Incluir replenish al crear el producto
        image,
        size,
        calories: parseFloat(calories),
        category: { name: category },
      });

      navigate('/admin-panel');
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Product Name</label>
          <input 
            type="text" 
            className="form-control" 
            id="name" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea 
            className="form-control" 
            id="description" 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input 
            type="number" 
            className="form-control" 
            id="price" 
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input 
            type="number" 
            className="form-control" 
            id="quantity" 
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="replenish">Replenish</label> {/* Campo Replenish */}
          <input 
            type="number" 
            className="form-control" 
            id="replenish" 
            value={replenish}
            onChange={(e) => setReplenish(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input 
            type="text" 
            className="form-control" 
            id="category" 
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="size">Tamaño</label>
          <textarea 
            className="form-control" 
            id="size" 
            value={size}
            onChange={(e) => setSize(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="calories">Calorías</label>
          <input 
            type="number" 
            className="form-control" 
            id="calories" 
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            required 
          />
        </div>
        <div className="form-group">
          <label htmlFor="image">Imagen del Producto</label>
          <input 
            type="file" 
            className="form-control" 
            id="image" 
            onChange={handleImageChange}
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
