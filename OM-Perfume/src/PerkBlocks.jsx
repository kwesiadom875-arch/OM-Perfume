import React from 'react';

// Reusable component for each individual perk block
const Perk = ({ title, description, icon }) => (
    <div className="perk-block">
        <div className="perk-icon">{icon}</div>
        <h4>{title}</h4>
        <p>{description}</p>
        <a href="#details" className="view-link">Explore Details →</a>
    </div>
);

function PerkBlocks() {
  return (
    <section className="perk-container">
      <Perk 
        title="Top Notes"
        description="Fresh citrus bursts, vibrant and immediate. The first impression that captures the air."
        icon="🍊"
      />
      
      <Perk 
        title="Ethically Sourced"
        description="Crafted with sustainable ingredients and cruelty-free practices. Luxury you can feel good about."
        icon="🌿"
      />
      
      <Perk 
        title="White-Glove Delivery"
        description="Signature packaging and secure shipping, ensuring your fragrance arrives in perfect condition."
        icon="🎁"
      />
    </section>
  );
}

export default PerkBlocks;