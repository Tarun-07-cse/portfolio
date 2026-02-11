import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLenis } from 'lenis/react';
import { horizontalPanels } from '../data/horizontalPanels';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const PANEL_WIDTH_VW = 90;
const PANEL_GAP_VW = 4;

export default function HorizontalScrollSection() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const stickyRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const lenis = useLenis();

  // Sync Lenis scroll with GSAP ScrollTrigger so horizontal scroll works
  useEffect(() => {
    if (!lenis) return;
    lenis.on('scroll', ScrollTrigger.update);
    return () => lenis.off('scroll', ScrollTrigger.update);
  }, [lenis]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile) return;

    const section = sectionRef.current;
    const track = trackRef.current;
    const sticky = stickyRef.current;
    if (!section || !track) return;

    const panelCount = horizontalPanels.length;
    const totalWidth = panelCount * PANEL_WIDTH_VW + (panelCount - 1) * PANEL_GAP_VW;
    const scrollDistance = totalWidth - 100;
    const sectionHeight = window.innerHeight * 3.1 * (panelCount / 6);
    section.style.height = `${sectionHeight}px`;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: () => `+=${sectionHeight}`,
        pin: true,
        scrub: 2.2,
        anticipatePin: 1,
        onUpdate: (self) => {
          const p = self.progress;
          section.style.setProperty('--scroll-p', String(p));
          section.style.setProperty('--scroll-p-inv', String(Math.min(1, p * 2)));
          if (sticky) sticky.style.setProperty('--scroll-p', String(p));
          if (sticky) sticky.style.setProperty('--scroll-p-inv', String(Math.min(1, p * 2)));
          section.classList.toggle('inverted', p > 0.25);
        },
      });

      gsap.to(track, {
        x: () => `-${scrollDistance}vw`,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${sectionHeight}`,
          scrub: 2.2,
          anticipatePin: 1,
          snap: {
            snapTo: 1 / (panelCount - 1),
            duration: { min: 0.3, max: 0.8 },
            ease: 'power2.inOut',
            delay: 0.02,
          },
        },
      });
    }, section);

    const t = setTimeout(() => ScrollTrigger.refresh(), 100);
    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, [isMobile]);

  // Mobile: stacked vertical layout (white theme)
  if (isMobile) {
    return (
      <section className="relative min-h-screen bg-white text-black py-24 px-6">
        <div className="max-w-lg mx-auto space-y-32">
          {horizontalPanels.map((panel, index) => (
            <MobilePanel key={panel.id} panel={panel} index={index} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={sectionRef}
      className="horizontal-scroll-section relative bg-white"
      data-section="horizontal"
      style={{ '--scroll-p': 0 }}
    >
      {/* Edge fade gradients (white theme) */}
      <div className="horizontal-edge-fade horizontal-edge-fade--light left" aria-hidden />
      <div className="horizontal-edge-fade horizontal-edge-fade--light right" aria-hidden />

      <div
        ref={stickyRef}
        className="sticky-inner sticky top-0 h-screen w-full overflow-hidden flex items-start"
      >
        {/* Left scroll line - height grows with scroll progress */}
        <div className="horizontal-scroll-line absolute left-0 top-0 w-px z-20 pointer-events-none" aria-hidden />
        <div
          ref={trackRef}
          className="horizontal-track flex items-stretch h-full"
          style={{
            width: `${horizontalPanels.length * PANEL_WIDTH_VW + (horizontalPanels.length - 1) * PANEL_GAP_VW}vw`,
            gap: `${PANEL_GAP_VW}vw`,
            paddingLeft: '4vw',
          }}
        >
          {horizontalPanels.map((panel, index) => (
            <ScrollPanel key={panel.id} panel={panel} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ScrollPanel({ panel, index }) {
  const panelRef = useRef(null);
  const contentWrapRef = useRef(null);
  const headingRef = useRef(null);
  const wordsRef = useRef([]);
  const paragraphRef = useRef(null);
  const emailRef = useRef(null);
  const buttonRef = useRef(null);
  const imageWrapRef = useRef(null);
  const bgRef = useRef(null);

  useEffect(() => {
    const panelEl = panelRef.current;
    const contentWrap = contentWrapRef.current;
    const heading = headingRef.current;
    const words = wordsRef.current.filter(Boolean);
    const paragraph = paragraphRef.current;
    const emailEl = emailRef.current;
    const button = buttonRef.current;
    const imageWrap = imageWrapRef.current;
    const bg = bgRef.current;
    if (!panelEl || !heading) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: panelEl,
        start: 'left 70%',
        end: 'left 30%',
        scrub: 1.5,
        onUpdate: (self) => {
          const progress = self.progress;
          if (contentWrap) gsap.set(contentWrap, { x: (1 - progress) * -80 });
          if (bg) gsap.set(bg, { x: (progress - 0.5) * 20 });
          words.forEach((word, i) => {
            const wordProgress = gsap.utils.clamp(0, 1, (progress * 1.15 - i * 0.07) / 0.3);
            gsap.set(word, {
              opacity: wordProgress,
              y: (1 - wordProgress) * 36,
            });
          });
          if (paragraph) {
            const pProgress = gsap.utils.clamp(0, 1, (progress - 0.1) / 0.35);
            gsap.set(paragraph, { opacity: pProgress });
          }
          if (emailEl) {
            const eProgress = gsap.utils.clamp(0, 1, (progress - 0.16) / 0.3);
            gsap.set(emailEl, { opacity: eProgress });
          }
          if (button) {
            const bProgress = gsap.utils.clamp(0, 1, (progress - 0.2) / 0.3);
            gsap.set(button, {
              opacity: bProgress,
              scale: 0.96 + 0.04 * bProgress,
            });
          }
          if (imageWrap) {
            const imgProgress = gsap.utils.clamp(0, 1, (progress - 0.02) / 0.4);
            gsap.set(imageWrap, {
              scale: 1.06 - 0.06 * imgProgress,
              opacity: imgProgress,
            });
          }
        },
      });
    }, panelRef);

    return () => ctx.revert();
  }, [panel.id, index]);

  const titleWords = panel.title.split(' ');
  const isHero = panel.hero;

  return (
    <div
      ref={panelRef}
      className="horizontal-panel flex-shrink-0 flex items-stretch justify-start relative overflow-hidden w-full"
      style={{ width: `${PANEL_WIDTH_VW}vw` }}
      data-cursor="view"
    >
      {/* Laptop in the back - all panels (full-bleed background) */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-[0.14]"
        style={{ backgroundImage: `url(${panel.image})`, filter: 'grayscale(1) contrast(1.05) brightness(0.95)' }}
        aria-hidden
      />
      <div
        ref={bgRef}
        className="horizontal-panel-bg absolute inset-0 opacity-[0.88] z-[1]"
        aria-hidden
      />

      <div
        ref={contentWrapRef}
        className={`horizontal-panel-content relative z-10 flex flex-col lg:flex-row items-start justify-between gap-12 lg:gap-16 w-full pl-[4vw] pr-[4vw] lg:pl-[6vw] lg:pr-[8vw] ${isHero ? 'lg:justify-start' : ''}`}
        style={{ x: -80 }}
      >
        {/* Content - left-aligned, fill width */}
        <div className={`order-2 lg:order-1 text-left horizontal-panel-left flex-1 w-full max-w-2xl`}>
          <span className="horizontal-panel-subtitle text-xs font-mono uppercase tracking-[0.3em] mb-6 block">
            {panel.subtitle}
          </span>
          <h2
            ref={headingRef}
            className={`font-display font-bold leading-[1.05] tracking-tighter mb-8 overflow-hidden horizontal-panel-title ${
              panel.hero ? 'text-5xl md:text-7xl lg:text-8xl xl:text-9xl' : 'text-4xl md:text-5xl lg:text-6xl xl:text-7xl'
            }`}
          >
            {titleWords.map((word, i) => (
              <span
                key={i}
                ref={(el) => (wordsRef.current[i] = el)}
                className="inline-block mr-[0.25em] opacity-0 translate-y-10"
                style={{ willChange: 'transform, opacity' }}
              >
                {word}
              </span>
            ))}
          </h2>
          <p
            ref={paragraphRef}
            className="horizontal-panel-desc text-lg md:text-xl leading-relaxed max-w-lg mb-6 opacity-0"
            style={{ willChange: 'opacity' }}
          >
            {panel.description}
          </p>
          {panel.hero && panel.email && (
            <a
              ref={emailRef}
              href={`mailto:${panel.email}`}
              className="hero-email horizontal-panel-email text-lg mb-10 block opacity-0 transition-colors"
              style={{ willChange: 'opacity' }}
              data-cursor="view"
            >
              {panel.email}
            </a>
          )}
          {(!panel.hero || !panel.email) && <div className="mb-10" />}
          <Link to={panel.ctaLink} className="inline-block" data-cursor="explore">
            <span
              ref={buttonRef}
              className="horizontal-panel-cta group inline-flex items-center gap-3 px-8 py-4 rounded-full border font-medium transition-colors duration-300 opacity-0"
              style={{ willChange: 'transform, opacity' }}
            >
              {panel.cta}
              <ArrowRight className="w-4 h-4 shrink-0 group-hover:translate-x-1 transition-transform [color:inherit]" />
            </span>
          </Link>
        </div>

        {/* Optional foreground image - small, right side (laptop stays in back) */}
        {!isHero && (
          <div
            ref={imageWrapRef}
            className="order-1 lg:order-2 flex-shrink-0 w-full max-w-md lg:max-w-lg flex justify-end items-center opacity-0"
            style={{
              willChange: 'transform, opacity',
              transform: 'scale(1.05)',
            }}
          >
            <div className="device-mockup-wrap horizontal-panel-mockup relative w-full aspect-[4/3] max-h-[38vh] rounded-2xl overflow-hidden shadow-2xl border">
              <img
                src={panel.image}
                alt={panel.imageAlt}
                className="device-mockup-img horizontal-panel-img-bw w-full h-full object-cover"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function MobilePanel({ panel, index }) {
  return (
    <div className="space-y-8">
      <span className="text-xs font-mono uppercase tracking-[0.3em] text-black/50">
        {panel.subtitle}
      </span>
      <h2 className="text-4xl font-display font-bold text-black leading-tight tracking-tighter">
        {panel.title}
      </h2>
      <p className="text-black/60 leading-relaxed">{panel.description}</p>
      <div className="rounded-2xl overflow-hidden border border-black/10 shadow-xl aspect-[4/3] bg-neutral-100">
        <img
          src={panel.image}
          alt={panel.imageAlt}
          className="w-full h-full object-cover horizontal-panel-img-bw"
        />
      </div>
      <Link
        to={panel.ctaLink}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-black/20 text-black font-medium hover:bg-black/5 transition-colors"
      >
        {panel.cta}
        <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  );
}
