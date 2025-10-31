import React from 'react';
import FeatureSection from './FeatureSection'; // Import the child

function Features() {
  return (
    <div className="features-container">
      {/* Render multiple feature sections */}
      <FeatureSection
        title="Exquisite Ingredients"
        text="Sourced from the finest locations around the globe, ensuring unparalleled quality and depth in every note."
        imageSrc="/images/ingredients.jpg" // Replace with your image
        imageAlt="Rare perfume ingredients like flowers and resins"
      />
      <FeatureSection
        title="Artisan Craftsmanship"
        text="Each fragrance is meticulously blended by master perfumers, balancing tradition with modern olfactory artistry."
        imageSrc="/images/craftsmanship.jpg" // Replace with your image
        imageAlt="Hands carefully blending perfume oils"
        reverseLayout={true} // Alternate layout
      />
      {/* Add more FeatureSection components as needed */}
       <FeatureSection
        title="Lasting Impressions"
        text="Our curated scents are designed for longevity and presence, creating unforgettable moments."
        imageSrc="/images/lasting-impression.jpg" // Replace with your image
        imageAlt="Elegant person enjoying a lingering fragrance trail"
      />
    </div>
  );
}

export default Features;