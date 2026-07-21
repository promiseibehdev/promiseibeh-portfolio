import { motion } from 'motion/react';
import { Briefcase, GraduationCap, Award, FileText, CheckCircle2, ShieldCheck } from 'lucide-react';
import { PERSONAL_INFO, SKILLS, EXPERIENCE, EDUCATION_DATA, CERTIFICATIONS } from '../data';

export default function About() {
  const infoItems = [
    { label: 'Name', value: PERSONAL_INFO.name },
    { label: 'Degree', value: 'MSc in IT' },
    { label: 'Email', value: PERSONAL_INFO.email },
    { label: 'Phone', value: PERSONAL_INFO.phone },
    { label: 'Address', value: PERSONAL_INFO.address },
    { label: 'Freelance', value: PERSONAL_INFO.freelance, highlight: true },
  ];

  const technicalSkills = SKILLS.filter(s => s.category === 'technical');
  const professionalSkills = SKILLS.filter(s => s.category === 'professional');

  // Helper to resolve education icon dynamically
  const getEducationIcon = (iconName: string) => {
    switch (iconName) {
      case 'GraduationCap':
        return <GraduationCap size={18} className="text-gray-900" />;
      case 'Award':
        return <Award size={18} className="text-gray-900" />;
      default:
        return <FileText size={18} className="text-gray-900" />;
    }
  };

  return (
    <section id="about" className="py-24 bg-white border-b border-gray-50 scroll-mt-16">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        
        {/* ================= BIOGRAPHY & SKILLS GRID ================= */}
        <div className="text-center md:text-left mb-16">
          <p className="text-xs font-bold uppercase tracking-widest text-brand-dark mb-2">My Biography</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-gray-900 relative inline-block">
            About Me
            <span className="absolute bottom-[-8px] left-1/2 md:left-0 transform -translate-x-1/2 md:translate-x-0 w-16 h-1 bg-brand rounded-full" />
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Left Column: Bio & Quick Info */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="font-display text-xl md:text-2xl font-bold text-gray-800">
                I'm a Systems Engineer & AI-Augmented Developer
              </h3>
              <p className="text-gray-600 leading-relaxed font-light text-justify">
                {PERSONAL_INFO.bio}
              </p>
            </div>

            {/* Special Highlight Bullet */}
            <div className="p-5 bg-brand/10 border border-brand/20 rounded-2xl flex items-start space-x-3">
              <ShieldCheck className="text-brand-dark shrink-0 mt-0.5" size={22} />
              <div>
                <h4 className="font-display font-bold text-gray-800 text-sm">WordPress Integrity Guarantee</h4>
                <p className="text-xs text-gray-600 mt-1">
                  I construct custom high-performance WordPress systems and guarantee <strong>100% security hardening</strong> to mitigate code execution, vulnerabilities, and unauthorized access.
                </p>
              </div>
            </div>

            {/* Quick Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 border-t border-gray-100 pt-6">
              {infoItems.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-3 py-1">
                  <span className="text-sm font-semibold text-gray-500 w-20 shrink-0">{item.label}:</span>
                  <span className={`text-sm ${item.highlight ? 'text-brand-dark font-bold bg-brand/10 px-2.5 py-0.5 rounded-full text-xs' : 'text-gray-800 font-medium'}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap gap-4 justify-center sm:justify-start">
              <button
                id="about-hire-btn"
                onClick={() => {
                  const el = document.getElementById('contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-gray-900 hover:bg-brand hover:text-gray-900 text-white font-semibold text-sm px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer focus:outline-hidden"
              >
                Let's Collaborate
              </button>
            </div>
          </div>

          {/* Right Column: Skills Progress Bars */}
          <div className="lg:col-span-6 space-y-8">
            <div>
              <h3 className="font-display text-xl font-bold text-gray-800 mb-6">Technical Skills</h3>
              <div className="space-y-5">
                {technicalSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-900 font-bold">{skill.percentage}%</span>
                    </div>
                    {/* Background track */}
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      {/* Active bar with scroll trigger animation */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-brand rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <h3 className="font-display text-xl font-bold text-gray-800 mb-6">Professional Capabilities</h3>
              <div className="space-y-5">
                {professionalSkills.map((skill, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center text-sm font-medium">
                      <span className="text-gray-700">{skill.name}</span>
                      <span className="text-gray-900 font-bold">{skill.percentage}%</span>
                    </div>
                    {/* Background track */}
                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                      {/* Active bar with scroll trigger animation */}
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.percentage}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="h-full bg-slate-800 rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ================= DETAILED RESUME TIMELINE ================= */}
        <div className="border-t border-gray-100 mt-24 pt-20 grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Sub-Grid: Professional Experience */}
          <div className="lg:col-span-7 space-y-10">
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2.5 rounded-xl bg-gray-900 text-brand">
                <Briefcase size={22} />
              </div>
              <h3 className="font-display text-2xl font-bold text-gray-900">Professional Experience</h3>
            </div>

            <div className="relative border-l-2 border-gray-100 pl-6 space-y-12">
              {EXPERIENCE.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline point indicator */}
                  <div className="absolute left-[-31px] top-1.5 w-4 h-4 rounded-full border-2 border-white bg-gray-300 group-hover:bg-brand group-hover:scale-125 transition-all duration-300" />
                  
                  <div className="space-y-2">
                    {exp.period && (
                      <span className="text-xs font-bold text-brand-dark uppercase bg-brand/10 px-3 py-1 rounded-full">
                        {exp.period}
                      </span>
                    )}
                    <h4 className="font-display font-bold text-lg text-gray-900 group-hover:text-brand-dark transition-colors pt-2">
                      {exp.role}
                    </h4>
                    <p className="text-sm font-semibold text-gray-400">
                      {exp.company}
                    </p>
                    
                    {/* Bullet details */}
                    <ul className="mt-4 space-y-2.5">
                      {exp.details.map((bullet, bulletIdx) => (
                        <li key={bulletIdx} className="text-sm text-gray-500 font-light leading-relaxed flex items-start">
                          <span className="text-brand mr-2.5 mt-1 shrink-0">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Right Sub-Grid: Education & Certifications */}
          <div className="lg:col-span-5 space-y-14">
            
            {/* Education Sub-section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-gray-900 text-brand">
                  <GraduationCap size={22} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900">Education</h3>
              </div>

              <div className="space-y-6">
                {EDUCATION_DATA.map((edu, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="p-5 border border-gray-100 rounded-2xl bg-gray-50 flex items-start space-x-4 hover:shadow-md transition-shadow"
                  >
                    <div className="p-3 bg-brand rounded-xl shrink-0">
                      {getEducationIcon(edu.icon)}
                    </div>
                    <div>
                      {edu.year && <span className="text-xs font-bold text-gray-400">{edu.year}</span>}
                      <h4 className="font-display font-bold text-sm sm:text-base text-gray-800 leading-snug mt-1">
                        {edu.degree}
                      </h4>
                      <p className="text-xs sm:text-sm text-gray-500 font-light mt-0.5">
                        {edu.school}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Certifications Sub-section */}
            <div className="space-y-8">
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2.5 rounded-xl bg-gray-900 text-brand">
                  <Award size={22} />
                </div>
                <h3 className="font-display text-2xl font-bold text-gray-900">Certifications</h3>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {CERTIFICATIONS.map((cert, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 15 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="flex items-center space-x-3 p-3.5 border border-gray-100 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    <CheckCircle2 size={16} className="text-brand shrink-0" />
                    <div className="min-w-0">
                      <p className="font-display font-bold text-xs sm:text-sm text-gray-800 truncate">
                        {cert.name}
                      </p>
                      <p className="text-[11px] text-gray-400 mt-0.5 font-light">
                        {cert.issuer}{cert.date && ` • ${cert.date}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
