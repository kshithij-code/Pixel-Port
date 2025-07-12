import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { NavLink, Route, Routes, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import Cart from "./components/Cart";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults"; // new page
import ProductDetails from "./components/ProductDetails";
import CheckoutPage from "./components/CheckoutPage";
import { useCart } from "./context/CartContext";

function App() {
  const { cart } = useCart();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmed = search.trim();
    if (trimmed) {
      navigate(`/search/${encodeURIComponent(trimmed)}`);
      setSearch("");
    }
  };

  return (
    <div>
      <Navbar bg="primary" variant="dark" expand="lg" className="px-3">
        <Navbar.Brand as={NavLink} to="/">
          Pixel Port
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex me-auto" onSubmit={handleSearch}>
            <FormControl
              type="search"
              placeholder="Search products"
              className="me-2"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Button variant="light" type="submit">
              Search
            </Button>
          </Form>

          <Nav className="ms-auto align-items-center">
            <Nav.Link as={NavLink} to="/" end>
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/cart" end className="position-relative">
              <FaShoppingCart size={20} />
              {cart.length > 0 && (
                <span
                  className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                  style={{ fontSize: "0.6rem" }}
                >
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </Nav.Link>
            <Button
              variant="outline-light"
              className="ms-3 d-flex align-items-center"
            >
              <FaSun className="me-1" /> / <FaMoon className="ms-1" />
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search/:product" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
