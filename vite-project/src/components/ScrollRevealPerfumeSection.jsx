import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Link } from 'react-router-dom';
import './ScrollRevealPerfumeSection.css';

// Ensure ScrollTrigger is registered (if not done globally in main.jsx)
// gsap.registerPlugin(ScrollTrigger);

function ScrollRevealPerfumeSection({ perfume, reverseLayout = false }) {
  const sectionRef = useRef(null); 
  
  // NOTE: GSAP setup removed for brevity in this response but should remain in your code
  // We rely on CSS for simple hover now

  // Return null if no perfume data is provided
  if (!perfume) return null;

  return (
    <section
      className={`scroll-reveal-section ${reverseLayout ? 'reverse' : ''}`}
      ref={sectionRef}
    >
      <div className="scroll-reveal-content">
        {/* Left Side (Image) */}
        <div className="reveal-item reveal-image">
          {/* Added className for hover effect */}
          <img 
            src={perfume.imageUrl || '/images/placeholder-perfume.png'} 
            alt={`Featured Perfume: ${perfume.brand} ${perfume.name}`}
            className="hover-lift" 
          />
        </div>

        {/* Right Side (Text Content) */}
        <div className="reveal-text-content">
          {/* Removed "Spotlight" from the headline */}
          <h2 className="reveal-item reveal-title">
            {perfume.brand} {perfume.name}
          </h2>
          {perfume.notes && ( 
            <div className="reveal-item reveal-notes">
              <h4>Key Notes</h4>
              <ul>
                {perfume.notes.top && <li><strong>Top:</strong> {perfume.notes.top}</li>}
                {perfume.notes.heart && <li><strong>Heart:</strong> {perfume.notes.heart}</li>}
                {perfume.notes.base && <li><strong>Base:</strong> {perfume.notes.base}</li>}
              </ul>
            </div>
          )}
          {perfume.spotlightDescription && ( 
            <p className="reveal-item reveal-description">
              {perfume.spotlightDescription}
            </p>
          )}
          {perfume.productUrl && ( 
             <div className="reveal-item reveal-button">
                <Link to={perfume.productUrl} className="btn btn-secondary">
                    Discover {perfume.name}
                </Link>
             </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ScrollRevealPerfumeSection;