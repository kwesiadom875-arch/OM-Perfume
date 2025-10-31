import React from 'react';
import { CATEGORIES } from './data'; // Import data

function ProductCategories({ activeCategory, onCategoryChange }) {
  
  const getIsActive = (categoryName) => {
    if (categoryName === "All Scents" && activeCategory === null) {
      return true;
    }
    return categoryName === activeCategory;
  };

  const handleClick = (categoryName) => {
      onCategoryChange(categoryName === "All Scents" ? null : categoryName);
  };

  return (
    <section className="category-section">
      <h2 className="section-title">Shop By Type</h2>
      
      <nav className="category-nav">
        <ul>
          {CATEGORIES.map((category) => (
            <li 
              key={category.id} 
              className={getIsActive(category.name) ? 'active' : ''}
              onClick={() => handleClick(category.name)}
            >
              <a href="#!">{category.name}</a> 
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

export default ProductCategories;