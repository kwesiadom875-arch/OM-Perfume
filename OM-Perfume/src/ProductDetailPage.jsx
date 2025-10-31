import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS_MOCK } from './data';
import { RatingStars } from './ProductCard'; // Reusing the star component

function ProductDetailPage({ onAddToCart }) {
    const { id } = useParams(); // Get the ID from the URL parameter

    // Find the product data using the ID (converting string ID from URL to number)
    const product = PRODUCTS_MOCK.find(p => p.id === parseInt(id));

    if (!product) {
        return <div className="product-detail-container not-found">
            <h1>404</h1>
            <p>Scent Not Found. <Link to="/scents">Browse all perfumes</Link>.</p>
        </div>;
    }

    // Handlers for quick actions
    const [selectedSize, setSelectedSize] = React.useState('50ml');
    const [quantity, setQuantity] = React.useState(1);

    const handleAdd = () => {
        onAddToCart(product, quantity, selectedSize);
    };

    return (
        <div className="product-detail-container">
            <div className="detail-grid">
                
                {/* Image Column */}
                <div className="detail-image-col">
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        className="detail-product-image"
                        onError={(e) => {
                            e.target.onerror = null; 
                            e.target.src = "https://placehold.co/500x600/CCCCCC/000000?text=Product+Details"; 
                        }}
                    />
                </div>
                
                {/* Details Column */}
                <div className="detail-details-col">
                    <p className="detail-category-link">Brand: {product.brand} | {product.category}</p>
                    <h1 className="detail-product-name">{product.name}</h1>
                    <RatingStars rating={product.rating} />
                    
                    <p className="detail-price">${product.price.toFixed(2)}</p>

                    <p className="detail-description">
                        This luxurious scent features key notes of: **{product.notes}**. A deeply layered fragrance that evolves throughout the day, providing an unforgettable presence.
                    </p>

                    {/* Size Selector */}
                    <div className="detail-option-selector">
                        <label>Size:</label>
                        <select 
                            value={selectedSize} 
                            onChange={(e) => setSelectedSize(e.target.value)}
                            className="detail-size-select"
                        >
                            <option value="30ml">30ml ($10 less)</option>
                            <option value="50ml">50ml (Standard)</option>
                            <option value="100ml">100ml ($50 more)</option>
                        </select>
                    </div>

                    {/* Actions */}
                    <div className="detail-actions">
                        <input 
                            type="number" 
                            min="1" 
                            value={quantity} 
                            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value)))}
                            className="detail-quantity-input"
                        />
                        <button className="detail-add-to-cart-btn" onClick={handleAdd}>
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage;