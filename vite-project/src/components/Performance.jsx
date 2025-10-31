import React, { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import locally if needed
import './Performance.css'; // Make sure this CSS file exists

// Ensure ScrollTrigger is registered (if not done globally)
// gsap.registerPlugin(ScrollTrigger);

function Performance() {
  const sectionRef = useRef(null);
  const bgRef = useRef(null); // Ref for the parallax background
  const numberRefs = useRef([]); // Ref array for multiple numbers
  numberRefs.current = []; // Initialize on each render

  // Function to add refs to the array
  const addToRefs = (el) => {
    if (el && !numberRefs.current.includes(el)) {
      numberRefs.current.push(el);
    }
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // --- Parallax Background ---
      gsap.to(bgRef.current, {
        backgroundPosition: '50% 100%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
          // markers: true,
        },
      });

      // --- Animate Numbers ---
      numberRefs.current.forEach((numEl) => {
        const rawValue = numEl.dataset.value || '0';
        // Basic check for '+' or '%' suffix
        const suffix = rawValue.endsWith('+') ? '+' : rawValue.endsWith('%') ? '%' : '';
        const endValue = parseFloat(rawValue.replace(/[%+]/g, '')) || 0; // Remove suffix for parsing
        const counter = { value: 0 };

        gsap.to(counter, {
          value: endValue,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: numEl,
            start: 'top 85%',
            toggleActions: 'play none none none',
            // markers: true,
          },
          onUpdate: () => {
            // Update text content, add suffix back
            numEl.textContent = Math.round(counter.value).toLocaleString() + suffix;
          },
        });
      });

    }, sectionRef);

    // --- Cleanup ---
    return () => ctx.revert();
  }, []); // Run once

  return (
    <section className="performance-section" ref={sectionRef}>
      <div className="performance-background" ref={bgRef}></div>
      <div className="performance-content">
        <h2>Unrivaled Performance</h2>
        <div className="metrics-grid">
          <div className="metric-item">
            <span className="metric-number" ref={addToRefs} data-value="12">0</span>
            <span className="metric-label">Hour Longevity</span>
          </div>
          <div className="metric-item">
            <span className="metric-number" ref={addToRefs} data-value="98%">0%</span>
            <span className="metric-label">Positive Feedback</span>
          </div>
          <div className="metric-item">
            <span className="metric-number" ref={addToRefs} data-value="50000+">0+</span>
            <span className="metric-label">Bottles Sold</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Performance;