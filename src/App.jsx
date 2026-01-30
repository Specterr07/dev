import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import Projects from './components/Projects';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className='bg-white text-slate-900 font-sans antialiased'>
      <Navbar />
      <Hero />
      <Features />
      <Projects />
      <Contact />
      <Footer />
    </div>
  )
}

export default App
