import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, CheckCircle2, ArrowRight } from 'lucide-react';
import { SERVICES } from '../data';
import { Service } from '../types';
import Icon from './Icon';

export default function Services() {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Lock scroll when modal is open
  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedService]);

  // Handle escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedService(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="services" className="py-24 bg-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">What I Offer</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
            My Services
            <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-brand rounded-full" />
          </h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              id={`service-card-${service.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              onClick={() => setSelectedService(service)}
              className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xs hover:shadow-xl transition-all duration-300 group flex flex-col items-start text-left relative overflow-hidden cursor-pointer"
            >
              {/* Highlight bar on hover */}
              <div className="absolute top-0 left-0 w-full h-1 bg-brand transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />

              {/* Dynamic Icon Container */}
              <div className="mb-6 p-4 rounded-xl bg-brand/10 text-brand-dark group-hover:bg-brand group-hover:text-gray-900 transition-all duration-300">
                <Icon name={service.iconName} className="w-6 h-6" />
              </div>

              {/* Title & Description */}
              <h3 className="font-display text-lg font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                {service.title}
              </h3>
              <p className="text-sm text-gray-500 leading-relaxed font-light flex-grow">
                {service.description}
              </p>

              {/* Arrow Indicator */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedService(service);
                }}
                className="mt-6 flex items-center text-xs font-semibold uppercase tracking-wider text-gray-400 group-hover:text-brand-dark transition-colors cursor-pointer bg-transparent border-none p-0 outline-none"
              >
                <span>Learn More</span>
                <span className="ml-1 transform translate-x-0 group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services Detail Modal */}
      <AnimatePresence>
        {selectedService && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedService(null)}
              className="fixed inset-0 bg-gray-900/60 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', duration: 0.5 }}
              className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl relative overflow-hidden z-10 max-h-[90vh] flex flex-col border border-gray-100"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedService(null)}
                className="absolute top-6 right-6 p-2 rounded-full bg-gray-50 hover:bg-brand hover:text-gray-900 text-gray-400 transition-colors z-20 cursor-pointer border border-gray-100"
                aria-label="Close modal"
              >
                <X size={20} />
              </button>

              {/* Modal Banner / Header */}
              <div className="bg-gray-50 px-8 py-10 sm:px-12 border-b border-gray-100 relative">
                {/* Visual Highlight block */}
                <div className="absolute top-0 left-0 w-2 h-full bg-brand" />
                
                <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="p-4 rounded-2xl bg-brand text-gray-900 self-start">
                    <Icon name={selectedService.iconName} className="w-8 h-8" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-gray-900">
                      {selectedService.title}
                    </h2>
                    <p className="text-sm text-brand-dark font-medium tracking-wide mt-1 font-mono uppercase">
                      {selectedService.subtitle || 'Service Specification'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Modal Scrollable Content */}
              <div className="flex-grow overflow-y-auto px-8 py-10 sm:px-12 space-y-10">
                {/* Overview */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">Overview</h4>
                  <p className="text-gray-600 font-light leading-relaxed text-base sm:text-justify">
                    {selectedService.overview || selectedService.description}
                  </p>
                </div>

                {/* Grid Split for Deliverables & Flow */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4">
                  {/* Key Deliverables - 7 columns */}
                  <div className="lg:col-span-7 space-y-5">
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">Key Deliverables</h4>
                    <ul className="space-y-3.5">
                      {selectedService.keyDeliverables?.map((item, idx) => (
                        <li key={idx} className="flex items-start space-x-3 text-sm text-gray-600 leading-relaxed">
                          <CheckCircle2 className="w-5 h-5 text-brand-dark shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      )) || (
                        <li className="flex items-start space-x-3 text-sm text-gray-600">
                          <CheckCircle2 className="w-5 h-5 text-brand-dark shrink-0" />
                          <span>Professional systems design and integration tailored to customer parameters.</span>
                        </li>
                      )}
                    </ul>
                  </div>

                  {/* Technical Stack & Methodology - 5 columns */}
                  <div className="lg:col-span-5 space-y-8">
                    {/* Tech Stack */}
                    {selectedService.techStack && (
                      <div className="space-y-3">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">Service Technology Stack</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedService.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1.5 rounded-lg bg-gray-50 border border-gray-100 text-xs font-semibold text-gray-700 tracking-wide font-mono"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Operational Methodology */}
                    {selectedService.methodology && (
                      <div className="space-y-4">
                        <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400 font-mono">Execution Steps</h4>
                        <div className="space-y-3.5 relative pl-4 border-l border-gray-100">
                          {selectedService.methodology.map((m, idx) => (
                            <div key={idx} className="relative group/step">
                              {/* Connector Dot */}
                              <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-gray-200 group-hover/step:bg-brand transition-colors border border-white" />
                              <div className="text-xs">
                                <p className="font-bold text-gray-800 font-mono flex items-center">
                                  <span className="text-brand-dark mr-1.5">{m.step}</span>
                                  {m.title}
                                </p>
                                <p className="text-gray-500 font-light mt-0.5 leading-relaxed">{m.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="bg-gray-50 border-t border-gray-100 px-8 py-6 sm:px-12 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-gray-400">
                  <span>Require a tailored solution? Let's discuss your requirements.</span>
                </div>
                <button
                  onClick={() => {
                    setSelectedService(null);
                    const element = document.getElementById('contact');
                    if (element) {
                      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                  className="bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-bold py-2.5 px-6 rounded-xl flex items-center justify-center space-x-2 transition-all duration-300 cursor-pointer text-xs uppercase tracking-wider"
                >
                  <span>Inquire About This Service</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
