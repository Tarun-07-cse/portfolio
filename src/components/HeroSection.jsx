import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';
import lightHeroImage from '../../asset/LIGHT.png';
import darkHeroImage from '../../asset/DARK.png';

gsap.registerPlugin(ScrollTrigger);

const HERO = {
  subtitle: 'Portfolio 2026',
  title: "I'M TARUN",
  description: 'Creative Developer & UI Designer based in India. I build experiences that resonate and perform.',
  email: 'tarun.anand2127@gmail.com',
  cta: 'Start a Project',
  ctaLink: '/contact',
  // Local cinematic desk images (light + dark variants)
  imageLight: lightHeroImage,
  imageDark: darkHeroImage,
  imageAlt: 'Laptop on desk at night',
};

// Higher scrub value = smoother, more inertial feeling
const SCRUB = 2;

export default function HeroSection() {
  const wrapperRef = useRef(null);
  const containerRef = useRef(null);
  const lightImageRef = useRef(null);
  const darkImageRef = useRef(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    // Initial image states for smooth crossfade
    gsap.set(lightImageRef.current, { opacity: 1, xPercent: 0 });
    gsap.set(darkImageRef.current, { opacity: 0, xPercent: 10 });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          // Horizontal animation lasts for exactly one viewport of
          // vertical scroll (100vh), then normal vertical scroll resumes.
          end: () => '+=' + window.innerHeight,
          pin: true,
          scrub: SCRUB,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // Horizontal movement: shift by exactly one viewport width (one panel)
      tl.to(
        container,
        {
          // Keep ease 'none' so ScrollTrigger + scrub
          // handle the smoothing tied to scroll velocity
          x: () => -window.innerWidth,
          ease: 'none',
        },
        0
      );

      const light = lightImageRef.current;
      const dark = darkImageRef.current;

      // Gradually darken the hero background as we scroll
      tl.fromTo(
        wrapper,
        { backgroundColor: '#ffffff' },
        { backgroundColor: '#000000', ease: 'power1.inOut' },
        0.25
      );

      // Crossfade between light and dark images for a \"same image turning dark\" feel
      if (light && dark) {
        tl.to(
          light,
          {
            opacity: 0,
            xPercent: -20,
            ease: 'power2.out',
          },
          0.2
        );

        tl.fromTo(
          dark,
          { opacity: 0, xPercent: 20 },
          {
            opacity: 1,
            xPercent: 0,
            ease: 'power2.out',
          },
          0.35
        );
      }

      ScrollTrigger.refresh();
    }, wrapper);

    const refresh = () => ScrollTrigger.refresh();
    const raf = requestAnimationFrame(() => {
      refresh();
      setTimeout(refresh, 100);
    });
    window.addEventListener('resize', refresh);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', refresh);
      ctx.revert();
    };
  }, []);

  return (
    <section ref={wrapperRef} className="hero-wrapper hero-section">
      <div ref={containerRef} className="hero-container">
        {/* PANEL 1: Light hero – text left, light image right */}
        <div className="panel hero-panel hero-panel-intro">
          <div className="flex h-full w-full flex-col lg:flex-row items-center justify-between px-6 py-20 md:px-12 lg:px-16 gap-12">
            <div className="hero-content flex-1 max-w-xl">
              <span className="hero-text text-xs font-mono uppercase tracking-[0.3em] text-black/50 mb-6 block">
                {HERO.subtitle}
              </span>
              <h1 className="hero-text font-display font-bold text-black leading-[1.05] tracking-tighter mb-8 text-5xl md:text-7xl lg:text-8xl">
                {HERO.title}
              </h1>
              <p className="hero-text text-lg md:text-xl text-black/60 leading-relaxed max-w-lg mb-6">
                {HERO.description}
              </p>
              <a
                href={`mailto:${HERO.email}`}
                className="hero-text text-black/70 hover:opacity-90 text-lg mb-10 block"
                data-cursor="view"
              >
                {HERO.email}
              </a>
              <Link to={HERO.ctaLink} data-cursor="explore">
                <span className="hero-text hero-cta inline-flex items-center gap-3 px-8 py-4 rounded-full border border-black/20 text-black font-medium hover:bg-black hover:text-white hover:border-black transition-colors duration-300">
                  {HERO.cta}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>

            <div className="flex-1 flex items-center justify-center">
              <div
                ref={lightImageRef}
                className="hero-right-image w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden bg-neutral-900/10 border border-black/5 shadow-2xl"
              >
                <img
                  src={HERO.imageLight}
                  alt={HERO.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* PANEL 2: Dark hero – dark image left, qualifications right */}
        <div className="panel hero-panel hero-panel-qual bg-black text-white">
          <div className="flex h-full w-full flex-col lg:flex-row items-center justify-between px-6 py-20 md:px-12 lg:px-16 gap-12">
            <div className="flex-1 flex items-center justify-center order-2 lg:order-1">
              <div
                ref={darkImageRef}
                className="hero-right-image w-full max-w-xl aspect-[4/3] rounded-2xl overflow-hidden bg-black border border-white/10 shadow-2xl"
              >
                <img
                  src={HERO.imageDark}
                  alt={HERO.imageAlt}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            <div className="hero-content flex-1 max-w-xl order-1 lg:order-2 md:ml-8 lg:ml-16">
              <span className="hero-text text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-6 block">
                Background
              </span>
              <h2 className="hero-text font-display font-semibold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
                BE CSE at RIT
              </h2>
              <h3 className="hero-text font-display font-medium text-2xl md:text-3xl text-white/90 leading-tight mb-6">
                BS Data Science at IIT Madras
              </h3>
              <p className="hero-text text-lg md:text-xl text-white/70 leading-relaxed">
                Blending computer science fundamentals with data-driven thinking to design products that are both
                intelligent and beautifully crafted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
