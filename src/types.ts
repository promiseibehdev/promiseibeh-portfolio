export interface Project {
  id: string;
  title: string;
  category: 'web' | 'automation' | 'branding';
  description: string;
  image: string;
  client: string;
  date: string;
  url: string;
  liveUrl?: string;
  githubUrl?: string;
  technologies: string[];
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string; // Dynamic mapping to Lucide Icons
  subtitle?: string;
  overview?: string;
  keyDeliverables?: string[];
  methodology?: { step: string; title: string; description: string }[];
  techStack?: string[];
}

export interface Skill {
  name: string;
  percentage: number;
  category: 'technical' | 'professional';
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  avatar: string;
  rating: number;
}

export interface BlogPost {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: string;
  image: string;
  date: string;
  readTime: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  date: string;
}
