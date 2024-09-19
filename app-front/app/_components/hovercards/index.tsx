import React, { useEffect, useState } from 'react';
import './style.scss';

const Products = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <div className="products-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.imageUrl} alt={product.title} />
          <div className="product-info">
            <p className="category">{product.category}</p>
            <h3>{product.title}</h3>
            <a href={product.link} className="shop-now">
              SHOP NOW
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Products;
