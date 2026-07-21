import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
}

export default function Header({ activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'blog', label: 'Blog' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <>
      <header
        id="app-header"
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md py-4 border-b border-gray-100'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <button
            id="logo-btn"
            onClick={() => scrollToSection('home')}
            className="flex items-center space-x-1 font-display text-2xl font-bold tracking-tight text-gray-900 group cursor-pointer focus:outline-hidden"
          >
            <span>Promise</span>
            <span className="w-2 h-2 rounded-full bg-brand transition-transform duration-300 group-hover:scale-130 inline-block"></span>
          </button>

          {/* Desktop Navigation */}
          <nav id="desktop-nav" className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <button
                key={item.id}
                id={`nav-link-${item.id}`}
                onClick={() => scrollToSection(item.id)}
                className={`relative py-2 text-sm font-medium transition-colors cursor-pointer focus:outline-hidden ${
                  activeSection === item.id
                    ? 'text-brand'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                {item.label}
                {activeSection === item.id && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            ))}

            {/* Custom CTA Button */}
            <button
              id="header-cta-btn"
              onClick={() => scrollToSection('contact')}
              className="bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-medium text-sm px-5 py-2.5 rounded-full transition-all duration-300 shadow-xs cursor-pointer focus:outline-hidden"
            >
              Get In Touch
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            id="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-gray-900 focus:outline-hidden p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              id="mobile-menu-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
            />

            {/* Drawer */}
            <motion.div
              id="mobile-menu-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 p-8 shadow-2xl flex flex-col justify-between md:hidden"
            >
              <div>
                <div className="flex items-center justify-between mb-12">
                  <button
                    id="mobile-logo-btn"
                    onClick={() => scrollToSection('home')}
                    className="flex items-center space-x-1 font-display text-2xl font-bold tracking-tight text-gray-900 cursor-pointer"
                  >
                    <span>Promise</span>
                    <span className="w-2 h-2 rounded-full bg-brand"></span>
                  </button>
                  <button
                    id="mobile-menu-close"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-500 hover:text-gray-900 p-2 hover:bg-gray-100 rounded-lg cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="flex flex-col space-y-5">
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      id={`mobile-nav-link-${item.id}`}
                      onClick={() => scrollToSection(item.id)}
                      className={`text-left text-lg font-medium py-2 transition-colors cursor-pointer border-b border-gray-50 ${
                        activeSection === item.id
                          ? 'text-brand pl-2 border-l-2 border-l-brand'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-gray-100">
                <button
                  id="mobile-menu-cta"
                  onClick={() => scrollToSection('contact')}
                  className="w-full bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-semibold py-3 rounded-xl transition-all duration-300 text-center cursor-pointer"
                >
                  Hire Me Now
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
