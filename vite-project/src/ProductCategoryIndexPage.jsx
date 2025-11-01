import React from 'react';
import { Link } from 'react-router-dom';
import { PRODUCTS_MOCK } from './data';

// Function to extract unique values (like brands) from the product list
const getUniqueAttributes = (products, key) => {
    const uniqueList = [...new Set(products.map(p => p[key]).filter(Boolean))];
    // Sort alphabetically for clean presentation
    return uniqueList.sort();
};

function ProductCategoryIndexPage() {
    // We already have CATEGORIES in data.js, so we'll pull unique brands from PRODUCTS_MOCK
    
    // Extract unique brands (e.g., Tom Ford, Creed, PDM)
    const uniqueBrands = getUniqueAttributes(PRODUCTS_MOCK, 'brand');

    // These are the categories already defined in data.js
    const primaryCategories = [
        "Eau de Parfum", "Colognes", "Discovery Sets", "Candles"
    ];

    return (
        <div className="category-index-container">
            <h1>Explore Our Fragrance House</h1>
            <p className="index-intro">
                Navigate directly to your favorite luxury brand or explore products by category type.
            </p>

            {/* Brands Index */}
            <section className="index-section brand-index">
                <h2>Shop By Brand</h2>
                <div className="index-grid">
                    {uniqueBrands.map(brand => (
                        <Link 
                            key={brand} 
                            to={`/scents?brand=${brand}`} 
                            className="index-card brand-card"
                        >
                            {brand}
                        </Link>
                    ))}
                </div>
            </section>

            {/* Categories Index */}
            <section className="index-section category-type-index">
                <h2>Shop By Product Type</h2>
                <div className="index-grid">
                    {primaryCategories.map(cat => (
                        <Link 
                            key={cat} 
                            to={`/scents?category=${cat}`} 
                            className="index-card category-card"
                        >
                            {cat}
                        </Link>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default ProductCategoryIndexPage;