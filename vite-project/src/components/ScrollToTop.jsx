import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function ScrollToTop() {
  // Get the current location object, specifically the pathname (URL path)
  const { pathname } = useLocation();

  // Run this effect whenever the pathname changes
  useEffect(() => {
    // Scroll the window to the top left corner
    window.scrollTo(0, 0);
  }, [pathname]); // Dependency array: re-run only when pathname changes

  // This component doesn't render anything itself
  return null;
}

export default ScrollToTop;