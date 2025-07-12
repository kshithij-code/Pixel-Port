import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Container, Row, Col } from "react-bootstrap";

function SearchResults() {
  const { product } = useParams();
  const [results, setResults] = useState([]);

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

  return (
    <Container className="mt-4">
      <h4 className="mb-4">Searched for "{product}"</h4>

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {results.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default SearchResults;
