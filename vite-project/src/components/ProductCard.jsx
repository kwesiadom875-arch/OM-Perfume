import React, { useState } from 'react';
import { Link } from 'react-router-dom';

// Define the component, accepting props (now including discount and an optional background color)
function ProductCard({ imageUrl, brand, name, price, productUrl, oldPrice, visualBgColor }) {
  const defaultImageUrl = "https://placehold.co/400x500/F5F5F5/1A1A1A?text=Perfume";
  const defaultUrl = "#";
  const availableSizes = ['50ML', '100ML', '200ML']; // Example sizes
  
  // Local State: Manage size selection for this specific card
  const [selectedSize, setSelectedSize] = useState(availableSizes[0]); 

  const handleOrderNow = (e) => {
      // In a real app, this would trigger cart addition with the selected size/product.
      e.preventDefault(); 
      e.stopPropagation(); // Prevent the card link overlay from firing
      alert(`Ordering ${name} in size ${selectedSize} (Implementation Pending!)`);
  };

  return (
    <div className="product-card new-drink-style">
      
      {/* 1. Top Section (Image/Color Block) */}
      <div className="card-top-visual" style={{ backgroundColor: visualBgColor || '#444' }}>
          
          {/* Background Shape (Circle/Arc) - Styling handled by CSS/Pseudo-elements */}
          <div className="card-bg-shape"></div>
          
          {/* Product Image */}
          <div className="product-image-wrapper">
              <img src={imageUrl || defaultImageUrl} alt={`${brand || 'Perfume'} ${name || ''} Bottle`} />
          </div>
      </div>

      {/* 2. Bottom Section (Details/Actions) */}
      <div className="product-details-content">
          <div className="product-text-details">
              <h4 className="card-name">{name || 'Perfume Name'} ({brand || 'Brand'})</h4> 
              <p className="card-description">Lorem ipsum dolor sit amet consectetur, adipiscing elit. Ac purus eget cursus leo tempus.</p>
          </div>

          {/* Size Selection */}
          <div className="card-size-selector">
              <span className="size-label">Size:</span>
              {availableSizes.map(size => (
                  <button 
                      key={size}
                      className={`size-btn ${selectedSize === size ? 'active' : ''}`}
                      onClick={() => setSelectedSize(size)}
                      type="button"
                  >
                      {size}
                  </button>
              ))}
          </div>
          
          {/* Price and Action Bar */}
          <div className="product-footer-bar">
              <div className="price-group">
                  <span className="card-price">{price || '$XX.XX'}</span>
                  {oldPrice && <span className="card-old-price">{oldPrice}</span>}
              </div>
              
              <button 
                  onClick={handleOrderNow} 
                  className="btn btn-dark btn-order-now"
                  type="button"
              >
                  Order Now
              </button>
          </div>
      </div>
      
      {/* Clickable Area to Detail Page */}
      <Link to={productUrl || defaultUrl} className="product-card-link-overlay" title={`View ${name}`}></Link>
    </div>
  );
}

export default ProductCard;