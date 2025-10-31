import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from './CartContext.jsx'; // CRITICAL IMPORT
import { RatingStars } from './ProductCard.jsx'; // CRITICAL IMPORT

function CartPage() {
    // Read state and actions from Cart Context
    const { cartItems, cartTotal, updateQuantity, removeItem } = useCart();
    
    // Calculate subtotal, shipping (mock), and tax
    const shipping = cartItems.length > 0 ? 15.00 : 0;
    const taxRate = 0.08;
    const tax = cartTotal * taxRate;
    const finalTotal = cartTotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="cart-page-container empty-cart">
                <h1>Your Cart is Empty</h1>
                <p>Looks like you haven't found your signature scent yet.</p>
                <Link to="/scents" className="back-to-shop-btn">
                    Start Shopping Now
                </Link>
            </div>
        );
    }

    return (
        <div className="cart-page-container">
            <h1>Your Shopping Cart ({cartItems.length} Items)</h1>
            
            <div className="cart-content-grid">
                
                {/* Left Column: Item List */}
                <div className="cart-items-list">
                    {cartItems.map(item => (
                        <div key={`${item.product.id}-${item.size}`} className="cart-item-row">
                            
                            <img 
                                src={item.product.imageUrl} 
                                alt={item.product.name} 
                                className="cart-item-image"
                            />

                            <div className="cart-item-details">
                                <Link to={`/scents/${item.product.id}`}>
                                    <h2 className="cart-item-name">{item.product.name} ({item.size})</h2>
                                </Link>
                                <p className="cart-item-brand">{item.product.brand}</p>
                                <RatingStars rating={item.product.rating} />
                                <button 
                                    className="remove-item-btn" 
                                    onClick={() => removeItem(item.product.id, item.size)}
                                >
                                    Remove
                                </button>
                            </div>
                            
                            <div className="cart-item-controls">
                                <input 
                                    type="number" 
                                    min="1" 
                                    value={item.quantity}
                                    onChange={(e) => updateQuantity(item.product.id, item.size, parseInt(e.target.value) || 1)}
                                    className="cart-quantity-input"
                                />
                                <p className="cart-item-price">${(item.product.price * item.quantity).toFixed(2)}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Column: Summary */}
                <div className="cart-summary-box">
                    <h2>Order Summary</h2>
                    <div className="summary-line">
                        <span>Subtotal:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-line">
                        <span>Estimated Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-line">
                        <span>Estimated Tax (8%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-total-line">
                        <h3>Order Total:</h3>
                        <h3>${finalTotal.toFixed(2)}</h3>
                    </div>
                    
                    <Link to="/checkout" className="checkout-btn">
                        Proceed to Checkout
                    </Link>
                    <Link to="/scents" className="continue-shopping-link">
                        ← Continue Shopping
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default CartPage;