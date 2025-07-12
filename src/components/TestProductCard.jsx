import ProductCard from "./ProductCard";

const dummyProduct = {
  id: 101,
  title: "Apple AirPods Max Silver",
  brand: "Apple",
  price: 549.99,
  discountPercentage: 13.67,
  rating: 3.47,
  availabilityStatus: "In Stock",
  thumbnail:
    "https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp",
};

function TestProductCard() {
  return (
    <div style={{ padding: "2rem" }}>
      <ProductCard product={dummyProduct} />
    </div>
  );
}

export default TestProductCard;
