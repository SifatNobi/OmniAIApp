import type { NavItem, Feature, Testimonial, FAQItem, Stat, SocialLink, MarketplaceItem } from "@/types";

export const siteConfig = {
  name: "OmniAIApp",
  tagline: "One Platform. Every AI.",
  description:
    "OmniAIApp is an AI-native platform for Desktop and Android that unifies the world's best AI models, AI agents, AI extensions, MCP servers, workflows, and an open marketplace into one seamless experience.",
  url: "https://omniai.app",
  ogImage: "https://omniai.app/og-image.png",
  links: {
    twitter: "https://x.com/OmniAIApp",
    facebook: "https://www.facebook.com/share/1BP636g8tz/",
    discord: "https://discord.gg/htXAEYPfn",
    instagram: "https://www.instagram.com/omniaiapp?igsh=MTl4cXZuZTJ6cW14Zg==",
    youtube: "https://youtube.com/@omniaiapp?si=FYPmeDmd_WG0gvZr",
  },
};

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Features", href: "/features" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export const features: Feature[] = [
  {
    title: "Multiple AI Models",
    description: "Access leading AI models from OpenAI, Anthropic, Google, Meta, Mistral, and more in one unified interface.",
    icon: "brain",
  },
  {
    title: "AI Agents",
    description: "Deploy intelligent agents that autonomously complete complex tasks across multiple tools and services.",
    icon: "bot",
  },
  {
    title: "AI Extensions",
    description: "Extend functionality with powerful AI-powered extensions that integrate with your workflow.",
    icon: "puzzle",
  },
  {
    title: "Open Marketplace",
    description: "Discover and install community-built AI models, agents, extensions, and tools from our open marketplace.",
    icon: "store",
  },
  {
    title: "MCP Server Support",
    description: "Connect to Model Context Protocol servers for real-time data, tools, and capabilities.",
    icon: "server",
  },
  {
    title: "Workflow Automation",
    description: "Create automated workflows that chain AI models, agents, and tools together seamlessly.",
    icon: "workflow",
  },
  {
    title: "BYOK",
    description: "Bring Your Own API Key to use your existing subscriptions across all supported AI providers.",
    icon: "key",
  },
  {
    title: "Desktop App",
    description: "A native desktop experience for Windows, macOS, and Linux with full offline capabilities.",
    icon: "monitor",
  },
  {
    title: "Android App",
    description: "Take OmniAIApp on the go with our feature-rich Android application.",
    icon: "smartphone",
  },
  {
    title: "Privacy First",
    description: "Your data stays on your device. End-to-end encryption ensures complete privacy and security.",
    icon: "shield",
  },
  {
    title: "Cloud Sync",
    description: "Seamlessly sync your workspace, settings, and history across all your devices.",
    icon: "cloud",
  },
  {
    title: "Lightning Fast",
    description: "Optimized performance with instant responses, fast loading, and smooth interactions.",
    icon: "zap",
  },
  {
    title: "Customization",
    description: "Personalize every aspect of your workspace with themes, layouts, and custom configurations.",
    icon: "palette",
  },
  {
    title: "Secure Authentication",
    description: "Advanced security with biometric auth, 2FA, and hardware key support.",
    icon: "lock",
  },
];

export const stats: Stat[] = [
  { value: "100", label: "AI Integrations", suffix: "+" },
  { value: "1000", label: "Extensions", suffix: "+" },
  { value: "Unlimited", label: "Possibilities", suffix: "" },
  { value: "One", label: "Workspace", suffix: "" },
];

export const testimonials: Testimonial[] = [
  {
    name: "Alex Chen",
    role: "AI Engineer",
    company: "TechCorp",
    content:
      "OmniAIApp has completely transformed how I work with AI models. Having everything in one place is a game-changer.",
    avatar: "/avatars/avatar-1.svg",
  },
  {
    name: "Sarah Johnson",
    role: "Product Designer",
    company: "DesignStudio",
    content:
      "The marketplace is incredible. I found exactly the extensions I needed for my workflow in minutes.",
    avatar: "/avatars/avatar-2.svg",
  },
  {
    name: "Marcus Williams",
    role: "Software Developer",
    company: "DevOps Inc",
    content:
      "The MCP server integration is brilliant. Being able to connect real-time data sources directly to AI models is powerful.",
    avatar: "/avatars/avatar-3.svg",
  },
  {
    name: "Emily Rodriguez",
    role: "Data Scientist",
    company: "DataDriven",
    content:
      "Finally, a platform that takes privacy seriously. I love that my data stays on my device.",
    avatar: "/avatars/avatar-4.svg",
  },
  {
    name: "David Kim",
    role: "Startup Founder",
    company: "AI Ventures",
    content:
      "The workflow automation feature alone is worth it. I've automated hours of manual work every day.",
    avatar: "/avatars/avatar-5.svg",
  },
];

