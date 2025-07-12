import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Container, Row, Col } from "react-bootstrap";

function SearchResults() {
  const { product } = useParams();
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${product}`
        );
        setResults(response.data.products);
      } catch (error) {
        console.error("Failed to fetch search results:", error);
        setResults([]);
      }
    };
    fetchSearchResults();
  }, [product]);

  const handleCardClick = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Searched for "{product}"</h4>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {results.map((product) => (
          <Col
            key={product.id}
            onClick={() => handleCardClick(product.id)}
            style={{ cursor: "pointer" }}
          >
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchResults;
