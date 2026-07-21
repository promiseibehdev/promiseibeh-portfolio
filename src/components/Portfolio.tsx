import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, X, Globe, Calendar, User, Layers } from 'lucide-react';
import { PROJECTS } from '../data';
import { Project } from '../types';

export default function Portfolio() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'web' | 'automation' | 'branding'>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const categories = [
    { id: 'all', label: 'All Works' },
    { id: 'web', label: 'Web Applications' },
    { id: 'automation', label: 'Automated Systems' },
    { id: 'branding', label: 'Branding Systems' },
  ] as const;

  const filteredProjects = selectedCategory === 'all'
    ? PROJECTS
    : PROJECTS.filter(project => project.category === selectedCategory);

  // Close modal on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section id="portfolio" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">My Portfolio</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
            Recent Works
            <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-brand rounded-full" />
          </h2>
        </div>

        {/* Categories Tab Navigation */}
        <div id="portfolio-tabs" className="flex flex-wrap justify-center gap-x-8 gap-y-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              id={`portfolio-tab-${cat.id}`}
              onClick={() => setSelectedCategory(cat.id)}
              className={`relative py-2.5 px-1 text-sm font-semibold transition-colors cursor-pointer focus:outline-hidden ${
                selectedCategory === cat.id
                  ? 'text-brand'
                  : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {cat.label}
              {selectedCategory === cat.id && (
                <motion.div
                  layoutId="activePortfolioCategoryIndicator"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div
          id="portfolio-grid"
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                id={`project-card-${project.id}`}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-pointer flex flex-col h-full"
                onClick={() => setSelectedProject(project)}
              >
                {/* Project Image */}
                <div className="relative aspect-[3/2] w-full overflow-hidden bg-gray-50 border-b border-gray-100/50">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  {/* Subtle hover gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Eye hover trigger */}
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-xs flex items-center justify-center text-gray-700 opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-sm border border-gray-100">
                    <Eye size={16} />
                  </div>
                </div>

                {/* Card footer description */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-extrabold uppercase tracking-widest text-brand-dark mb-1 block font-mono">
                      {project.category === 'web' ? 'Web App' : project.category === 'automation' ? 'Automated System' : 'Branding'}
                    </span>
                    <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-brand-dark transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Detailed Overlays Modal */}
      <AnimatePresence>
        {selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              id="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProject(null)}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Content Box */}
              <motion.div
                id="modal-content"
                initial={{ scale: 0.9, opacity: 0, y: 30 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 30 }}
                transition={{ type: 'spring', duration: 0.5 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-white rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto shadow-2xl relative"
              >
                {/* Header banner image */}
                <div className="relative h-64 sm:h-96 w-full bg-gray-100">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Floating Close Button */}
                  <button
                    id="modal-close-btn"
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-6 right-6 w-11 h-11 bg-white/95 text-gray-800 hover:bg-brand hover:text-gray-900 shadow-xl rounded-full flex items-center justify-center transition-all duration-300 focus:outline-hidden cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>

                  {/* Float Category Overlay */}
                  <div className="absolute bottom-6 left-6 sm:left-10 flex flex-col space-y-1">
                    <span className="inline-block self-start bg-brand text-gray-900 font-bold uppercase text-xs tracking-wider px-3 py-1 rounded-full">
                      {selectedProject.category === 'web' ? 'Web App' : selectedProject.category === 'automation' ? 'Automated System' : 'Branding'}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl font-bold text-white leading-tight">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>

                {/* Information content */}
                <div className="p-8 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
                  {/* Column 1: description */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Project Overview</h4>
                      <p className="text-gray-600 leading-relaxed font-light text-base whitespace-pre-line">
                        {selectedProject.description}
                      </p>
                    </div>

                    {/* Tech tag highlights */}
                    <div className="space-y-3">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400">Technologies Used</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.technologies.map((tech, idx) => (
                          <span
                            key={idx}
                            className="bg-gray-100 text-gray-700 text-xs font-semibold px-3 py-1.5 rounded-lg border border-gray-200"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Column 2: Meta metrics & actions */}
                  <div className="lg:col-span-5 bg-gray-50 rounded-2xl p-6 border border-gray-100 flex flex-col justify-between space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-wider text-gray-400 border-b border-gray-200 pb-2">Details</h4>
                      
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-brand/10 text-brand-dark rounded-lg">
                          <User size={16} />
                        </div>
                        <div className="text-xs">
                          <p className="text-gray-400 font-medium">
                            {selectedProject.id === 'p6' || selectedProject.id === 'p7'
                              ? 'Employer'
                              : selectedProject.id === 'p3' || selectedProject.id === 'p5'
                              ? 'Founder Initiative'
                              : 'Client / Target Entity'}
                          </p>
                          <p className="text-gray-800 font-bold">{selectedProject.client}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-brand/10 text-brand-dark rounded-lg">
                          <Calendar size={16} />
                        </div>
                        <div className="text-xs">
                          <p className="text-gray-400 font-medium">
                            {selectedProject.date.toLowerCase().includes('ongoing')
                              ? 'Timeline'
                              : 'Date Finished'}
                          </p>
                          <p className="text-gray-800 font-bold">{selectedProject.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-brand/10 text-brand-dark rounded-lg">
                          <Layers size={16} />
                        </div>
                        <div className="text-xs">
                          <p className="text-gray-400 font-medium">Domain</p>
                          <p className="text-gray-800 font-bold uppercase">{selectedProject.category === 'web' ? 'Web App' : selectedProject.category === 'automation' ? 'Automated System' : 'Branding'}</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA link */}
                    <a
                      id="modal-cta-btn"
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer text-center"
                    >
                      <Globe size={18} />
                      <span>Launch Live Demo</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
