import React, { useState } from 'react';
import { Container, Button, ListGroup, Row, Col, Card, Toast } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const Cart = () => {
  const { cart, removeItem, updateQuantity, getTotal, clearCart } = useCart();
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToastMessage = (message) => {
    setToastMessage(message);
    setShowToast(true);
  };

  const handleCheckout = () => {
    if (!isLoggedIn) {
      showToastMessage('You must be logged in to checkout. Redirecting to login page.');
      navigate('/login');
    } else {
      navigate('/payment');
    }
  };

  return (
    <Container className="py-5">
      <h2>Your Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ListGroup variant="flush">
            {cart.map((item) => (
              <ListGroup.Item key={item.id}>
                <Row className="align-items-center">
                  <Col md={2}>
                    <img src={item.image} alt={item.name} style={{ width: '50px', height: '50px' }} />
                  </Col>
                  <Col md={4}>
                    <h5>{item.name}</h5>
                    <p>₹{item.price}</p>
                  </Col>
                  <Col md={3}>
                    <div className="d-flex align-items-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span className="mx-2">{item.quantity}</span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </Col>
                  <Col md={2}>
                    <p>₹{item.price * item.quantity}</p>
                  </Col>
                  <Col md={1}>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="mt-4">
            <h4>Total: ₹{getTotal()}</h4>
            <Button variant="success" className="me-2" onClick={handleCheckout}>Checkout</Button>
            <Button variant="secondary" onClick={clearCart}>Clear Cart</Button>
          </div>
        </>
      )}
      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={3000}
        autohide
        style={{
          position: 'fixed',
          top: 20,
          right: 20,
          zIndex: 9999,
        }}
      >
        <Toast.Header>
          <strong className="me-auto">Notification</strong>
        </Toast.Header>
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </Container>
  );
};

export default Cart;
