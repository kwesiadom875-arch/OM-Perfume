import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import locally if needed
import './FeatureSection.css'; // Make sure this CSS file exists

// Ensure ScrollTrigger is registered (if not done globally)
// gsap.registerPlugin(ScrollTrigger);

function FeatureSection({ title, text, imageSrc, imageAlt, reverseLayout = false }) {
  const sectionRef = useRef(null);
  const textContentRef = useRef(null);
  const imageContentRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Feature Animation Timeline ---
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          // scrub: 1,
          // markers: true,
        },
      });

      // Select direct children h3 and p for animation
      const textElements = gsap.utils.toArray(textContentRef.current.children);

      tl.from(
        textElements,
        {
          opacity: 0,
          y: 50,
          duration: 0.8,
          stagger: 0.2,
          ease: 'power3.out',
        }
      );

      tl.from(
        imageContentRef.current,
        {
          opacity: 0,
          scale: 0.95,
          duration: 1,
          ease: 'power3.out',
        },
        '-=0.6'
      );

    }, sectionRef);

    // --- Cleanup ---
    return () => ctx.revert();
  }, [reverseLayout]);

  return (
    <section className={`feature-section ${reverseLayout ? 'reverse' : ''}`} ref={sectionRef}>
      <div className="feature-text-content" ref={textContentRef}>
        <h3>{title || 'Feature Title'}</h3>
        <p>{text || 'Feature description text goes here.'}</p>
      </div>
      <div className="feature-image-content" ref={imageContentRef}>
        <img src={imageSrc || 'https://placehold.co/600x400/ccc/333?text=Feature'} alt={imageAlt || 'Feature image'} />
      </div>
    </section>
  );
}

export default FeatureSection;