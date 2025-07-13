import React from "react";
import { Container, Button } from "react-bootstrap";

function Banner() {
  return (
    <div
      className="banner text-white d-flex align-items-center w-100 m-0 p-0"
      style={{
        width: "100%",
        backgroundImage:
          "url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "60vh",
      }}
    >
      <Container className="text-center">
        <h1 className="display-4 fw-bold">Welcome to Pixel Port</h1>
        <p className="lead">
          Discover the best tech products at unbeatable prices.
        </p>
        <Button variant="light" size="lg">
          Shop Now
        </Button>
      </Container>
    </div>
  );
}

export default Banner;
