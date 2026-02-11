// Panel content for cinematic horizontal scroll section.
// Table + laptop imagery with black & white effect. Replace with your own assets in /public if needed.
const baseImg = (id, w = 1200) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&q=85`;

// Single table + laptop image used across panels (B&W effect applied in CSS)
const tableLaptopImg = baseImg("1517694712202-14dd9538aa97"); // Laptop on table/desk

export const horizontalPanels = [
  {
    id: 0,
    title: "I'M TARUN",
    subtitle: "Portfolio 2026",
    description:
      "Creative Developer & UI Designer based in India. I build experiences that resonate and perform.",
    email: "tarun.anand2127@gmail.com",
    cta: "Start a Project",
    ctaLink: "/contact",
    image: tableLaptopImg,
    imageAlt: "Table and laptop",
    gradient: "from-neutral-950 via-neutral-900/95 to-neutral-950",
    hero: true,
  },
  {
    id: 1,
    title: "The Vision",
    subtitle: "Who I Am",
    description:
      "I bridge design and engineering. I don't just write code—I craft experiences that resonate and perform.",
    cta: "Start a Project",
    ctaLink: "/contact",
    image: tableLaptopImg,
    imageAlt: "Table and laptop",
    gradient: "from-neutral-950 via-neutral-900/95 to-neutral-950",
  },
  {
    id: 2,
    title: "The Craft",
    subtitle: "My Approach",
    description:
      "Obsessive attention to micro-interactions, fluid typography, and performance. Every pixel serves a purpose.",
    cta: "View Work",
    ctaLink: "/projects",
    image: tableLaptopImg,
    imageAlt: "Table and laptop",
    gradient: "from-neutral-950 via-neutral-900/90 to-neutral-950",
  },
  {
    id: 3,
    title: "The Stack",
    subtitle: "Tools of Choice",
    description:
      "React, Framer Motion, GSAP, Node.js—deeply integrated to build performant, award-worthy applications.",
    cta: "See Skills",
    ctaLink: "/skills",
    image: tableLaptopImg,
    imageAlt: "Table and laptop",
    gradient: "from-neutral-950 via-zinc-900/90 to-neutral-950",
  },
  {
    id: 4,
    title: "The Goal",
    subtitle: "Looking Forward",
    description:
      "Always seeking the next challenge. Ready to build the impossible and redefine the digital landscape.",
    cta: "Get in Touch",
    ctaLink: "/contact",
    image: tableLaptopImg,
    imageAlt: "Table and laptop",
    gradient: "from-neutral-950 via-neutral-900/95 to-neutral-950",
  },
  {
    id: 5,
    title: "The Impact",
    subtitle: "What We Build",
    description:
      "From concept to deployment—brand identities, systems, and apps that captivate and convert.",
    cta: "Explore",
    ctaLink: "/projects",
    image: tableLaptopImg,
    imageAlt: "Table and laptop",
    gradient: "from-neutral-950 via-neutral-900/90 to-neutral-950",
  },
];
