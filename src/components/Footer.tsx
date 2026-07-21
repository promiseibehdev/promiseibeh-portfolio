import { Github, Linkedin, Instagram, ArrowUp } from 'lucide-react';
import { PERSONAL_INFO } from '../data';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const socialLinks = [
    { icon: <Github size={18} />, url: PERSONAL_INFO.socials.github, id: 'footer-git' },
    { icon: <Linkedin size={18} />, url: PERSONAL_INFO.socials.linkedin, id: 'footer-in' },
    { icon: <Instagram size={18} />, url: PERSONAL_INFO.socials.instagram, id: 'footer-ig' },
  ];

  return (
    <footer id="app-footer" className="bg-gray-900 text-white py-16 relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-800 pb-12 mb-12">
          {/* Logo Brand */}
          <div className="space-y-4 max-w-xs">
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1 font-display text-2xl font-bold tracking-tight text-white cursor-pointer group focus:outline-hidden"
            >
              <span>Promise</span>
              <span className="w-2 h-2 rounded-full bg-brand transition-transform group-hover:scale-130 inline-block"></span>
            </button>
            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed">
              Designing and constructing high-performance digital systems with visual elegance and robust engineering.
            </p>
          </div>

          {/* Social connections */}
          <div className="flex items-center space-x-4 mt-8 md:mt-0">
            {socialLinks.map((social) => (
              <a
                key={social.id}
                id={social.id}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                referrerPolicy="no-referrer"
                className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-brand hover:bg-brand/15 transition-all duration-300"
                aria-label="Social Link"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Copyrights and Back to top link */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs sm:text-sm text-gray-500">
          <p className="font-light">
            &copy; 2026 Promise Godwin Ibeh. All Rights Reserved.
          </p>

          <button
            id="back-to-top-btn"
            onClick={scrollToTop}
            className="mt-6 sm:mt-0 flex items-center space-x-2 text-gray-400 hover:text-brand transition-colors cursor-pointer group focus:outline-hidden bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg"
          >
            <span>Back to Top</span>
            <ArrowUp size={14} className="transform group-hover:translate-y-[-2px] transition-transform duration-300" />
          </button>
        </div>
      </div>
    </footer>
  );
}
