import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard'; // For cross-sell section

// --- Placeholder Product Database (Using Oud Wood as default) ---
const productDatabase = {
  'oud-wood': {
    id: 'oud-wood',
    brand: "TOM FORD",
    name: "Oud Wood - Signature Blend",
    price: "₦29,500", // Example Nigerian Naira or custom currency
    description: "A masterful blend of exotic rose wood and cardamom. Selected for its bold, smoky character, this fragrance offers a luxurious and enduring presence.",
    fullDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    omEdit: "The team at OM perfumery selected Oud Wood for its commanding presence. It's the perfect sophisticated classic for any formal occasion.",
    notes: { top: "Rose Wood, Cardamom, Chinese Pepper", heart: "Oud, Sandalwood, Vetiver", base: "Tonka Bean, Vanilla, Amber" },
    thumbnails: [
      "/images/oud-wood.png",
      "https://placehold.co/600x800/F0F0F0/888?text=Thumb+Box",
      "https://placehold.co/600x800/F0F0F0/888?text=Thumb+Detail",
    ],
    sizes: ["50 ML", "100 ML", "200 ML"]
  },
  'baccarat-rouge': { /* ... other product data ... */ id: 'baccarat-rouge', brand: "MFK", name: "Baccarat Rouge 540", price: "$325.00", description: "An icon of modern perfumery.", omEdit: "Unforgettable signature scent.", notes: { top: "Saffron, Jasmine", heart: "Amberwood, Ambergris", base: "Fir Resin, Cedar" }, imageUrl: "/images/baccarat-rouge.png", thumbnails: ["/images/baccarat-rouge.png", "https://placehold.co/600x800/F0F0F0/888?text=MFK+Box"], sizes: ["70 ML", "200 ML"] }
  /* ... add other products as needed ... */
};
// --- End Placeholder Data ---


