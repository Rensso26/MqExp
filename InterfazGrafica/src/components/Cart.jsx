import React, { useState, useContext, useEffect } from 'react';
import ProductCatalog from './ProductCatalog';
import { listCategories } from '../services/CategoryServices';
import { ProductContext } from '../context/ProductContext';
import PayService from '../services/Pay';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'animate.css';
import './Cart.css';
import { Container, Button, ListGroup, Modal, Image } from 'react-bootstrap';

const Cart = () => {
  const { setSelectedProducts } = useContext(ProductContext);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pendingAmount, setPendingAmount] = useState(0);
  const [isAwaitingPayment, setIsAwaitingPayment] = useState(false);
  const [paymentPanelVisible, setPaymentPanelVisible] = useState(false);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  useEffect(() => {
    listCategories()
      .then((response) => {
        const apiCategories = response.data
          .map(category => ({
            name: category.name,
            products: category.products.map(product => ({
              id: product.id,
              name: product.name,
              description: product.description,
              price: product.price,
              quantity: product.quantity,
              visible: product.visible,
              image: product.image,
              size: product.size,
              calories: product.calories
            }))
          }))
          .filter(category => category.products.some(product => product.quantity > 0));

        setCategories(apiCategories);
        if (apiCategories.length > 0) {
          setSelectedCategory(apiCategories[0].name);
        }
      })
      .catch(error => {
        console.error("API error:", error);
      });
  }, []);

  const handleAddProduct = (product) => {
    setSelectedProducts([{ ...product, cartQuantity: 1 }]);
    setSelectedProduct(product);
    setShowPurchaseModal(true);
  };

  const handlePurchase = async (paymentMethod) => {
    if (paymentMethod === 'efectivo') {
      const totalAmount = selectedProduct.price * 100; 
      setPendingAmount(totalAmount);
      setIsAwaitingPayment(true);
      setShowPurchaseModal(false);
      setPaymentPanelVisible(true);

      try {
        await PayService.handlePurchase(selectedProduct, paymentMethod, updatePendingAmount);
      } catch (error) {
        console.error("Error al manejar la compra:", error);
        resetPaymentState();
      }
    } else {
      resetPurchase(); 
    }
  };

  const resetPaymentState = () => {
    setIsAwaitingPayment(false);
    setPaymentPanelVisible(false);
    setPendingAmount(0);
  };

  const resetPurchase = () => {
    setShowPurchaseModal(false);
    setSelectedProduct(null);
    setSelectedProducts([]);
  };

  const updatePendingAmount = (amountReceived) => {
    console.log("Monto recibido:", amountReceived); 
    setPendingAmount((prevAmount) => Math.max(0, prevAmount - amountReceived));

    if (pendingAmount - amountReceived <= 0) {
        setIsAwaitingPayment(false);
        setPaymentPanelVisible(false);
        setShowThankYouMessage(true);

        setTimeout(() => {
            setShowThankYouMessage(false);
        }, 3000);
    }
  };

  const handleCloseAwaitingPayment = () => {
    resetPaymentState();
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(categoryName);
    document.getElementById(categoryName).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    
    <div className="Cart">
      <Container>
        <div className="row">
          <div className="col-md-3" style={{ position: 'relative' }}>
            <div style={{ position: 'sticky', top: '0', height: '100vh', overflowY: 'auto' }}>
              <ListGroup className="list-group-flush">
                {categories.map(category => (
                  <ListGroup.Item
                    key={category.name}
                    action
                    onClick={() => handleCategoryClick(category.name)}
                    className={`category-button p-4 ${category.name === selectedCategory ? 'selected-category' : ''}`}
                    style={{ fontSize: '18px' }}
                  >
                    {category.name}
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </div>
          </div>
          <div className="col-md-9">
            {categories.map(category => (
              <div key={category.name} id={category.name} className="mb-4">
                <ProductCatalog products={category.products} onAddProduct={handleAddProduct} />
              </div>
            ))}
          </div>
        </div>

        <Modal 
          show={showPurchaseModal} 
          onHide={() => setShowPurchaseModal(false)} 
          centered 
          dialogClassName="custom-modal"
        >
          <Modal.Body className="text-center p-0" style={{ position: 'relative' }}>
            <Button
              variant="link"
              onClick={() => setShowPurchaseModal(false)}
              style={{
                position: 'absolute',
                top: '-50px',
                right: '10px',
                fontSize: '40px',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              &times;
            </Button>
            {selectedProduct && (
              <>
                <Image 
                  src={`http://localhost:8080/assets/images/${selectedProduct.image}.png`} 
                  alt={selectedProduct.name} 
                  fluid 
                  style={{ maxHeight: '300px', objectFit: 'contain' }}
                />
                <p></p>
                <h5>{selectedProduct.description}</h5>
                <h5>{selectedProduct.calories} kcal</h5>
                <h5>{selectedProduct.size}</h5>
                <h5>${selectedProduct.price.toFixed(2)}</h5>
              </>
            )}
            <Button variant="dark" onClick={() => handlePurchase('tarjeta')} className="m-2">
              Pagar con Tarjeta
            </Button>
            <Button variant="dark" onClick={() => handlePurchase('efectivo')} className="m-2">
              Pagar con Efectivo
            </Button>
          </Modal.Body>
        </Modal>

        {isAwaitingPayment && (
          <div className="waiting-payment-screen text-center">
            <Button
              variant="link"
              onClick={handleCloseAwaitingPayment}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                fontSize: '30px',
                color: 'white',
                textDecoration: 'none'
              }}
            >
              &times;
            </Button>
            <h2>Esperando pago</h2>
            <p>Total pendiente: ${(pendingAmount / 100).toFixed(2)}</p>
          </div>
        )}

        {paymentPanelVisible && (
          <div className="payment-panel text-center">
            <h3>Total a Pagar: ${(pendingAmount / 100).toFixed(2)}</h3>
          </div>
        )}

          {showThankYouMessage && (
            <div className="thank-you-message-overlay">
              <div className="thank-you-message text-center">
                <h2>Gracias por su compra</h2>
              </div>
            </div>
          )}
      </Container>
    </div>
  );
};

export default Cart;
