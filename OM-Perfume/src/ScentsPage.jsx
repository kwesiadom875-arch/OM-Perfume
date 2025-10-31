import React from 'react';
import ProductCategories from './ProductCategories.jsx';
import ProductGrid from './ProductGrid.jsx';

function ScentsPage({ activeCategory, onCategoryChange, onQuickView }) {
    return (
        <div className="scents-page-container">
            <header className="scents-page-header">
                <h1>The Full Collection</h1>
                <p>Curated scents across all notes and families.</p>
            </header>
            
            {/* These components receive state/handlers from App.jsx */}
            <ProductCategories 
                activeCategory={activeCategory} 
                onCategoryChange={onCategoryChange} 
            />
            
            <ProductGrid 
                activeCategory={activeCategory} 
                onQuickView={onQuickView} 
            />
        </div>
    );
}

export default ScentsPage;