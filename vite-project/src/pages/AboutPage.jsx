import React from 'react';
import { Link } from 'react-router-dom';

function AboutPage() {
  return (
    <main>
      {/* 1. Page Header */}
      <section className="page-header">
        <h1>Our Vision: The Soul of Scent</h1>
        <p>OM perfumery is more than a store. It is a destination for the discerning.</p>
        <p style={{ marginTop: '0.5rem', opacity: 0.8 }}>
          The sound 'OM' is the universal vibration... [rest of text]
        </p>
      </section>

      {/* Wrap content sections in a container for consistent styling */}
      <div className="content-container">

        {/* 2. Our Mission */}
        <section className="about-content" style={{ paddingTop: 0 }}> {/* Remove extra padding */}
          <div className="about-text-block">
            <h2>Our Mission: Your Curated Collection</h2>
            <p>The world of luxury fragrance is a vast and beautiful landscape... [rest of text] </p>
            <p>We do the research, we verify the sources... [rest of text]</p>
          </div>
        </section>

        {/* 3. Authenticity Promise */}
        {/* We can integrate this within the container or keep separate */}
        <section className="guarantee" style={{ backgroundColor: 'var(--color-grey)', padding: '3rem', borderRadius: '8px', marginTop: '2rem' }}>
          <h2>Our Unwavering Promise: 100% Authenticity</h2>
          <div className="promise-text-center">
            <p>In the world of luxury, trust is paramount... [rest of text]</p>
            <p>We source our inventory directly... [rest of text]</p>
          </div>
        </section>

        {/* 4. Curation Process */}
        <section className="about-content with-image" style={{ paddingBottom: 0 }}>
          <div className="about-text-block">
            <h2>The Art of Curation</h2>
            <p>Our collection is not built by an algorithm... [rest of text]</p>
            <p>This is not an endless warehouse of perfume. This is the <strong>OM perfumery edit.</strong></p>
          </div>
          <div className="about-image-block" style={{ marginTop: '2rem' }}>
            <img src="/images/brand-flatlay.jpg" alt="A curation of luxury perfume bottles" style={{ borderRadius: '8px' }}/>
          </div>
        </section>

      </div> {/* End content-container */}


      {/* 5. Final Call-to-Action - Kept separate, full width */}
      <section className="cta">
        <h2>Begin Your Journey</h2>
        <p>Your next signature scent is waiting...</p>
        <Link to="/shop" className="btn btn-primary">Shop The Collection</Link>
      </section>
    </main>
  );
}

export default AboutPage;