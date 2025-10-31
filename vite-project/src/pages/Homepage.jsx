import React from 'react';
import { Link } from 'react-router-dom';
import SimpleScrollReveal from '../components/SimpleScrollReveal'; // The stable observer component
import ScrollRevealPerfumeSection from '../components/ScrollRevealPerfumeSection'; // The component that holds the structure

// Placeholder icons
const IconPlaceholder = ({ label }) => <span style={{ padding: '0 5px', border: '1px solid var(--color-light)', borderRadius: '3px', fontSize: '0.8em', marginRight: '5px', color: 'var(--color-light)', opacity: '0.7' }}>{label}</span>;

// Placeholder data for best sellers (The horizontal strip)
const bestSellers = [
     { id: 'enchanted-blooms', imageUrl: "/images/your-bestseller-image-1.png", brand: "Example Brand", name: "Enchanted Blooms", description: "A floral-centric perfume...", price: "$119", productUrl: "/product/enchanted-blooms"},
     { id: 'mystic-oud', imageUrl: "/images/your-bestseller-image-2.png", brand: "Example Brand", name: "Mystic Oud", description: "An oriental fragrance...", price: "$169", productUrl: "/product/mystic-oud"},
     { id: 'ocean-breeze', imageUrl: "/images/your-bestseller-image-3.png", brand: "Example Brand", name: "Ocean Breeze", description: "A refreshing scent...", price: "$250", productUrl: "/product/ocean-breeze"}
];

// Data for featured perfume sections (The Scroll-Reveal blocks)
const featuredPerfumes = [
  {
    id: 'oud-wood',
    brand: "Tom Ford",
    name: "Oud Wood",
    imageUrl: "/images/oud-wood.png",
    notes: { top: "Rose Wood, Cardamom, Chinese Pepper", heart: "Oud, Sandalwood, Vetiver", base: "Tonka Bean, Vanilla, Amber" },
    spotlightDescription: "A masterful blend of exotic, smoky woods including rare oud, sandalwood, rosewood, eastern spices, and sensual amber. Command presence with this sophisticated classic, selected by OM Perfumery for its bold character.",
    productUrl: "/product/oud-wood"
  },
  {
    id: 'baccarat-rouge',
    brand: "Maison Francis Kurkdjian",
    name: "Baccarat Rouge 540",
    imageUrl: "/images/baccarat-rouge.png",
    notes: { top: "Saffron, Jasmine", heart: "Amberwood, Ambergris", base: "Fir Resin, Cedar" },
    spotlightDescription: "An icon of modern perfumery. This radiant and intensely sophisticated scent lays on the skin like an amber, floral and woody breeze. Unforgettable.",
    productUrl: "/product/baccarat-rouge"
  },
   {
    id: 'aventus',
    brand: "Creed",
    name: "Aventus",
    imageUrl: "/images/aventus.png",
    notes: { top: "Bergamot, Blackcurrant Leaves, Apple, Pineapple", heart: "Pinkberries, Birch, Patchouli, Jasmine", base: "Musk, Oakmoss, Ambergris, Vanilla" },
    spotlightDescription: "Celebrating strength, power, and success, Aventus is a sophisticated fruity and rich blend for the individual who savors a life well-lived.",
    productUrl: "/product/aventus"
  }
];

// Data for simple reveal section (Below Best Sellers)
const featureSpotlight = {
    title: "The Heart of the Collection",
    subtitle: "Why We Curate.",
    description: "Our philosophy revolves around timelessness, authenticity, and discovery. We travel the world of fragrance so you don't have to, bringing home only masterpieces that define an era.",
    image: "/images/craftsmanship.jpg", // Example image
    cta: "Explore Our Full Story"
};


function Homepage() {
  return (
    <main>
      {/* 1. Hero Section (Fragsence Style) */}
      <section className="hero fragsence-hero">
        <div className="fragsence-hero-left">
          <h1>Evoke Every Emotion with Fragrance</h1>
          <div className="social-icons">
            <IconPlaceholder label="fb" />
            <IconPlaceholder label="tw" />
            <IconPlaceholder label="ig" />
          </div>
        </div>
        <div className="fragsence-hero-center">
          <img src="/images/your-hero-bottle-1.png" alt="Perfume Bottle 1" className="hero-bottle bottle-1" />
          <img src="/images/your-hero-bottle-2.png" alt="Perfume Bottle 2" className="hero-bottle bottle-2" />
        </div>
        <div className="fragsence-hero-right">
          <div className="featured-item">
            <span className="featured-price">$203</span>
            <span className="featured-name">Gold Memoir</span>
          </div>
          <p className="hero-sub-description">
            Elevate your everyday moments with our luxurious fragrances that transform routine into a sensory journey of pleasure and luxury.
          </p>
          <div className="hero-actions">
            <Link to="/shop" className="btn btn-primary btn-shop-now">Shop Now</Link>
            <Link to="/category/best" className="link-best-fragrance">Best of Fragrance</Link>
          </div>
        </div>
      </section>

      {/* 2. Best Seller Section (Horizontal Strip) */}
      <section className="best-seller-section">
        <div className="best-seller-title">
          <span>BEST SELLER</span>
          <span>01 – {bestSellers.length.toString().padStart(2, '0')}</span>
        </div>
        <div className="best-seller-grid">
          {bestSellers.map(product => (
            <div className="best-seller-item" key={product.id}>
              <img src={product.imageUrl} alt={product.name} />
              <div className="item-details">
                 <span className="item-price">{product.price}</span>
                 <h4 className="item-name">{product.name}</h4>
                 <p className="item-description">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. Simple Scroll Reveal Section (Below Best Sellers) --- */}
      <section className="simple-reveal-spotlight">
        <div className="content-container" style={{maxWidth: '1000px'}}>

          <div style={{ display: 'flex', gap: '3rem', alignItems: 'center', flexWrap: 'wrap' }}>

            {/* Reveal Image Block */}
            <div style={{ flex: '1', minWidth: '300px' }}>
                <SimpleScrollReveal animationDelay="0.2s">
                    <img src={featureSpotlight.image} alt={featureSpotlight.title} style={{ borderRadius: '8px' }} />
                </SimpleScrollReveal>
            </div>

            {/* Reveal Text Block */}
            <div style={{ flex: '1.5', minWidth: '300px' }}>
                <SimpleScrollReveal>
                    <h2>{featureSpotlight.title}</h2>
                </SimpleScrollReveal>

                <SimpleScrollReveal animationDelay="0.2s">
                    <h4>{featureSpotlight.subtitle}</h4>
                </SimpleScrollReveal>

                <SimpleScrollReveal animationDelay="0.4s">
                    <p>{featureSpotlight.description}</p>
                </SimpleScrollReveal>

                <SimpleScrollReveal animationDelay="0.6s">
                    <Link to="/about" className="btn btn-secondary">{featureSpotlight.cta}</Link>
                </SimpleScrollReveal>
            </div>

          </div>
        </div>
      </section>
      {/* --- End Simple Scroll Reveal Section --- */}

      {/* --- 4. Mapped Scroll Reveal Sections (Product Spotlights) --- */}
      {/* Loop through the featuredPerfumes data and render a component for each */}
      {featuredPerfumes.map((perfume, index) => (
        <ScrollRevealPerfumeSection
          key={perfume.id}
          perfume={perfume}
          reverseLayout={index % 2 !== 0} // Alternate layout (image right if index is odd)
        />
      ))}
      {/* --- End Mapped Sections --- */}
    </main>
  );
}

export default Homepage;