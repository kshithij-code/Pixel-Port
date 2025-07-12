// components/CheckoutPage.jsx
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Card,
  Form,
  Button,
  Spinner,
  Alert,
} from "react-bootstrap";
import { useCart } from "../context/CartContext";

function CheckoutPage() {
  const { cart, dispatch } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [validated, setValidated] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const responses = await Promise.all(
          cart.map((item) =>
            axios.get(`https://dummyjson.com/products/${item.id}`)
          )
        );
        const combined = responses.map((res) => {
          const quantity =
            cart.find((c) => c.id === res.data.id)?.quantity || 0;
          return { ...res.data, quantity };
        });
        setProducts(combined);
      } catch (error) {
        console.error("Failed to fetch cart products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (cart.length > 0) {
      fetchCartProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [cart]);

  const getTotal = () => {
    return products
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    if (form.checkValidity() === false) {
      event.stopPropagation();
    } else {
      dispatch({ type: "CLEAR_CART" });
      setOrderPlaced(true);
      form.reset();
    }
    setValidated(true);
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Checkout</h3>
      {orderPlaced && (
        <Alert variant="success">
          Your order has been placed successfully!
        </Alert>
      )}
      <Row>
        <Col md={6}>
          <h5>Shipping Information</h5>
          <Form
            noValidate
            validated={validated}
            onSubmit={handleSubmit}
            ref={formRef}
          >
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Enter your name"
              />
              <Form.Control.Feedback type="invalid">
                Please provide your name.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control required type="email" placeholder="Enter email" />
              <Form.Control.Feedback type="invalid">
                Please provide a valid email.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control required type="text" placeholder="1234 Main St" />
              <Form.Control.Feedback type="invalid">
                Please provide your address.
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formZip">
              <Form.Label>Zip</Form.Label>
              <Form.Control required type="text" placeholder="Zip Code" />
              <Form.Control.Feedback type="invalid">
                Please provide a zip code.
              </Form.Control.Feedback>
            </Form.Group>

            <Button variant="primary" type="submit">
              Place Order
            </Button>
          </Form>
        </Col>

        <Col md={6}>
          <h5>Order Summary</h5>
          {products.map((product) => (
            <Card key={product.id} className="mb-3">
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>
                  Quantity: {product.quantity} <br />
                  Price per unit: ${product.price} <br />
                  Subtotal: ${(product.price * product.quantity).toFixed(2)}
                </Card.Text>
              </Card.Body>
            </Card>
          ))}
          <h5 className="text-end">Total: ${getTotal()}</h5>
        </Col>
      </Row>
    </Container>
  );
}

export default CheckoutPage;
