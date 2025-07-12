import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Row,
  Col,
  Image,
  Badge,
  Card,
  Accordion,
  Button,
} from "react-bootstrap";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await axios.get(
          `https://dummyjson.com/products/${id}`
        );
        setProduct(response.data);
        const fallbackImage =
          response.data.images.find((img) => img !== response.data.thumbnail) ||
          "";
        setActiveImage(fallbackImage);
      } catch (err) {
        console.error("Failed to fetch product details:", err);
      }
    };

    fetchDetails();
  }, [id]);

  const renderStars = (rating) => {
    const full = Math.floor(rating);
    const half = rating % 1 >= 0.5;
    const empty = 5 - full - (half ? 1 : 0);

    return (
      <>
        {[...Array(full)].map((_, i) => (
          <FaStar key={`full-${i}`} className="text-warning me-1" />
        ))}
        {half && <FaStarHalfAlt className="text-warning me-1" />}
        {[...Array(empty)].map((_, i) => (
          <FaRegStar key={`empty-${i}`} className="text-warning me-1" />
        ))}
        <span className="text-muted">({rating.toFixed(1)})</span>
      </>
    );
  };

  if (!product) return <Container className="mt-4">Loading...</Container>;

  // Use only non-thumbnail images
  const uniqueImages = product.images.filter(
    (img) => img !== product.thumbnail
  );

  return (
    <Container className="mt-4">
      <Row>
        {/* Left Column: Enlarged Image with Thumbnails */}
        <Col md={5}>
          <div style={{ float: "left" }}>
            <Image
              src={activeImage}
              alt="Main product"
              fluid
              style={{
                maxHeight: "600px",
                objectFit: "contain",
                marginBottom: "1rem",
                borderRadius: "8px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
              }}
            />
            <Row xs={5} className="g-2">
              {uniqueImages.map((img, index) => (
                <Col key={index}>
                  <Image
                    src={img}
                    alt={`thumb-${index}`}
                    thumbnail
                    style={{
                      cursor: "pointer",
                      border:
                        img === activeImage
                          ? "2px solid #007bff"
                          : "1px solid #ddd",
                      height: "70px",
                      objectFit: "contain",
                      padding: "2px",
                    }}
                    onClick={() => setActiveImage(img)}
                  />
                </Col>
              ))}
            </Row>
          </div>
        </Col>

        {/* Right Column: Product Details */}
        <Col md={7}>
          <h2 className="mb-1">{product.title}</h2>
          <p className="text-muted mb-1">
            Brand: <strong>{product.brand}</strong>
          </p>
          <p className="text-muted mb-1">
            Category: <strong>{product.category}</strong>
          </p>
          <div className="mb-2">{renderStars(product.rating)}</div>

          <div className="d-flex justify-content-between align-items-center mb-2">
            <h4 className="mb-0">
              ${product.price.toFixed(2)}{" "}
              <span style={{ color: "green", fontSize: "1rem" }}>
                {product.discountPercentage}% OFF
              </span>
            </h4>
            <Button variant="primary">Add to Cart</Button>
          </div>

          <p className="mb-1">
            <strong>Stock:</strong> {product.stock} units
          </p>
          <p className="mb-1">
            <strong>Availability:</strong>{" "}
            <Badge
              bg={
                product.availabilityStatus === "In Stock"
                  ? "success"
                  : "secondary"
              }
            >
              {product.availabilityStatus}
            </Badge>
          </p>
          <p className="mb-1">
            <strong>SKU:</strong> {product.sku}
          </p>
          <p className="mb-1">
            <strong>Min Order Qty:</strong> {product.minimumOrderQuantity}
          </p>

          <p className="mt-3 mb-1">
            <strong>Tags:</strong>
          </p>
          <div className="mb-3">
            {product.tags.map((tag, idx) => (
              <Badge key={idx} bg="info" className="me-1">
                {tag}
              </Badge>
            ))}
          </div>

          <h5 className="mt-4">Description</h5>
          <p>{product.description}</p>

          <h5 className="mt-4">Shipping Information</h5>
          <p>{product.shippingInformation}</p>

          <h5 className="mt-3">Warranty</h5>
          <p>{product.warrantyInformation}</p>

          <h5 className="mt-3">Return Policy</h5>
          <p>{product.returnPolicy}</p>

          <Card className="p-3 mt-4">
            <h6>Physical Specs</h6>
            <p className="mb-1">
              <strong>Weight:</strong> {product.weight} kg
            </p>
            <p className="mb-1">
              <strong>Dimensions:</strong> {product.dimensions.width}W ×{" "}
              {product.dimensions.height}H x {product.dimensions.depth}D cm
            </p>
            <Image
              src={product.meta.qrCode}
              alt="QR Code"
              style={{ width: "100px", marginTop: "10px" }}
            />
          </Card>
        </Col>
      </Row>

      {/* Reviews */}
      <Row className="mt-5">
        <h4>Customer Reviews</h4>
        {product.reviews.length === 0 && <p>No reviews yet.</p>}
        <Accordion>
          {product.reviews.map((review, index) => (
            <Accordion.Item eventKey={index.toString()} key={index}>
              <Accordion.Header>
                {review.reviewerName} - {renderStars(review.rating)}
              </Accordion.Header>
              <Accordion.Body>
                <p>"{review.comment}"</p>
                <small className="text-muted">
                  {new Date(review.date).toLocaleDateString()}
                </small>
              </Accordion.Body>
            </Accordion.Item>
          ))}
        </Accordion>
      </Row>
    </Container>
  );
}

export default ProductDetails;
