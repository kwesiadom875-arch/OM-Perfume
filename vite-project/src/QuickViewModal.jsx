import React from 'react';
// Import RatingStars from ProductCard.jsx
import { RatingStars } from './ProductCard.jsx'; 

function QuickViewModal({ product, onClose, onAddToCart }) {
    if (!product) return null; 

    const { name, price, rating, imageUrl, category } = product;
    
    // Simulate product options (sizes/volumes)
    const sizes = ['30ml', '50ml', '100ml'];
    const [selectedSize, setSelectedSize] = React.useState(sizes[1]);
    const [quantity, setQuantity] = React.useState(1);

    // This handler calls the function passed from App.jsx 
    // which handles the context update AND the notification.
    const handleAdd = () => {
        onAddToCart(product, quantity, selectedSize); 
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-button" onClick={onClose}>&times;</button>
                
                <div className="modal-body">
                    <div className="modal-image-col">
                        <img 
                            src={imageUrl} 
                            alt={name} 
                            className="modal-product-image"
                            onError={(e) => {
                                e.target.onerror = null; 
                                e.target.src = "https://placehold.co/400x500/CCCCCC/000000?text=Scent+Details"; 
                                e.target.style.borderRadius = '8px';
                            }}
                        />
                    </div>
                    
                    <div className="modal-details-col">
                        <p className="modal-category">{category}</p>
                        <h3 className="modal-product-name">{name}</h3>
                        <RatingStars rating={rating} />
                        <p className="modal-price">${price.toFixed(2)}</p>
                        
                        <p className="modal-description">
                            A highly concentrated blend, perfect for evening wear. This {category} features deep oriental woods, rich vanilla, and a hint of smoky spice.
                        </p>
                        
                        {/* Size Selector */}
                        <div className="option-selector">
                            <label>Size:</label>
                            <select 
                                value={selectedSize} 
                                onChange={(e) => setSelectedSize(e.target.value)}
                                className="size-select"
                            >
                                {sizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>

                        {/* Quantity and Add to Cart */}
                        <div className="modal-actions">
                            <input 
                                type="number" 
                                min="1" 
                                value={quantity} 
                                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                                className="quantity-input"
                            />
                            <button className="add-to-cart-lg" onClick={handleAdd}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default QuickViewModal;