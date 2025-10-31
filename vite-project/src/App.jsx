import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './components/header'; // Assuming lowercase filename
import Footer from './components/Footer'; // Assuming lowercase filename
import ScrollToTop from './components/ScrollToTop';
import WebGLBackground from './components/WebGLBackground'; // Import WebGL Background

function App() {
  return (
    <>
      <WebGLBackground /> {/* Render the background canvas */}
      <ScrollToTop /> {/* Handles scrolling to top on navigation */}
      <Header /> {/* Renders the site header */}

      {/* Outlet renders the matched child route component (Homepage, AboutPage, etc.) */}
      <Outlet />

      <Footer /> {/* Renders the site footer */}
    </>
  );
}

export default App;