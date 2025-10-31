import React, { createContext, useState, useContext } from 'react';

// 1. Create the Context object
export const CartContext = createContext();

// 2. Create a custom hook to use the context easily
export const useCart = () => useContext(CartContext);

// 3. Create the Provider component
export const CartProvider = ({ children }) => {
    // Cart is now an array of objects: [{ product, quantity, size }]
    const [cartItems, setCartItems] = useState([]);
    
    // Function to add item (used by QuickViewModal and ProductDetailPage)
    const addItem = (product, quantity, size) => {
        setCartItems(prevItems => {
            const existingItemIndex = prevItems.findIndex(
                item => item.product.id === product.id && item.size === size
            );

            if (existingItemIndex > -1) {
                // Item and size already exist, increase quantity
                const newItems = [...prevItems];
                newItems[existingItemIndex].quantity += quantity;
                return newItems;
            } else {
                // New item, add to cart
                return [...prevItems, { product, quantity, size }];
            }
        });
    };

    // Function to update item quantity (used by CartPage)
    const updateQuantity = (productId, size, newQuantity) => {
        setCartItems(prevItems => prevItems.map(item => {
            if (item.product.id === productId && item.size === size) {
                return { ...item, quantity: newQuantity };
            }
            return item;
        }).filter(item => item.quantity > 0)); // Remove item if quantity drops to 0
    };

    // Function to remove item (used by CartPage)
    const removeItem = (productId, size) => {
        setCartItems(prevItems => 
            prevItems.filter(item => !(item.product.id === productId && item.size === size))
        );
    };

    // Derived state for total items and total price
    const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);
    const cartTotal = cartItems.reduce((total, item) => total + (item.product.price * item.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, cartCount, cartTotal, addItem, updateQuantity, removeItem }}>
            {children}
        </CartContext.Provider>
    );
};