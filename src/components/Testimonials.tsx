import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  const nextSlide = () => {
    setDirection('right');
    setCurrentIndex((prevIndex) => (prevIndex + 1) % TESTIMONIALS.length);
  };

  const prevSlide = () => {
    setDirection('left');
    setCurrentIndex((prevIndex) => (prevIndex - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  // Auto-play timer
  useEffect(() => {
    const timer = setInterval(nextSlide, 8000);
    return () => clearInterval(timer);
  }, []);

  const slideVariants = {
    enter: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: 'left' | 'right') => ({
      x: dir === 'right' ? -100 : 100,
      opacity: 0,
    }),
  };

  const activeTestimonial = TESTIMONIALS[currentIndex];

  return (
    <section id="testimonials" className="py-24 bg-gray-50 overflow-hidden scroll-mt-16">
      <div className="max-w-5xl mx-auto px-6 md:px-12 relative">
        
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">What Clients Say</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
            Testimonials
            <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-brand rounded-full" />
          </h2>
        </div>

        {/* Big Quote Decorative Mark */}
        <div className="absolute top-28 left-4 sm:left-12 opacity-5 text-gray-900 pointer-events-none select-none">
          <Quote size={120} />
        </div>

        {/* Carousel Content Box */}
        <div className="relative min-h-[350px] sm:min-h-[280px] flex items-center justify-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: 'easeInOut' }}
              className="bg-white p-8 sm:p-12 rounded-3xl border border-gray-100 shadow-xl max-w-3xl w-full flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-8 text-center md:text-left relative z-10"
            >
              {/* Profile Initials Avatar */}
              <div className="relative shrink-0">
                <div className="w-20 h-20 rounded-full flex items-center justify-center bg-gradient-to-br from-brand/40 to-brand-dark/20 text-gray-900 font-display font-bold text-xl border-4 border-brand/20 shadow-md uppercase">
                  {activeTestimonial.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-brand flex items-center justify-center text-gray-900 shadow-sm border-2 border-white">
                  <Quote size={10} className="fill-current" />
                </div>
              </div>

              {/* Review Details */}
              <div className="flex-1 flex flex-col justify-between space-y-4">
                {/* Ratings */}
                <div className="flex items-center justify-center md:justify-start space-x-1">
                  {[...Array(activeTestimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-brand text-brand" />
                  ))}
                </div>

                {/* Quote Text */}
                <p className="text-gray-600 italic font-light leading-relaxed text-base sm:text-lg">
                  "{activeTestimonial.quote}"
                </p>

                {/* Name & Credentials */}
                <div>
                  <h4 className="font-display font-bold text-gray-800 text-lg">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                    {activeTestimonial.role} &mdash; <span className="text-brand-dark">{activeTestimonial.company}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Navigation Buttons & Dots */}
        <div className="flex flex-col items-center space-y-6 mt-8 relative z-20">
          {/* Arrows */}
          <div className="flex items-center space-x-4">
            <button
              id="test-prev-btn"
              onClick={prevSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-brand hover:border-brand shadow-xs transition-all duration-300 cursor-pointer"
              aria-label="Previous Review"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              id="test-next-btn"
              onClick={nextSlide}
              className="w-12 h-12 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-600 hover:text-gray-900 hover:bg-brand hover:border-brand shadow-xs transition-all duration-300 cursor-pointer"
              aria-label="Next Review"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          {/* Pagination Indicators */}
          <div className="flex items-center space-x-2">
            {TESTIMONIALS.map((_, idx) => (
              <button
                key={idx}
                id={`test-dot-${idx}`}
                onClick={() => {
                  setDirection(idx > currentIndex ? 'right' : 'left');
                  setCurrentIndex(idx);
                }}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 cursor-pointer focus:outline-hidden ${
                  currentIndex === idx ? 'bg-gray-900 w-6' : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
