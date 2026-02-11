import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { horizontalPanels } from '../../data/horizontalPanels';
import { projects } from '../../data/projects';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PANEL_COUNT = 8; // Hero(1) + Content(5) + Work(1) + Footer(1)
const SCRUB = 1.25;

export default function HorizontalPortfolio() {
  const wrapperRef = useRef(null);
  const pinnedRef = useRef(null);
  const containerRef = useRef(null);
  const lenis = useLenis();

  useEffect(() => {
    if (!lenis) return;
    lenis.on('scroll', ScrollTrigger.update);
    return () => lenis.off('scroll', ScrollTrigger.update);
  }, [lenis]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const pinned = pinnedRef.current;
    const container = containerRef.current;
    if (!wrapper || !pinned || !container) return;

    const ctx = gsap.context(() => {
      const endOffset = wrapper.offsetHeight;
      const moveDistance = () => -(container.offsetWidth - window.innerWidth);

      ScrollTrigger.create({
        trigger: wrapper,
        start: 'top top',
        end: () => `+=${endOffset}`,
        pin: pinned,
        scrub: SCRUB,
        anticipatePin: 1,
      });

      gsap.to(container, {
        x: moveDistance,
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${endOffset}`,
          scrub: SCRUB,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (PANEL_COUNT - 1),
            duration: { min: 0.2, max: 0.6 },
            ease: 'power2.inOut',
          },
        },
      });
    }, wrapper);

    const t = setTimeout(() => ScrollTrigger.refresh(), 150);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  return (
    <div
      ref={wrapperRef}
      className="horizontal-wrapper"
      style={{ height: `${PANEL_COUNT * 100}vh` }}
    >
      <div ref={pinnedRef} className="horizontal-pinned">
        <div
          ref={containerRef}
          className="horizontal-container"
          style={{ width: `${PANEL_COUNT * 100}vw` }}
        >
          {horizontalPanels.map((panel, index) => (
            <ContentPanel key={panel.id} panel={panel} index={index} />
          ))}
          <WorkPanel />
          <FooterPanel />
        </div>
      </div>
    </div>
  );
}

function ContentPanel({ panel, index }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const imgRef = useRef(null);
  const isHero = panel.hero;

  useEffect(() => {
    const section = sectionRef.current;
    const text = textRef.current;
    const img = imgRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'left 80%',
        end: 'left 20%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (text) {
            gsap.set(text, { opacity: p, x: (1 - p) * 48 });
          }
          if (img) {
            gsap.set(img, { opacity: p, scale: 0.98 + 0.02 * p });
          }
        },
      });
    }, section);
    return () => ctx.revert();
  }, [panel.id]);

  return (
    <section ref={sectionRef} className="horizontal-panel">
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.12]"
        style={{ backgroundImage: `url(${panel.image})`, filter: 'grayscale(1) contrast(1.05)' }}
        aria-hidden
      />
      <div className="absolute inset-0 z-[1] bg-white" aria-hidden />
      <div
        ref={textRef}
        className="relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 w-full h-full px-[6vw] py-[8vh] lg:px-[8vw]"
        style={{ opacity: 0 }}
      >
        <div className="flex-1 max-w-2xl">
          <span className="text-xs font-mono uppercase tracking-[0.3em] text-black/50 mb-6 block">
            {panel.subtitle}
          </span>
          <h2
            className={`font-display font-bold text-black leading-[1.05] tracking-tighter mb-8 ${
              isHero ? 'text-5xl md:text-7xl lg:text-8xl' : 'text-4xl md:text-5xl lg:text-6xl'
            }`}
          >
            {panel.title}
          </h2>
          <p className="text-lg md:text-xl text-black/60 leading-relaxed max-w-lg mb-6">
            {panel.description}
          </p>
          {isHero && panel.email && (
            <a
              href={`mailto:${panel.email}`}
              className="text-black/70 hover:text-black text-lg mb-8 block transition-colors"
              data-cursor="view"
            >
              {panel.email}
            </a>
          )}
          <Link to={panel.ctaLink} data-cursor="explore">
            <span className="inline-flex items-center gap-3 px-8 py-4 rounded-full border border-black/20 text-black font-medium hover:bg-black hover:text-white transition-colors duration-300">
              {panel.cta}
              <ArrowRight className="w-4 h-4" />
            </span>
          </Link>
        </div>
        {!isHero && (
          <div
            ref={imgRef}
            className="flex-shrink-0 w-full max-w-lg aspect-[4/3] rounded-2xl overflow-hidden border border-black/10 shadow-xl bg-neutral-100"
            style={{ opacity: 0 }}
          >
            <img
              src={panel.image}
              alt={panel.imageAlt}
              className="w-full h-full object-cover"
              style={{ filter: 'grayscale(1) contrast(1.08)' }}
            />
          </div>
        )}
      </div>
    </section>
  );
}

function WorkPanel() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'left 85%',
        end: 'left 15%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (heading) gsap.set(heading, { opacity: p, y: (1 - p) * 24 });
          if (grid) gsap.set(grid, { opacity: p, y: (1 - p) * 16 });
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="horizontal-panel bg-black text-white">
      <div className="w-full h-full flex flex-col px-[6vw] py-[8vh] lg:px-[8vw]">
        <div ref={headingRef} className="flex items-end justify-between mb-16 border-b border-white/20 pb-8" style={{ opacity: 0 }}>
          <h2 className="text-4xl md:text-6xl font-display font-bold tracking-tighter">SELECTED WORK</h2>
          <Link to="/projects" className="hidden md:flex items-center gap-2 text-white/50 hover:text-white transition-colors" data-cursor="explore">
            View All <ArrowRight size={16} />
          </Link>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-16 flex-1 content-start"
          style={{ opacity: 0 }}
        >
          {projects.slice(0, 4).map((project) => (
            <Link key={project.id} to={`/projects/${project.slug}`} className="group block">
              <div className="aspect-[4/3] bg-neutral-900 rounded-lg overflow-hidden relative mb-4">
                {project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                    <span className="text-5xl font-display font-bold text-white/10">{project.title.slice(0, 2)}</span>
                  </div>
                )}
              </div>
              <h3 className="text-xl md:text-2xl font-bold mb-1 group-hover:text-white/90 transition-colors">{project.title}</h3>
              <p className="text-white/50 text-sm">{project.type} — {project.domain}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function FooterPanel() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const content = contentRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'left 80%',
        end: 'left 20%',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          if (content) gsap.set(content, { opacity: p, y: (1 - p) * 32 });
        },
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="horizontal-panel bg-black text-white">
      <div ref={contentRef} className="w-full h-full flex flex-col justify-center px-[6vw] lg:px-[8vw]" style={{ opacity: 0 }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-20">
          <div>
            <h3 className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-widest">Services</h3>
            <ul className="space-y-4 text-xl font-light text-gray-300">
              {['Visual Identities', 'Product Design', 'Webflow / Development', 'Creative Direction'].map((item) => (
                <li key={item} className="hover:text-white transition-colors">{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-mono text-gray-500 mb-6 uppercase tracking-widest">Connect</h3>
            <a href="mailto:tarun.anand2127@gmail.com" className="text-gray-400 hover:text-white transition-colors block mb-4">tarun.anand2127@gmail.com</a>
            <div className="flex gap-6">
              <a href="https://www.linkedin.com/in/tarun-anand-b12bb7329/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" data-cursor="view">LinkedIn</a>
              <a href="https://github.com/Tarun-07-cse" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors" data-cursor="view">Github</a>
            </div>
          </div>
        </div>
        <h2 className="text-6xl md:text-[7vw] leading-[0.9] font-display font-bold tracking-tighter text-white mb-8">
          ALWAYS KEEN <br /> FOR EXCITING <br /> <span className="text-gray-600">COLLAB.</span>
        </h2>
        <Link to="/contact" data-cursor="explore">
          <span className="inline-flex items-center gap-4 text-xl md:text-2xl mt-6 cursor-pointer group">
            <span className="border-b border-white/30 group-hover:border-white transition-colors">Start a Project</span>
            <ArrowRight className="group-hover:translate-x-2 transition-transform" />
          </span>
        </Link>
      </div>
    </section>
  );
}
