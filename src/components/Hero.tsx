import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Instagram, X, Printer, Briefcase, GraduationCap, Award, Mail, Phone, MapPin } from 'lucide-react';
import { PERSONAL_INFO, EXPERIENCE, EDUCATION_DATA, CERTIFICATIONS } from '../data';

export default function Hero() {
  const words = ['Systems Engineer', 'Cloud Architect', 'WordPress Specialist', 'AI Integrator'];
  const [text, setText] = useState('');
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(150);
  const [isCVModalOpen, setIsCVModalOpen] = useState(false);

  useEffect(() => {
    const currentWord = words[wordIndex];
    const handleTyping = () => {
      if (!isDeleting) {
        setText(currentWord.substring(0, text.length + 1));
        if (text === currentWord) {
          setIsDeleting(true);
          setTypingSpeed(2000); // Pause when full word is typed
        } else {
          setTypingSpeed(100); // Standard speed while typing
        }
      } else {
        setText(currentWord.substring(0, text.length - 1));
        if (text === '') {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
          setTypingSpeed(500); // Pause before starting next word
        } else {
          setTypingSpeed(50); // Faster delete speed
        }
      }
    };

    const timer = setTimeout(handleTyping, typingSpeed);
    return () => clearTimeout(timer);
  }, [text, isDeleting, wordIndex, typingSpeed]);

  const scrollToAbout = () => {
    const element = document.getElementById('about');
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const handlePrint = () => {
    const printContent = document.getElementById('cv-modal-content');
    if (printContent) {
      const originalContent = document.body.innerHTML;
      document.body.innerHTML = printContent.innerHTML;
      window.print();
      document.body.innerHTML = originalContent;
      // Refresh to restore React bindings
      window.location.reload();
    }
  };

  const socialLinks = [
    { icon: <Github size={20} />, url: PERSONAL_INFO.socials.github, id: 'hero-git' },
    { icon: <Linkedin size={20} />, url: PERSONAL_INFO.socials.linkedin, id: 'hero-in' },
    { icon: <Instagram size={20} />, url: PERSONAL_INFO.socials.instagram, id: 'hero-ig' },
  ];

  return (
    <section
      id="home"
      className="min-h-screen relative flex items-center bg-radial from-gray-50 via-white to-gray-50 pt-28 pb-12 overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-brand/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        {/* Left Column: Text Content */}
        <div className="lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left order-2 lg:order-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex self-center lg:self-start items-center space-x-2 bg-brand/10 border border-brand/20 text-brand-dark px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider"
          >
            <span>Welcome to my universe</span>
          </motion.div>

          <div className="space-y-4">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 leading-tight"
            >
              Hi, I'm <span className="text-gray-900 border-b-4 border-brand pb-1">{PERSONAL_INFO.name}</span>
            </motion.h1>

            {/* Typing Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="h-10 sm:h-12 flex items-center justify-center lg:justify-start"
            >
              <p className="font-display text-xl sm:text-2xl md:text-3xl font-medium text-gray-600">
                I am a{' '}
                <span className="text-brand font-semibold relative inline-block">
                  {text}
                  <span className="w-1 h-6 sm:h-8 bg-brand ml-1 animate-[pulse_1s_infinite] inline-block absolute bottom-1 right-[-6px]" />
                </span>
              </p>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-gray-600 text-base sm:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed font-light"
            >
              {PERSONAL_INFO.tagline}
            </motion.p>
          </div>

          {/* Social Icons & Call To Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6 pt-2"
          >
            <div className="flex flex-wrap items-center justify-center gap-3 sm:flex-nowrap">
              <button
                id="hero-hire-btn"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gray-900 hover:bg-brand hover:text-gray-900 text-white text-sm sm:text-base font-semibold px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl shadow-lg transition-all duration-300 cursor-pointer focus:outline-hidden"
              >
                Hire Me
              </button>
              <button
                id="hero-cv-btn"
                onClick={() => setIsCVModalOpen(true)}
                className="bg-white hover:bg-gray-50 border border-gray-300 text-gray-800 text-sm sm:text-base font-semibold px-5 py-2.5 sm:px-8 sm:py-4 rounded-xl shadow-xs transition-all duration-300 cursor-pointer focus:outline-hidden flex items-center space-x-2"
              >
                <span>View CV / Resume</span>
              </button>
            </div>

            {/* Socials Divider */}
            <span className="hidden sm:inline w-px h-8 bg-gray-300" />

            {/* Social Connections */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  id={social.id}
                  href={social.url}
                  target="_blank"
                  referrerPolicy="no-referrer"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:border-brand hover:bg-brand/10 transition-all duration-300"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right Column: Hero Visual Photo */}
        <div className="lg:col-span-5 flex justify-center order-1 lg:order-2">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-72 h-72 sm:w-96 sm:h-96"
          >
            {/* Geometric golden circle background */}
            <div className="absolute inset-0 bg-brand rounded-full scale-95 blur-xs" />
            
            {/* Border frame */}
            <div className="absolute inset-[-12px] border-2 border-dashed border-brand/50 rounded-full animate-[spin_40s_linear_infinite]" />

            {/* Actual image wrapper */}
            <div className="absolute inset-2 bg-gray-100 rounded-full overflow-hidden border-4 border-white shadow-2xl relative">
              <img
                src={PERSONAL_INFO.avatar}
                alt={PERSONAL_INFO.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
              />
            </div>

            {/* Interactive Stats Badge */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute bottom-1 right-0 sm:bottom-4 sm:right-[-20px] scale-75 sm:scale-100 origin-bottom-right bg-white border border-gray-100 shadow-xl py-2 px-3 sm:py-3 sm:px-5 rounded-xl sm:rounded-2xl flex items-center space-x-2 sm:space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-brand/20 flex items-center justify-center text-brand-dark font-bold text-lg">
                5+
              </div>
              <div>
                <p className="text-xs text-gray-500 font-medium">Years of</p>
                <p className="text-sm text-gray-800 font-bold leading-tight">Experience</p>
              </div>
            </motion.div>

            {/* Success rates badge */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            className="absolute top-2 -left-2 sm:top-12 sm:left-[-30px] scale-75 sm:scale-100 origin-top-left bg-white border border-gray-100 shadow-xl py-2 px-3 sm:py-3 sm:px-5 rounded-xl sm:rounded-2xl flex items-center space-x-2 sm:space-x-3"
            >
              <div className="w-3 h-3 rounded-full bg-emerald-500 animate-ping" />
              <div>
                <p className="text-xs text-gray-500 font-medium">Availability</p>
                <p className="text-sm text-gray-800 font-bold leading-tight">Available to Hire</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* ================= RESUME / CV MODAL POPUP ================= */}
      <AnimatePresence>
        {isCVModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCVModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 350 }}
              className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden relative z-10 border border-gray-100"
            >
              {/* Top sticky action header */}
              <div className="px-6 py-4 bg-gray-900 border-b border-gray-800 text-white flex items-center justify-between shrink-0">
                <div className="flex items-center space-x-2">
                  <Award className="text-brand" size={20} />
                  <span className="font-display font-bold text-sm sm:text-base">Interactive Professional CV</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={handlePrint}
                    className="flex items-center space-x-1.5 bg-brand hover:bg-brand-dark hover:text-white text-gray-900 px-4 py-2 rounded-xl font-semibold text-xs transition-colors cursor-pointer focus:outline-hidden"
                  >
                    <Printer size={14} />
                    <span>Print / Save PDF</span>
                  </button>
                  <button
                    onClick={() => setIsCVModalOpen(false)}
                    className="text-gray-400 hover:text-white p-2 rounded-xl hover:bg-gray-800 transition-colors cursor-pointer"
                    aria-label="Close modal"
                  >
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Printable Area Wrapper */}
              <div className="overflow-y-auto p-6 sm:p-10 flex-1 bg-slate-50 font-sans" id="cv-modal-content">
                <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-12 text-gray-800 max-w-3xl mx-auto space-y-8">
                  
                  {/* CV Header */}
                  <div className="text-center pb-8 border-b border-gray-100">
                    <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 tracking-tight font-display">
                      {PERSONAL_INFO.name}
                    </h2>
                    <p className="text-brand-dark font-semibold text-sm tracking-widest uppercase mt-1">
                      {PERSONAL_INFO.title}
                    </p>
                    
                    {/* Contacts row */}
                    <div className="flex flex-wrap justify-center items-center gap-x-6 gap-y-2 mt-4 text-xs sm:text-sm text-gray-500 font-light">
                      <div className="flex items-center space-x-1.5">
                        <Mail size={14} className="text-brand-dark" />
                        <span>{PERSONAL_INFO.email}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <Phone size={14} className="text-brand-dark" />
                        <span>{PERSONAL_INFO.phone}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <MapPin size={14} className="text-brand-dark" />
                        <span>{PERSONAL_INFO.address}</span>
                      </div>
                    </div>
                  </div>

                  {/* Professional Profile */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-gray-900 uppercase border-b border-gray-100 pb-1.5">
                      Professional Profile
                    </h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-light text-justify">
                      {PERSONAL_INFO.bio}
                    </p>
                  </div>

                  {/* Core Competencies Matrix */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-gray-900 uppercase border-b border-gray-100 pb-1.5">
                      Core Competencies
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
                      <div className="flex items-start space-x-2">
                        <span className="text-brand font-bold mt-0.5">•</span>
                        <span><strong>AI & Productivity:</strong> AI-Augmented Development, Prompt Engineering, Ollama/LM Studio</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-brand font-bold mt-0.5">•</span>
                        <span><strong>Cloud Computing:</strong> AWS (EC2, S3, IAM, VPC), Terraform Infrastructure-as-Code</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-brand font-bold mt-0.5">•</span>
                        <span><strong>Web Systems:</strong> Hardened WordPress, WooCommerce, Custom Plugins, React & Node.js</span>
                      </div>
                      <div className="flex items-start space-x-2">
                        <span className="text-brand font-bold mt-0.5">•</span>
                        <span><strong>Security:</strong> CMS Hardening, OWASP mitigation, Firewall tuning, Vulnerability audits</span>
                      </div>
                    </div>
                  </div>

                  {/* Experience Timeline */}
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-lg text-gray-900 uppercase border-b border-gray-100 pb-1.5">
                      Professional Experience
                    </h3>
                    <div className="space-y-6">
                      {EXPERIENCE.map((exp, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                            <h4 className="font-bold text-gray-900 text-sm sm:text-base">{exp.role}</h4>
                            <span className="text-xs font-semibold text-brand-dark uppercase bg-brand/10 px-2.5 py-0.5 rounded-md mt-1 sm:mt-0 self-start">
                              {exp.period}
                            </span>
                          </div>
                          <p className="text-xs sm:text-sm font-medium text-gray-400">{exp.company}</p>
                          <ul className="list-disc list-outside pl-4 pt-2 space-y-1 text-xs sm:text-sm text-gray-600 font-light">
                            {exp.details.map((b, i) => (
                              <li key={i}>{b}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Education & Academic Merits */}
                  <div className="space-y-4">
                    <h3 className="font-display font-bold text-lg text-gray-900 uppercase border-b border-gray-100 pb-1.5">
                      Education
                    </h3>
                    <div className="grid grid-cols-1 gap-4">
                      {EDUCATION_DATA.map((edu, idx) => (
                        <div key={idx} className="flex justify-between items-start">
                          <div>
                            <h4 className="font-bold text-gray-800 text-sm">{edu.degree}</h4>
                            <p className="text-xs text-gray-500">{edu.school}</p>
                          </div>
                          <span className="text-xs font-semibold text-gray-400 bg-gray-100 px-2.5 py-0.5 rounded-md">
                            {edu.year}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications & Training credentials */}
                  <div className="space-y-3">
                    <h3 className="font-display font-bold text-lg text-gray-900 uppercase border-b border-gray-100 pb-1.5">
                      Technical Certifications
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600">
                      {CERTIFICATIONS.map((cert, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <span className="text-brand font-bold">•</span>
                          <span><strong>{cert.name}</strong> ({cert.issuer})</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom persistent modal footer */}
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-end space-x-3 shrink-0">
                <button
                  onClick={() => setIsCVModalOpen(false)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-5 py-2.5 rounded-xl text-xs transition-colors cursor-pointer focus:outline-hidden"
                >
                  Close View
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-semibold px-5 py-2.5 rounded-xl text-xs transition-all duration-300 cursor-pointer focus:outline-hidden"
                >
                  Print Resume
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
