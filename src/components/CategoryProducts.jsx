import React, { useState, useEffect } from 'react';
import Header from './Header';
import { useParams, useNavigate } from 'react-router-dom';

function CategoryProducts() {
  const { categoryName } = useParams();
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Utilisation de useNavigate pour la navigation

  useEffect(() => {
    async function fetchCategoryProducts() {
      try {
        const response = await fetch(`http://localhost:8000/api/products/category/${categoryName}`);
        if (!response.ok) {
          throw new Error('Failed to fetch category products');
        }
        const data = await response.json();
        setCategoryProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching category products:', error);
        setCategoryProducts([]);
        setLoading(false);
      }
    }

    fetchCategoryProducts();
  }, [categoryName]);

  // Fonction pour gérer le clic sur une carte de produit
const handleProductClick = (product) => {
    // Navigation vers la page de détails du produit avec le pid du produit dans l'URL
    navigate(`/ProductCard/${product.pid}`);
  };

  return (
    <div>
      <Header />
      <div className="d-flex flex-column align-items-center font-a">
        <h1>{categoryName} Products</h1>
        <br />
        <div className="product-container font-c">
          {loading ? (
            <div>Loading...</div>
          ) : categoryProducts.length === 0 ? (
            <div>No products found in the {categoryName} category.</div>
          ) : (
            categoryProducts.map((item) => (
              <div key={item.id} className="product-card" onClick={() => handleProductClick(item)}>
                <img
                  style={{ width: 100, height: 100 }}
                  src={`http://localhost:8000/${item.file_path}`}
                  alt={item.name}
                />
                <h3>{item.name}</h3>
                <p>${item.price}</p>
              </div>
            ))
          )}
        </div>
        <br /> <br />
      </div>
    </div>
  );
}

export default CategoryProducts;
