import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Clock, ArrowLeft, BookOpen } from 'lucide-react';
import { BLOG_POSTS } from '../data';
import { BlogPost } from '../types';

export default function Blog() {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const handleSelectPost = (post: BlogPost) => {
    setSelectedPost(post);
    setTimeout(() => {
      const element = document.getElementById('blog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const handleBackToGrid = () => {
    setSelectedPost(null);
    setTimeout(() => {
      const element = document.getElementById('blog');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 50);
  };

  const getCleanContent = (content: string) => {
    const parts = content.split(/<h4>Want to learn more\??<\/h4>/i);
    return parts[0];
  };

  return (
    <section id="blog" className="py-24 bg-gray-50 border-b border-gray-100 scroll-mt-16 text-gray-900">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        <AnimatePresence mode="wait">
          {!selectedPost ? (
            <motion.div
              key="grid"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Header */}
              <div className="text-left mb-16">
                <p className="text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-2 font-mono">
                  INSIGHTS & PUBLICATIONS
                </p>
                <h2 className="font-display text-4xl md:text-5xl font-bold text-gray-900">
                  Blog Posts
                </h2>
              </div>

              {/* Blog Posts Grid - 2 columns */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {BLOG_POSTS.map((post, idx) => (
                  <motion.article
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-brand/30 transition-all duration-300 flex flex-col h-full p-8 sm:p-10 group"
                  >
                    {/* Meta */}
                    <div className="flex items-center space-x-4 text-xs text-gray-400 mb-4 font-mono">
                      <span>{post.date}</span>
                    </div>

                    {/* Title */}
                    <h3 
                      onClick={() => handleSelectPost(post)}
                      className="font-display font-bold text-2xl text-gray-900 mb-4 group-hover:text-brand-dark transition-colors cursor-pointer leading-snug"
                    >
                      {post.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-gray-500 text-sm sm:text-base font-light leading-relaxed mb-6">
                      {post.summary}
                    </p>

                    {/* Button */}
                    <button
                      onClick={() => handleSelectPost(post)}
                      className="mt-auto inline-flex items-center space-x-1 text-xs font-bold text-brand-dark hover:text-brand transition-colors uppercase cursor-pointer"
                    >
                      <span>Read Article &rarr;</span>
                    </button>
                  </motion.article>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="detail"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="max-w-4xl mx-auto"
            >
              {/* Back button */}
              <button
                onClick={handleBackToGrid}
                className="inline-flex items-center space-x-2 text-xs font-bold tracking-wider text-gray-500 hover:text-gray-900 transition-colors uppercase mb-8 cursor-pointer"
              >
                <span>&larr; BACK TO BLOG GRID</span>
              </button>

              {/* Main Container Card */}
              <div className="bg-white border border-gray-100 shadow-xl rounded-3xl p-6 sm:p-12">
                {/* Title */}
                <h1 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-gray-900 uppercase mb-6 leading-tight">
                  {selectedPost.title}
                </h1>

                {/* Featured Image */}
                <div className="aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-gray-100 mb-8 bg-gray-50">
                  <img
                    src={selectedPost.image}
                    alt={selectedPost.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Meta line */}
                <div className="flex items-center space-x-2 text-xs text-gray-500 border-b border-gray-100 pb-6 mb-8 uppercase tracking-wider font-mono">
                  <span>Posted: <span className="text-brand-dark">{selectedPost.date}</span></span>
                  <span>|</span>
                  <span>Written by <span className="text-gray-900">Promise Godwin Ibeh</span></span>
                </div>

                {/* Article Content */}
                <div 
                  className="blog-detail-content text-gray-600 font-light leading-relaxed text-justify space-y-6"
                  dangerouslySetInnerHTML={{ __html: getCleanContent(selectedPost.content) }}
                />

                {/* CTA Box */}
                <div className="border border-gray-100 rounded-2xl bg-gray-50 p-8 text-center mt-12 flex flex-col items-center justify-center space-y-4 max-w-2xl mx-auto">
                  <h4 className="font-display text-xl font-bold text-gray-900">Want to learn more?</h4>
                  <p className="text-gray-500 text-sm max-w-md font-light leading-relaxed">
                    Get in touch directly to discuss customized system architecture consultations, technical training frameworks, or security assessments.
                  </p>
                  <button
                    onClick={() => {
                      const element = document.getElementById('contact');
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }}
                    className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-2.5 rounded-lg uppercase text-xs tracking-wider transition-colors cursor-pointer"
                  >
                    Contact Me
                  </button>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
