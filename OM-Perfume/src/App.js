// App.js
import React from 'react';
import Header from './Header';
import ScentHero from './ScentHero'; // Renamed HeroSection
import PerkBlocks from './PerkBlocks'; // New component for features
// import ProductCategories from './ProductCategories'; // To be added next
// import ProductGrid from './ProductGrid'; // To be added next
// import Footer from './Footer'; // To be added last

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <ScentHero />
        <PerkBlocks />
        {/*
          <ProductCategories />
          <ProductGrid />
        */}
      </main>
      {/* <Footer /> */}
    </div>
  );
}

export default App;