function ProductDetailPage() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [activeImage, setActiveImage] = useState('');
  const [activeTab, setActiveTab] = useState('description'); // Default to description
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Data Fetching and State Initialization
  useEffect(() => {
    const fetchedProduct = productDatabase[productId] || productDatabase['oud-wood']; // Fallback to Oud Wood
    if (fetchedProduct) {
      setProduct(fetchedProduct);
      setActiveImage(fetchedProduct.imageUrl);
      if (fetchedProduct.sizes && fetchedProduct.sizes.length > 0) {
        setSelectedSize(fetchedProduct.sizes[0]);
      }
      setQuantity(1);
    } else {
      setProduct(null);
    }
  }, [productId]);

  // Handlers
  const handleThumbnailClick = (imageUrl) => setActiveImage(imageUrl);
  const handleTabClick = (tabId) => setActiveTab(tabId);
  const handleQuantityChange = (e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1));
  const handleAddToCart = () => { /* ... same as before ... */ };

  if (!product) {
    return ( <main style={{ padding: '5rem 1rem', minHeight: '60vh', textAlign: 'center' }}> <h2>Product Not Found</h2> </main> );
  }

  // --- Render the product details ---
  return (
    <main>
        {/* Breadcrumbs (Pedona Style) */}
        <div className="product-breadcrumbs">
            <Link to="/">Home</Link> / <Link to="/shop">Shop</Link> / <span>{product.brand}</span>
        </div>

        {/* 1. Main Product Section (Two-Column Layout) */}
        <div className="product-page-layout pedona-layout">

            {/* Left Column: Image Gallery */}
            <section className="product-gallery pedona-gallery">
                <div className="main-image">
                    <img src={activeImage} alt={`${product.brand} ${product.name} Bottle`} id="main-product-image" />
                </div>
                {/* Thumbnails below main image */}
                <div className="thumbnail-gallery pedona-thumb-gallery">
                    {product.thumbnails.map((thumbUrl, index) => (
                      <img
                        key={index}
                        src={thumbUrl}
                        onClick={() => handleThumbnailClick(thumbUrl)}
                        alt={`${product.name} thumbnail ${index + 1}`}
                        className={`thumbnail-image ${thumbUrl === activeImage ? 'active-thumb' : ''}`}
                      />
                    ))}
                </div>
            </section>

            {/* Right Column: Product Info & Actions */}
            <section className="product-info pedona-info">
                <h1>{product.name}</h1>
                <div className="review-link">(1 Customer Review)</div>

                <div className="price">{product.price}</div>
                <p className="description-short">{product.description}</p>

                {/* Size and Quantity Inputs (Combined) */}
                <div className="form-group-combined">
                    {/* Size Select Dropdown */}
                    {product.sizes && product.sizes.length > 0 && (
                        <div className="form-group size-select-pedona">
                            <label htmlFor="size-select">Size:</label>
                            <select 
                                id="size-select" 
                                onChange={(e) => setSelectedSize(e.target.value)} 
                                value={selectedSize}
                            >
                                {product.sizes.map((size) => (<option key={size} value={size}>{size}</option>))}
                            </select>
                        </div>
                    )}
                    
                    {/* Quantity Input */}
                    <div className="form-group quantity-input-pedona">
                        <label htmlFor="quantity">Quantity:</label>
                        <input 
                            type="number" 
                            id="quantity" 
                            value={quantity}
                            onChange={handleQuantityChange}
                            min="1" 
                        />
                    </div>
                </div>
                
                {/* Action Buttons */}
                <div className="action-buttons-pedona">
                    <button onClick={handleAddToCart} className="btn btn-primary add-to-cart-pedona">
                        ADD TO CART
                    </button>
                    <button className="btn btn-secondary wishlist-pedona">
                        <span style={{ fontSize: '1.5em' }}>&#9825;</span> {/* Heart icon */}
                        Browse Wishlist
                    </button>
                </div>
                
                {/* Share Links */}
                <div className="product-share">
                    <p className="share-title">Categories: Clothing, Laptops & Desktops</p>
                    <p className="share-title">Share this product: [Social Icons Placeholder]</p>
                </div>
            </section>
        </div>


        {/* 2. Full-Width Tabbed Section (Description/Reviews) */}
        <section className="product-tabs-section">
            <div className="tabs-nav-pedona">
                <button 
                    className={`tab-link ${activeTab === 'description' ? 'active' : ''}`}
                    onClick={() => handleTabClick('description')}
                >
                    Description
                </button>
                 <button 
                    className={`tab-link ${activeTab === 'reviews' ? 'active' : ''}`}
                    onClick={() => handleTabClick('reviews')}
                >
                    Reviews (1)
                </button>
            </div>
            
            <div className="tab-content-wrapper">
                {activeTab === 'description' && (
                    <div className="tab-content active">
                        <p>{product.fullDescription}</p>
                        <p>{product.omEdit}</p>
                        <h3>Scent Profile / Key Notes</h3>
                        <ul className="scent-profile-list">
                            <li><strong>Top Notes:</strong> {product.notes.top}</li>
                            <li><strong>Heart Notes:</strong> {product.notes.heart}</li>
                            <li><strong>Base Notes:</strong> {product.notes.base}</li>
                        </ul>
                    </div>
                )}
                {activeTab === 'reviews' && (
                    <div className="tab-content active">
                        <p>No reviews yet for {product.name}. Be the first!</p>
                        {/* Placeholder for review forms/listings */}
                    </div>
                )}
            </div>
        </section>


        {/* 3. Related Products Section */}
        <section className="related-products-section">
            <h2>Related products</h2>
            <div className="product-grid related-grid-pedona">
               {/* Placeholder rendering based on IDs that exist in the database */}
               <ProductCard key="bleu-chanel" {...productDatabase['bleu-chanel']} productUrl={`/product/bleu-chanel`} />
               <ProductCard key="aventus" {...productDatabase['aventus']} productUrl={`/product/aventus`} />
               <ProductCard key="sauvage-elixir" {...productDatabase['sauvage-elixir']} productUrl={`/product/sauvage-elixir`} />
               <ProductCard key="baccarat-rouge" {...productDatabase['baccarat-rouge']} productUrl={`/product/baccarat-rouge`} />
            </div>
        </section>
    </main>
  );
}

export default ProductDetailPage;