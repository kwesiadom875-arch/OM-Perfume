import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import locally if needed
import { Link } from 'react-router-dom';
import './CTA.css'; // Make sure this CSS file exists

// Ensure ScrollTrigger is registered (if not done globally)
// gsap.registerPlugin(ScrollTrigger);

function CTA() {
  const sectionRef = useRef(null);

  useLayoutEffect(() => {
    // Select direct children h2, p, a for animation
    const elementsToAnimate = gsap.utils.toArray(sectionRef.current.children);

    const ctx = gsap.context(() => {
      // --- Simple Fade In ---
      gsap.from(elementsToAnimate, {
        opacity: 0,
        y: 30,
        duration: 1,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
          // markers: true,
        },
      });
    }, sectionRef);

    // --- Cleanup ---
    return () => ctx.revert();
  }, []);

  return (
    <section className="cta-section" ref={sectionRef}>
      <h2>Find Your Signature Scent</h2>
      <p>Explore the full collection and discover the essence of you.</p>
      <Link to="/shop" className="btn btn-primary">Shop All Perfumes</Link>
    </section>
  );
}

export default CTA;