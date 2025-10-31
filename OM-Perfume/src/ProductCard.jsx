import React from 'react';
import { Link } from 'react-router-dom'; // <-- Used for linking the product name

// Star component for displaying ratings (Helper function)
const RatingStars = ({ rating }) => {
    const stars = Array(5).fill(0).map((_, index) => (
        <span 
            key={index} 
            className="star" 
            style={{ color: index < rating ? '#FFC107' : '#E0E0E0' }}
        >
            ★
        </span>
    ));
    return <div className="rating-stars">{stars}</div>;
};

// CRITICAL: Export the helper component so other files (like CartPage) can use it
export { RatingStars }; 

function ProductCard({ scent, onQuickView }) {
  const { id, name, price, rating, imageUrl, isNew, isSale } = scent; 

  return (
    <div className="product-card">
      {/* Product Image and Badges */}
      <div className="product-image-wrapper">
        <img 
          src={imageUrl} 
          alt={name} 
          className="product-image"
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/300x400/CCCCCC/000000?text=Scent+Bottle"; 
          }}
        />
        {(isNew || isSale) && (
          <div className="badges">
            {isNew && <span className="badge new-badge">NEW</span>}
            {isSale && <span className="badge sale-badge">SALE</span>}
          </div>
        )}
      </div>

      {/* Product Details */}
      <RatingStars rating={rating} />
      
      {/* Link to Product Detail Page */}
      <Link to={`/scents/${id}`} className="product-name-link">
          <h5 className="product-name">{name}</h5>
      </Link>

      <p className="product-price">${price.toFixed(2)}</p>
      
      <button 
        className="quick-buy-button" 
        onClick={() => onQuickView(scent)} // Opens the modal
      >
        Quick View
      </button>
    </div>
  );
}

export default ProductCard;