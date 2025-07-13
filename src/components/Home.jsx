import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import Banner from "./Banner";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Home() {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await axios.get(
          "https://dummyjson.com/products/category-list"
        );
        const selectedCategories = catRes.data.slice(0, 3); // Pick top 3 categories for now
        setCategories(selectedCategories);

        const productData = {};
        for (const category of selectedCategories) {
          const prodRes = await axios.get(
            `https://dummyjson.com/products/category/${category}`
          );
          productData[category] = prodRes.data.products.slice(0, 4);
        }

        setCategoryProducts(productData);
      } catch (error) {
        console.error("Error fetching category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Banner />
      <Container className="my-5">
        <h2 className="mb-4">Shop by Category</h2>
        {loading ? (
          <div className="text-center">
            <Spinner animation="border" variant="primary" />
          </div>
        ) : (
          categories.map((category) => (
            <div key={category} className="mb-5">
              <h4 className="text-capitalize mb-3">{category}</h4>
              <Row>
                {categoryProducts[category]?.map((product) => (
                  <Col key={product.id} sm={6} md={4} lg={3} className="mb-4">
                    <Card
                      onClick={() => navigate(`/product/${product.id}`)}
                      style={{ cursor: "pointer" }}
                    >
                      <Card.Img
                        variant="top"
                        src={product.thumbnail}
                        alt={product.title}
                        style={{ height: "200px", objectFit: "cover" }}
                      />
                      <Card.Body>
                        <Card.Title>{product.title}</Card.Title>
                        <Card.Text>${product.price}</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          ))
        )}
      </Container>
    </>
  );
}

export default Home;
