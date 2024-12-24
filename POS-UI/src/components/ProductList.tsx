import React, { useEffect, useState } from "react";
import { getProducts } from "../api/productApi.ts";
import "../styles/ProductList.css";
function ProductList() {
  const [products, setProducts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div>
      <h2>Products</h2>
      {error ? (
        <p style={{ color: "red" }}>Error: {error}</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "150px", height: "150px", objectFit: "cover" }} />
              </div>
              <h3>{product.name}</h3>
              <p><strong>Category:</strong> {product.category}</p>
              <p><strong>Price:</strong> ${product.price}</p>
              <p><strong>Description:</strong> {product.description}</p>
              <p><strong>Stock:</strong> {product.stock} in stock</p>
              <p><strong>Created At:</strong> {new Date(product.createdAt).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default ProductList;
