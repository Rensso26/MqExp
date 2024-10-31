import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import 'animate.css'; 
import './ProductCatalog.css';


const ProductCatalog = ({ products, onAddProduct }) => {
  const [animatingProductId, setAnimatingProductId] = useState(null);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 4
    },
    desktop: {
      breakpoint: { max: 1024, min: 768 },
      items: 3
    },
    tablet: {
      breakpoint: { max: 768, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  const availableProducts = products.filter(product => product.quantity > 0 && product.visible);  
  const handleAddProduct = (product, event) => {
    onAddProduct(product);

    setAnimatingProductId(product.id);
    setTimeout(() => setAnimatingProductId(null), 1000); 
  };

  return (
    <div className="product-catalog">
      <Carousel responsive={responsive}>
        {availableProducts.map((product) => (
          <div key={product.id} className="card product-card" style={{ margin: '10px', border: 'none', position: 'relative', width: '250px' }}> {/* Increase width */}
            <img
              src={`http://localhost:8080/assets/images/${product.image}.png`}
              className={`card-img-top ${animatingProductId === product.id ? 'animate__animated animate__bounce' : ''}`}
              alt={product.name}
              style={{ height: '300px', objectFit: 'cover', cursor: 'pointer' }} // Increased height
              onClick={(e) => handleAddProduct(product, e)}
            />
            <div className="price-bubble">
              <strong>${product.price.toFixed(2)}</strong>
            </div>
            <div className="weight-bubble">
              <strong>{product.size}</strong>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default ProductCatalog;
