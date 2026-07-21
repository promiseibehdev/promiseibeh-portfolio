import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { PERSONAL_INFO } from '../data';
import { ContactInquiry } from '../types';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [savedInquiries, setSavedInquiries] = useState<ContactInquiry[]>([]);

  // Load any existing inquiries from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem('thomson_contact_inquiries');
      if (stored) {
        setSavedInquiries(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load contact inquiries', e);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field-specific error as user types
    if (errors[name]) {
      setErrors((prev) => {
        const copy = { ...prev };
        delete copy[name];
        return copy;
      });
    }
  };

  const validate = () => {
    const tempErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) tempErrors.name = 'Full name is required';
    
    if (!formData.email.trim()) {
      tempErrors.email = 'Email address is required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) {
      tempErrors.email = 'Invalid email address';
    }

    if (!formData.subject.trim()) tempErrors.subject = 'Subject is required';
    if (!formData.message.trim()) {
      tempErrors.message = 'Message content is required';
    } else if (formData.message.trim().length < 10) {
      tempErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitSuccess(false);
    setSubmitError('');

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${PERSONAL_INFO.email}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          _subject: `New Portfolio Message: ${formData.subject.trim()}`,
          message: formData.message.trim(),
        })
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const newInquiry: ContactInquiry = {
        id: `inq-${Date.now()}`,
        name: formData.name.trim(),
        email: formData.email.trim(),
        subject: formData.subject.trim(),
        message: formData.message.trim(),
        date: new Date().toISOString(),
      };

      const updatedInquiries = [newInquiry, ...savedInquiries];
      localStorage.setItem('thomson_contact_inquiries', JSON.stringify(updatedInquiries));
      setSavedInquiries(updatedInquiries);

      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
      setSubmitSuccess(true);
      
      // Clear success notification after 5 seconds
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError('Failed to send message via form service. Please email directly or try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactCards = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email Address',
      value: PERSONAL_INFO.email,
      href: `mailto:${PERSONAL_INFO.email}`,
      id: 'contact-card-email',
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone Number',
      value: PERSONAL_INFO.phone,
      href: `tel:${PERSONAL_INFO.phone.replace(/\s+/g, '')}`,
      id: 'contact-card-phone',
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Office Location',
      value: PERSONAL_INFO.address,
      href: `https://maps.google.com/?q=${encodeURIComponent(PERSONAL_INFO.address)}`,
      id: 'contact-card-loc',
    },
  ];

  return (
    <section id="contact" className="py-24 bg-white scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">Get In Touch</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
            Contact Me
            <span className="absolute bottom-[-8px] left-1/2 transform -translate-x-1/2 w-16 h-1 bg-brand rounded-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct info cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <h3 className="font-display text-xl sm:text-2xl font-bold text-gray-800">
                Let's discuss your next project
              </h3>
              <p className="text-gray-500 font-light text-sm sm:text-base leading-relaxed">
                Whether you need a brand-new application built from scratch, refined design system advice, or an experienced engineer to join your technical team—I am always open to exploring exciting projects.
              </p>
            </div>

            {/* Cards Grid */}
            <div className="space-y-4">
              {contactCards.map((card) => (
                <a
                  key={card.id}
                  id={card.id}
                  href={card.href}
                  target="_blank"
                  rel="noreferrer"
                  referrerPolicy="no-referrer"
                  className="flex items-center space-x-4 p-5 rounded-2xl border border-gray-100 bg-gray-50 hover:bg-brand/5 hover:border-brand/40 transition-all duration-300 group"
                >
                  <div className="p-3.5 rounded-xl bg-brand/10 text-brand-dark group-hover:bg-brand group-hover:text-gray-900 transition-colors duration-300 shrink-0">
                    {card.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">
                      {card.title}
                    </h4>
                    <p className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors mt-0.5">
                      {card.value}
                    </p>
                  </div>
                </a>
              ))}
            </div>

            {/* Subtle disclaimer message */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-xl text-xs text-slate-400 font-medium text-center">
              * Powered by free-tier FormSubmit. Form submissions are delivered directly to {PERSONAL_INFO.email}.
            </div>
          </div>

          {/* Right Column: Form Container */}
          <div className="lg:col-span-7 bg-white border border-gray-100 p-8 sm:p-10 rounded-3xl shadow-xl relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Full Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-brand/30 ${
                      errors.name ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-gray-200 focus:border-brand'
                    }`}
                    placeholder="esther adams"
                  />
                  {errors.name && <p className="text-xs text-rose-500 flex items-center mt-1"><AlertCircle size={12} className="mr-1" />{errors.name}</p>}
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-brand/30 ${
                      errors.email ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-gray-200 focus:border-brand'
                    }`}
                    placeholder="esther@example.com"
                  />
                  {errors.email && <p className="text-xs text-rose-500 flex items-center mt-1"><AlertCircle size={12} className="mr-1" />{errors.email}</p>}
                </div>
              </div>

              {/* Row 2: Subject */}
              <div className="space-y-1.5">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-brand/30 ${
                    errors.subject ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-gray-200 focus:border-brand'
                  }`}
                  placeholder="Inquiry regarding design services"
                />
                {errors.subject && <p className="text-xs text-rose-500 flex items-center mt-1"><AlertCircle size={12} className="mr-1" />{errors.subject}</p>}
              </div>

              {/* Row 3: Message */}
              <div className="space-y-1.5">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-500">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 bg-gray-50 border rounded-xl text-sm transition-all focus:outline-hidden focus:bg-white focus:ring-2 focus:ring-brand/30 resize-none ${
                    errors.message ? 'border-rose-500 ring-2 ring-rose-500/10' : 'border-gray-200 focus:border-brand'
                  }`}
                  placeholder="Explain details of your project context..."
                />
                {errors.message && <p className="text-xs text-rose-500 flex items-center mt-1"><AlertCircle size={12} className="mr-1" />{errors.message}</p>}
              </div>

              {/* Submit Trigger */}
              <button
                type="submit"
                id="contact-submit-btn"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-brand hover:text-gray-900 disabled:bg-gray-400 text-white font-bold py-4 px-6 rounded-xl flex items-center justify-center space-x-2 shadow-lg transition-all duration-300 focus:outline-hidden cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    <span>Sending Inquiry...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Send Message</span>
                  </>
                )}
              </button>
            </form>

            {/* Success and Error Alerts overlay */}
            <AnimatePresence>
              {submitSuccess && (
                <motion.div
                  id="contact-success-toast"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute inset-x-8 bottom-8 bg-emerald-50 text-emerald-900 p-4 rounded-xl border border-emerald-100 flex items-center space-x-3 shadow-lg"
                >
                  <CheckCircle className="text-emerald-500 shrink-0" size={24} />
                  <div>
                    <h5 className="font-bold text-sm">Message Sent Successfully!</h5>
                    <p className="text-xs text-emerald-700 mt-0.5">Thank you for your message. Thomson will reach back soon.</p>
                  </div>
                </motion.div>
              )}

              {submitError && (
                <motion.div
                  id="contact-error-toast"
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  className="absolute inset-x-8 bottom-8 bg-rose-50 text-rose-900 p-4 rounded-xl border border-rose-100 flex items-center space-x-3 shadow-lg"
                >
                  <AlertCircle className="text-rose-500 shrink-0" size={24} />
                  <div>
                    <h5 className="font-bold text-sm">Submission Failed</h5>
                    <p className="text-xs text-rose-700 mt-0.5">{submitError}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
