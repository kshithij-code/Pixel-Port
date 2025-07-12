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
import Cart from "./components/Cart";
import Home from "./components/Home";
import SearchResults from "./components/SearchResults"; // new page
import ProductDetails from "./components/ProductDetails";

function App() {
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
      <Navbar bg="primary" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand as={NavLink} to="/">
            MyApp
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

            <Nav className="ms-auto">
              <Nav.Link as={NavLink} to="/" end>
                Home
              </Nav.Link>
              <Nav.Link as={NavLink} to="/cart" end>
                Cart
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search/:product" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductDetails />} />
        </Routes>
      </Container>
    </div>
  );
}

export default App;
