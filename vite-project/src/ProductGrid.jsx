import React from 'react';
import ProductCard from './ProductCard.jsx';
import { PRODUCTS_MOCK } from './data'; // Import data

function ProductGrid({ activeCategory, onQuickView }) {
  
  // Filtering logic based on the active category state passed from App.jsx
  const filteredProducts = PRODUCTS_MOCK.filter(product => {
    if (!activeCategory) {
      return true;
    }
    return product.category === activeCategory;
  });

  return (
    <section className="product-grid-section">
      <div className="product-grid">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} scent={product} onQuickView={onQuickView} />
        ))}
      </div>

      <button className="all-products-button">
        View All Products ({filteredProducts.length} Items)
      </button>
    </section>
  );
}

export default ProductGrid;