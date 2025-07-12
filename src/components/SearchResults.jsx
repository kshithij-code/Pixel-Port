import { useEffect, useState } from "react";
import { FaFilter } from "react-icons/fa";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "./ProductCard";
import { Container, Row, Col, Spinner } from "react-bootstrap";

function SearchResults() {
  const { product } = useParams();
  const [results, setResults] = useState([]);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [minRating, setMinRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/search?q=${product}`
        );
        setResults(response.data.products);
        const max = Math.max(...response.data.products.map((p) => p.price));
        setMaxPrice(max);
        setLoading(false);
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

  if (loading) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="mb-0">Searched for "{product}"</h4>
        <div>
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
          >
            <FaFilter className="me-1" /> Filter
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="mb-3" id="filterOptions">
          <div className="card card-body">
            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="priceRange" className="form-label">
                  Max Price
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max={Math.max(...results.map((p) => p.price), 1000)}
                  id="priceRange"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <div>Up to ₹{maxPrice}</div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="ratingRange" className="form-label">
                  Minimum Rating
                </label>
                <input
                  type="range"
                  className="form-range"
                  min="0"
                  max="5"
                  step="0.1"
                  id="ratingRange"
                  value={minRating}
                  onChange={(e) => setMinRating(Number(e.target.value))}
                />
                <div>{minRating}+ stars</div>
              </div>
            </div>
          </div>
        </div>
      )}

      <Row xs={1} sm={2} md={3} lg={4} className="g-4">
        {results
          .filter((p) => p.price <= maxPrice && p.rating >= minRating)
          .map((product) => (
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
