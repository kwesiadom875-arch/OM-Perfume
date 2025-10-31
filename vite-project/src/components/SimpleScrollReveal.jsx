import React, { useRef, useEffect, useState } from 'react';

function SimpleScrollReveal({ children, triggerMargin = '0px', animationDelay = '0s' }) {
  const elementRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const observerRef = useRef(null); // Ref to hold the IntersectionObserver instance

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the element intersects (enters the viewport)
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Stop observing immediately after it becomes visible
          if (observerRef.current) {
              observerRef.current.unobserve(entry.target);
          }
        }
      },
      {
        root: null, // Relative to the viewport
        rootMargin: triggerMargin, 
        threshold: 0.1, // Trigger when 10% of the element is visible
      }
    );

    // Store the observer instance
    observerRef.current = observer; 

    // Attach the observer after the component has rendered
    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    // Cleanup: Disconnect observer when the component unmounts
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [triggerMargin]); // Re-run effect if margin changes

  return (
    <div
      ref={elementRef}
      className={`scroll-fade-item ${isVisible ? 'is-visible' : ''}`}
      style={{ transitionDelay: animationDelay }}
    >
      {children}
    </div>
  );
}

export default SimpleScrollReveal;