export interface NavItem {
  label: string;
  href: string;
}

export interface Feature {
  title: string;
  description: string;
  icon: string;
}

export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface MarketplaceItem {
  title: string;
  description: string;
  category: string;
  rating: number;
  downloads: string;
  image: string;
  featured: boolean;
  trending: boolean;
  popular: boolean;
}

export interface Stat {
  value: string;
  label: string;
  suffix?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
