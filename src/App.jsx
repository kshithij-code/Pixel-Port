import {
  Container,
  Nav,
  Navbar,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import {
  NavLink,
  Route,
  Routes,
  useNavigate,
  useLocation,
} from "react-router-dom";
import { useState } from "react";
import { FaShoppingCart, FaSun, FaMoon } from "react-icons/fa";
import Cart from "./components/Cart";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults";
import ProductDetails from "./components/ProductDetails";
import CheckoutPage from "./components/CheckoutPage";
import { useCart } from "./context/CartContext";
import { useTheme } from "./context/ThemeContext";

function App() {
  const location = useLocation();
  const isFullWidthPage = location.pathname === "/";
  const { darkMode, toggleTheme } = useTheme();
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
      <Navbar
        bg={darkMode ? "light" : "primary"}
        variant={darkMode ? "light" : "primary"}
        className="px-3"
      >
        <Navbar.Brand
          className={darkMode ? "text-dark" : "text-light"}
          as={NavLink}
          to="/"
        >
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
            <Nav.Link className={darkMode ? "text-dark" : "text-light"}>
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
              onClick={toggleTheme}
              variant={darkMode ? "outline-dark" : "outline-light"}
              className="ms-3 d-flex align-items-center"
            >
              {darkMode ? (
                <FaMoon className="ms-1" />
              ) : (
                <FaSun className="me-1" />
              )}
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      {isFullWidthPage ? (
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      ) : (
        <Container className="mt-4">
          <Routes>
            <Route path="/cart" element={<Cart />} />
            <Route path="/search/:product" element={<SearchResults />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </Container>
      )}
    </div>
  );
}

export default App;
