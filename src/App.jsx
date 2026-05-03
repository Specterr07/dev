import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div style={{ backgroundColor: '#0d1117', color: '#e6edf3' }} className="font-sans antialiased min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Projects />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