export const faqItems: FAQItem[] = [
  {
    question: "What is OmniAIApp?",
    answer:
      "OmniAIApp is an all-in-one AI platform for Desktop and Android that unifies multiple AI models, agents, extensions, MCP servers, and workflows into a single, seamless experience. It's designed for power users who want the best AI tools without switching between dozens of apps.",
  },
  {
    question: "How does Bring Your Own Key (BYOK) work?",
    answer:
      "BYOK allows you to use your existing API keys from AI providers like OpenAI, Anthropic, Google, and others. Simply add your keys in the settings, and OmniAIApp will route your requests through your own accounts, giving you full control over usage and billing.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "Absolutely. OmniAIApp is built with privacy first. All data processing happens locally on your device. We use end-to-end encryption for sync features, and we never train on your data. Your conversations, files, and settings belong to you.",
  },
  {
    question: "What platforms are supported?",
    answer:
      "OmniAIApp is available as a native desktop application for Windows, macOS, and Linux, as well as a mobile app for Android. iOS support is coming soon. Your workspace syncs seamlessly across all your devices.",
  },
  {
    question: "What is the Open Marketplace?",
    answer:
      "The Open Marketplace is a community-driven platform where developers and creators publish AI models, agents, extensions, MCP servers, and tools. You can browse, install, and even publish your own creations to the community.",
  },
  {
    question: "What are MCP Servers?",
    answer:
      "Model Context Protocol (MCP) servers provide real-time data, tools, and capabilities to AI models. They enable your AI to access databases, APIs, file systems, and more, making AI interactions more powerful and context-aware.",
  },
  {
    question: "Can I create custom workflows?",
    answer:
      "Yes! OmniAIApp includes a powerful workflow automation engine that lets you chain together AI models, agents, tools, and MCP servers. You can create complex automations with a visual builder or write them programmatically.",
  },
  {
    question: "Is there a free version?",
    answer:
      "During our testing phase, OmniAIApp is completely free to use. Early adopters get access to all features. When we launch our pricing plans, waitlist members will receive exclusive benefits and priority access.",
  },
];

export const marketplaceCategories = [
  "All",
  "Coding",
  "Writing",
  "Research",
  "Business",
  "Marketing",
  "Education",
  "Design",
  "Productivity",
  "AI Agents",
  "MCP Servers",
  "Extensions",
];

export const marketplaceItems: MarketplaceItem[] = [
  {
    title: "CodeGen Pro",
    description: "Advanced code generation agent with support for 50+ programming languages.",
    category: "Coding",
    rating: 4.9,
    downloads: "50K+",
    image: "/marketplace/codegen.svg",
    featured: true,
    trending: true,
    popular: true,
  },
  {
    title: "Content Writer AI",
    description: "Professional writing assistant for blogs, articles, and marketing copy.",
    category: "Writing",
    rating: 4.8,
    downloads: "35K+",
    image: "/marketplace/writer.svg",
    featured: true,
    trending: false,
    popular: true,
  },
  {
    title: "Research Assistant",
    description: "Deep research agent that analyzes documents, papers, and web content.",
    category: "Research",
    rating: 4.7,
    downloads: "28K+",
    image: "/marketplace/research.svg",
    featured: false,
    trending: true,
    popular: true,
  },
  {
    title: "Data Analyzer",
    description: "AI-powered data analysis and visualization tool for business intelligence.",
    category: "Business",
    rating: 4.6,
    downloads: "22K+",
    image: "/marketplace/data.svg",
    featured: true,
    trending: false,
    popular: false,
  },
  {
    title: "Social Media Manager",
    description: "Automate social media content creation, scheduling, and analytics.",
    category: "Marketing",
    rating: 4.5,
    downloads: "18K+",
    image: "/marketplace/social.svg",
    featured: false,
    trending: true,
    popular: false,
  },
  {
    title: "Tutor AI",
    description: "Personalized learning assistant with interactive lessons and quizzes.",
    category: "Education",
    rating: 4.8,
    downloads: "15K+",
    image: "/marketplace/tutor.svg",
    featured: true,
    trending: true,
    popular: true,
  },
  {
    title: "Design Assistant",
    description: "AI design tool for generating UI mockups, icons, and visual assets.",
    category: "Design",
    rating: 4.7,
    downloads: "20K+",
    image: "/marketplace/design.svg",
    featured: false,
    trending: false,
    popular: true,
  },
  {
    title: "Email Automator",
    description: "Smart email composition and automation agent for productivity.",
    category: "Productivity",
    rating: 4.6,
    downloads: "12K+",
    image: "/marketplace/email.svg",
    featured: false,
    trending: true,
    popular: false,
  },
];

export const socialLinks: SocialLink[] = [
  { name: "Twitter", url: "https://x.com/OmniAIApp", icon: "twitter" },
  { name: "Facebook", url: "https://www.facebook.com/share/1BP636g8tz/", icon: "facebook" },
  { name: "Discord", url: "https://discord.gg/htXAEYPfn", icon: "discord" },
  { name: "Instagram", url: "https://www.instagram.com/omniaiapp?igsh=MTl4cXZuZTJ6cW14Zg==", icon: "instagram" },
  { name: "YouTube", url: "https://youtube.com/@omniaiapp?si=FYPmeDmd_WG0gvZr", icon: "youtube" },
];
