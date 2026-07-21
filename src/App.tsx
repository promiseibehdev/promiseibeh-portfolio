import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Blog from './components/Blog';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const sections = ['home', 'about', 'services', 'portfolio', 'blog', 'testimonials', 'contact'];
    
    // Dynamic IntersectionObserver to trace current scrolled section
    const observers = sections.map((secId) => {
      const element = document.getElementById(secId);
      if (!element) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(secId);
          }
        },
        {
          rootMargin: '-40% 0px -40% 0px', // When the section takes up the center 20% of screen
        }
      );
      observer.observe(element);
      return { observer, element };
    });

    return () => {
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-white min-h-screen selection:bg-brand selection:text-gray-900 scroll-smooth antialiased">
      {/* Navigation Header */}
      <Header activeSection={activeSection} />

      {/* Hero Banner Section */}
      <Hero />

      {/* About & Skill Section */}
      <About />

      {/* Services Grid Section */}
      <Services />

      {/* Portfolio Projects Section */}
      <Portfolio />

      {/* Deep Insights Blog Journal Section */}
      <Blog />

      {/* Testimonials Quote Section */}
      <Testimonials />

      {/* Contact Form Section */}
      <Contact />

      {/* Global Brand Footer */}
      <Footer />
    </div>
  );
}

