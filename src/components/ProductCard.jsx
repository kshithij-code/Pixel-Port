import Card from "react-bootstrap/Card";
import Badge from "react-bootstrap/Badge";
import { FaStar } from "react-icons/fa";
import "./ProductCard.css";

function ProductCard({ product }) {
  const {
    title,
    brand,
    price,
    discountPercentage,
    rating,
    availabilityStatus,
    thumbnail,
  } = product;

  return (
    <Card className="mb-3 shadow-sm w-100" style={{ maxWidth: "18rem" }}>
      <Card.Img
        variant="top"
        src={thumbnail}
        alt={title}
        style={{ height: "180px", objectFit: "contain" }}
      />
      <Card.Body>
        <Card.Title className="fs-6">{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted small">
          Brand: {brand}
        </Card.Subtitle>

        <div className="mb-2">
          <Badge bg="success">${price.toFixed(2)}</Badge>{" "}
          {discountPercentage > 0 && (
            <Badge bg="danger">{discountPercentage}% OFF</Badge>
          )}
        </div>

        <div className="mb-2">
          <FaStar className="text-warning" /> {rating.toFixed(1)}
        </div>

        <div className="small">
          <Badge bg={availabilityStatus === "In Stock" ? "info" : "secondary"}>
            {availabilityStatus}
          </Badge>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
