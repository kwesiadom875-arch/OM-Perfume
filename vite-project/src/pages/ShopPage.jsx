import React from 'react';
import ProductCard from '../components/ProductCard'; 
import { Link } from 'react-router-dom';

function ShopPage() {

  // --- Placeholder Data ---
  const products = [
    { id: 'oud-wood', imageUrl: "/images/oud-wood.png", brand: "Tom Ford", name: "Oud Wood", price: "450", productUrl: "/product/oud-wood"},
    { id: 'baccarat-rouge', imageUrl: "/images/baccarat-rouge.png", brand: "MFK", name: "Baccarat Rouge 540", price: "520", productUrl: "/product/baccarat-rouge"},
    { id: 'aventus', imageUrl: "https://placehold.co/400x500/F5F5F5/1A1A1A?text=Creed", brand: "Creed", name: "Aventus", price: "600", productUrl: "/product/aventus"},
    { id: 'bleu-chanel', imageUrl: "https://placehold.co/400x500/F5F5F5/1A1A1A?text=Chanel", brand: "Chanel", name: "Bleu de Chanel", price: "350", productUrl: "/product/bleu-chanel"},
    { id: 'sauvage-elixir', imageUrl: "https://placehold.co/400x500/F5F5F5/1A1A1A?text=Dior", brand: "Dior", name: "Sauvage Elixir", price: "480", productUrl: "/product/sauvage-elixir"},
    { id: 'gypsy-water', imageUrl: "https://placehold.co/400x500/F5F5F5/1A1A1A?text=Byredo", brand: "Byredo", name: "Gypsy Water", price: "550", productUrl: "/product/gypsy-water"}
  ];
  // --- End Placeholder Data ---

  return (
    <main>
      {/* 1. Page Header (Wink Style Title Bar) */}
      <section className="page-header shop-title-bar">
        <h1>Wink Collection</h1>
        <div className="breadcrumb">
            <Link to="/">Home</Link> / <span>Wink Collection</span>
        </div>
      </section>

      {/* 2. Shop Layout (Sidebar + Grid) */}
      <div className="shop-container wink-layout">

        {/* Left Column: Filter Sidebar */}
        <aside className="filter-sidebar wink-sidebar">
          
          <div className="widget brand-filter">
            <h4>Brand</h4>
            <div className="widget-content">
              <label><input type="checkbox" /> Tom Ford</label>
              <label><input type="checkbox" /> Chanel</label>
              <label><input type="checkbox" /> Creed</label>
              <label><input type="checkbox" /> Dior</label>
              <label><input type="checkbox" /> Byredo</label>
            </div>
          </div>
          
          <div className="widget category-filter">
            <h4>Category</h4>
            <div className="widget-content">
              <label><input type="checkbox" /> Floral</label>
              <label><input type="checkbox" /> Woody</label>
              <label><input type="checkbox" /> Oriental</label>
              <label><input type="checkbox" /> Fresh</label>
              <label><input type="checkbox" /> Unisex</label>
              <label><input type="checkbox" /> Limited</label>
            </div>
          </div>
          
          <div className="widget price-filter">
            <h4>Price Range</h4>
            <p>$100 - $600</p>
            <div className="price-range-slider"></div>
          </div>

        </aside>

        {/* Right Column: Product Listing */}
        <section className="product-listing">
            {/* Sort Bar (Minimalist style) */}
            <div className="sort-bar">
              <label htmlFor="sort-by">Sort By:</label>
              <select id="sort-by" name="sort-by" defaultValue="default">
                <option value="default">New Arrivals</option>
                <option value="price-high">Price: High to Low</option>
                <option value="price-low">Price: Low to High</option>
              </select>
            </div>

            {/* Product Grid */}
            <div className="product-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  imageUrl={product.imageUrl}
                  brand={product.brand}
                  name={product.name}
                  productUrl={product.productUrl}
                  price={`$${product.price}`}
                  oldPrice={`$${(parseFloat(product.price) + 50)}`} // Example old price
                />
              ))}
            </div>

            {/* Pagination */}
            <nav className="pagination">
              <Link to="#" className="active">1</Link>
              <Link to="#">2</Link>
              <Link to="#">3</Link>
              <Link to="#">&raquo;</Link>
            </nav>
        </section>
      </div>
    </main>
  );
}

export default ShopPage;