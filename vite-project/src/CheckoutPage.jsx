import React, { useState } from 'react';
import { useCart } from './CartContext.jsx';
import { Link } from 'react-router-dom';

function CheckoutPage() {
    const { cartItems, cartTotal, cartCount, removeItem } = useCart();
    
    // Derived Costs
    const shipping = cartCount > 0 ? 15.00 : 0;
    const taxRate = 0.08;
    const tax = cartTotal * taxRate;
    const finalTotal = cartTotal + shipping + tax;

    // Local State for Form Handling
    const [formData, setFormData] = useState({
        name: '', address: '', city: '', zip: '', email: '', paymentMethod: 'card'
    });
    const [isProcessing, setIsProcessing] = useState(false);
    const [isComplete, setIsComplete] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        if (cartItems.length === 0 || isProcessing) return;

        setIsProcessing(true);
        console.log("Placing order for:", formData);
        
        // --- Mock Checkout Process ---
        setTimeout(() => {
            setIsProcessing(false);
            setIsComplete(true);
            
            // In a real app, you would clear the cart here: removeItem(all items)
            
            // Redirect to a success page or clear cart after a moment
        }, 3000);
    };

    if (isComplete) {
        return (
            <div className="checkout-page-container checkout-complete">
                <h1>Order Confirmed! 🎉</h1>
                <p>Thank you for your order. Your **W.M. Scents** will be delivered soon.</p>
                <p>A confirmation email has been sent to **{formData.email}**.</p>
                <Link to="/" className="back-to-home-btn">Return to Homepage</Link>
            </div>
        );
    }
    
    if (cartCount === 0 && !isComplete) {
        return (
            <div className="checkout-page-container checkout-empty">
                <h1>Your Cart is Empty</h1>
                <p>Please add items to your cart before checking out.</p>
                <Link to="/scents" className="back-to-home-btn">Start Shopping</Link>
            </div>
        );
    }

    return (
        <div className="checkout-page-container">
            <h1>Secure Checkout</h1>
            
            <div className="checkout-grid">
                
                {/* Left Column: Form */}
                <div className="checkout-form-column">
                    <h2>Shipping & Payment</h2>
                    <form onSubmit={handlePlaceOrder} className="checkout-form">
                        
                        {/* Shipping Details */}
                        <h3>1. Shipping Information</h3>
                        <input type="text" name="name" placeholder="Full Name" required value={formData.name} onChange={handleChange} />
                        <input type="email" name="email" placeholder="Email Address" required value={formData.email} onChange={handleChange} />
                        <input type="text" name="address" placeholder="Street Address" required value={formData.address} onChange={handleChange} />
                        <div className="address-line-2">
                            <input type="text" name="city" placeholder="City" required value={formData.city} onChange={handleChange} />
                            <input type="text" name="zip" placeholder="Zip Code" required value={formData.zip} onChange={handleChange} />
                        </div>

                        {/* Payment Method (Simplified) */}
                        <h3>2. Payment Method</h3>
                        <div className="payment-options">
                            <label>
                                <input type="radio" name="paymentMethod" value="card" checked={formData.paymentMethod === 'card'} onChange={handleChange} />
                                Credit/Debit Card
                            </label>
                            <label>
                                <input type="radio" name="paymentMethod" value="paypal" checked={formData.paymentMethod === 'paypal'} onChange={handleChange} />
                                PayPal
                            </label>
                        </div>
                        
                        <div className="card-fields">
                            <input type="text" placeholder="Card Number" required />
                            <input type="text" placeholder="Exp Date (MM/YY)" required />
                            <input type="text" placeholder="CVV" required />
                        </div>
                        
                        <button type="submit" className="place-order-btn" disabled={isProcessing}>
                            {isProcessing ? 'Processing Order...' : `Place Order – $${finalTotal.toFixed(2)}`}
                        </button>
                    </form>
                </div>

                {/* Right Column: Order Summary (Re-using Cart Summary logic) */}
                <div className="checkout-summary-box">
                    <h2>Your Order ({cartCount} Items)</h2>
                    
                    {cartItems.map(item => (
                        <div key={`${item.product.id}-${item.size}`} className="checkout-item-line">
                            <span>{item.quantity}x {item.product.name} ({item.size})</span>
                            <span>${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    
                    <div className="summary-line subtotal-line">
                        <span>Subtotal:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                    </div>
                    <div className="summary-line">
                        <span>Shipping:</span>
                        <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="summary-line">
                        <span>Tax (8%):</span>
                        <span>${tax.toFixed(2)}</span>
                    </div>
                    
                    <div className="summary-total-line">
                        <h3>Grand Total:</h3>
                        <h3>${finalTotal.toFixed(2)}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CheckoutPage;