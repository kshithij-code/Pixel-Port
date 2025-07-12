import { useEffect, useState } from "react";
import axios from "axios";
import AddToCartControls from "./AddToCartControls";
import { Card, Container, Accordion, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart } = useCart();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <h3>Your Cart</h3>
      {products.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <Accordion defaultActiveKey="0" className="mb-4">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Cart Items</Accordion.Header>
              <Accordion.Body>
                {products.map((product) => (
                  <Card key={product.id} className="flex-row mb-3">
                    <Card.Img
                      variant="left"
                      src={product.thumbnail || product.images?.[0]}
                      style={{ width: "200px", objectFit: "cover" }}
                    />
                    <Card.Body>
                      <Card.Title>{product.title}</Card.Title>
                      <Card.Text>
                        <strong>Price:</strong> ${product.price} <br />
                        <strong>Quantity:</strong> {product.quantity} <br />
                        <strong>Brand:</strong> {product.brand} <br />
                      </Card.Text>
                      <AddToCartControls productId={product.id} />
                    </Card.Body>
                  </Card>
                ))}
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
          <h5 className="text-end">Total: ${getTotal()}</h5>
          <div className="text-end">
            <Link to="/checkout">
              <Button variant="success">Proceed to Checkout</Button>
            </Link>
          </div>
        </>
      )}
    </Container>
  );
}

export default Cart;
