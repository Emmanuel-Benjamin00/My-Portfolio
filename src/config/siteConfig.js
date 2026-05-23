// ─────────────────────────────────────────────────────────────────────
// Edit this file to update your portfolio.
// Sections with `show: false` are hidden until you flip them to true.
// ─────────────────────────────────────────────────────────────────────

export const siteConfig = {
  name: "Emmanuel Benjamin",
  shortName: "Emmanuel",
  title: "Full Stack & Mobile Developer",
  tagline:
    "I build modern web and mobile experiences with React, React Native, and Python.",
  initials: "EB",
  location: "Chennai, India",
  locationShort: "Chennai",
  yearsOfExperience: 2,
  email: "emmanuel26112000@gmail.com",
  phone: "+91 9445482366",
  resume:
    "https://drive.google.com/file/d/13VAKfNG2Jyq5lYWRyHYLaHmtUUwx7VJG/view?usp=sharing",

  socials: {
    linkedin: "https://www.linkedin.com/in/emmanuel-b-b5145593/",
    github: "https://github.com/Emmanuel-Benjamin00",
    whatsapp: "https://wa.me/9445482366",
  },

  about: {
    headline:
      "2 years of building production-grade web and mobile applications.",
    bio: [
      "I'm Emmanuel — a Full Stack Developer based in Chennai. I build clean, performant web and mobile applications using React, React Native, Python, and Django REST Framework.",
      "B.Tech graduate (2022). Started my career at TVS Electronics, then transitioned into full-stack development and have been shipping production features ever since.",
      "I care about writing readable code, building usable products, and continuously learning. Outside of work, I explore new frameworks, build side projects, and look for ways to improve developer experience.",
    ],
  },

  // ── Experience timeline ─────────────────────────────────────────
  // Edit / add roles here. Set hidden: true on any item to hide it.
  experience: [
    {
      company: "AIQ",
      role: "Full Stack Developer",
      period: "2023 — Present",
      // TODO: replace with real bullets about your AIQ work
      description:
        "Building production web applications with React on the frontend and Python/DRF on the backend. Working across the full stack on features, deployments, and code reviews.",
      hidden: false,
    },
    {
      company: "TVS Electronics",
      role: "Graduate Engineer Trainee",
      period: "June 2022 — June 2023",
      description:
        "Worked as Repair, Testing and QA specialist on hardware appliances. Maintained internal record-keeping software, later transitioned into JavaScript-based development.",
      hidden: false,
    },
  ],

  // ── Skills (used on About page) ─────────────────────────────────
  // The icons themselves come from src/data/SkillData.jsx.
  // Override the displayed grouping here if you want.
  skillGroups: [
    {
      label: "Frontend",
      items: ["React", "React Native", "JavaScript", "HTML", "CSS", "Bootstrap"],
    },
    {
      label: "Backend",
      items: ["Python", "Django REST Framework", "Node.js", "REST APIs"],
    },
    {
      label: "Database & Cloud",
      items: ["MongoDB", "PostgreSQL", "Azure", "AWS"],
    },
    {
      label: "Tools",
      items: ["Git", "GitHub", "NPM", "VS Code"],
    },
  ],

  // ── Featured projects shown on the Home page ────────────────────
  // Values are titles that must match entries in src/data/projectData.jsx.
  featuredProjects: [
    "E-Commerce Website",
    "Chat Web Page",
    "Restaurant Landing Page",
  ],

  // ── Sections you'll fill in later (hidden by default) ───────────

  // Calendly link for "Book a call" CTA. Add URL + flip show to true.
  bookACall: {
    show: false,
    calendlyUrl: "", // e.g. https://calendly.com/your-handle/30min
  },

  // Blog: set show=true once you've added posts below
  blog: {
    show: false,
    posts: [
      // Example shape — keep commented until you add real posts
      // {
      //   slug: "first-post",
      //   title: "Why I rebuilt my portfolio",
      //   excerpt: "A short note on shipping in public.",
      //   date: "2026-05-23",
      //   url: "https://dev.to/...",
      // },
    ],
  },

  // Testimonials from colleagues / managers
  testimonials: {
    show: false,
    items: [
      // {
      //   quote: "Emmanuel ships clean code and ships it fast.",
      //   author: "Manager Name",
      //   role: "Engineering Manager, AIQ",
      // },
    ],
  },

  // "What I'm currently working on" / Now page
  currentlyWorkingOn: {
    show: false,
    items: [
      // "Building a SaaS dashboard at AIQ",
      // "Writing about React performance",
    ],
  },

  // Awards / achievements
  achievements: {
    show: false,
    items: [
      // { title: "Best Project Award", org: "GUVI", year: "2023" },
    ],
  },
};
