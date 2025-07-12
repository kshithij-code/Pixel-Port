import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import TestProductCard from "./TestProductCard";
import ProductCard from "./ProductCard";

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
    console.log(results);
  }, [product]);

  return (
    <div>
      <h4>Searched for "{product}"</h4>
      {results.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

export default SearchResults;
