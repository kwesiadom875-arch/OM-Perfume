// src/HomePageContent.jsx

import React from 'react';
import ScentHero from './ScentHero.jsx'; // ⬅️ Must be .jsx
import PerkBlocks from './PerkBlocks.jsx'; // ⬅️ Must be .jsx
import ProductCategories from './ProductCategories.jsx'; // ⬅️ Must be .jsx
import ProductGrid from './ProductGrid.jsx'; // ⬅️ Must be .jsx

function HomePageContent({ activeCategory, onCategoryChange, onQuickView }) {
    return (
        <>
            <ScentHero />
            <PerkBlocks />
            
            <ProductCategories 
                activeCategory={activeCategory} 
                onCategoryChange={onCategoryChange} 
            />
            
            <ProductGrid 
                activeCategory={activeCategory} 
                onQuickView={onQuickView} 
            />
        </>
    );
}

export default HomePageContent;