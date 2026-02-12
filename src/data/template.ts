import type { TemplateName } from "@/types/template";

export const templateInfo: Record<TemplateName, { name: string; description: string }> = {
    'minimal-hero': {
      name: 'Minimal Hero',
      description: 'Clean hero section with image and call-to-action',
    },
    'content-focus': {
      name: 'Content Focus',
      description: 'Perfect for blogs and long-form content',
    },
    'portfolio-center': {
      name: 'Portfolio center',
      description: 'Showcase your work in a beautiful content',
    },
  };
export const minimalDefaults = {
  heroTitle: "Design emails that convert",
  heroSubtitle:
    "Create stunning, on-brand emails in minutes. No design skills needed. Join 100,000+ entrepreneurs growing their business with Flodesk.",
  featuresTitle: "Why creators love Flodesk",
  featuresText:
    "Beautiful templates, intuitive design tools, and powerful automation — all in one place. Build emails that look amazing on every device and turn subscribers into customers.",
  testimonialTitle: "Loved by small businesses",
  testimonialQuote:
    '"Flodesk completely transformed my email marketing. My open rates doubled, and I actually enjoy creating emails now. The templates are gorgeous and so easy to customize."',
  testimonialAuthor: "— Sarah Chen, Founder of Bloom Studio",
}

export const contentDefaults = {
  title: "The Ultimate Guide to Email Marketing",
  subtitle:
    "Everything you need to grow your audience and increase conversions",
  meta: "By Flodesk Team • Updated January 2024 • 8 min read",
  intro:
    "Email marketing remains one of the most powerful tools for connecting with your audience. With an average ROI of $42 for every $1 spent, it outperforms nearly every other marketing channel. In this guide, we'll show you how to create emails that your subscribers actually want to read.",
  section1Title: "Building Your Email List",
  section1Text:
    "The foundation of successful email marketing is a quality list. Focus on attracting subscribers who genuinely want to hear from you. Use lead magnets like free guides, templates, or exclusive content to encourage sign-ups. Remember: a smaller, engaged list will always outperform a large, uninterested one.",
  ctaTitle: "Ready to transform your email marketing?",
};
