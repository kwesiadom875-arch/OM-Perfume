import React from 'react';

function ScentHero() {
  return (
    <section className="hero-section">
      <div className="hero-content">
        <h2 className="hero-headline">The Signature Reserve</h2>
        <p className="hero-subtext">
          Experience the rare blend of aged sandalwood and midnight jasmine. A timeless fragrance designed to define your presence.
        </p>
        <button className="cta-button">
          EXPLORE SCENTS →
        </button>
      </div>
      
      <div className="hero-image-container">
        {/* Placeholder image tag for your bottle */}
        <img 
          src="/signature-reserve-bottle.jpg" 
          alt="Signature Reserve Perfume Bottle" 
          className="hero-image" 
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = "https://placehold.co/350x350/E6E6FA/333333?text=Signature+Scent"; 
            e.target.style.borderRadius = '50%';
          }}
        />
      </div>
    </section>
  );
}

export default ScentHero;