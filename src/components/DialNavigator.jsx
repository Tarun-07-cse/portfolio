import { useState, useRef } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const OPTIONS = [
  {
    id: 'projects',
    label: 'Projects',
    description: 'See selected and in-depth case studies.',
    path: '/projects',
  },
  {
    id: 'skills',
    label: 'Skills',
    description: 'Explore the full stack of capabilities.',
    path: '/skills',
  },
  {
    id: 'certifications',
    label: 'Certifications',
    description: 'Browse key achievements & credentials.',
    path: '/certifications',
  },
];

export default function DialNavigator() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [transitionFromCenter, setTransitionFromCenter] = useState({ x: 0, y: 0 });

  const navigate = useNavigate();
  const circleControls = useAnimation();
  const dialRef = useRef(null);

  const handleDial = async () => {
    if (isTransitioning) return;

    const nextIndex = (activeIndex + 1) % OPTIONS.length;
    setActiveIndex(nextIndex);
    setIsTransitioning(true);

    // Compute dial center for the circular transition origin
    const dialEl = dialRef.current;
    if (dialEl) {
      const rect = dialEl.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setTransitionFromCenter({ x: centerX, y: centerY });
    }

    // Animate circular overlay growing from dial center
    await circleControls.start({
      scale: 8,
      opacity: 1,
      transition: {
        duration: 0.7,
        ease: [0.22, 1, 0.36, 1],
      },
    });

    navigate(OPTIONS[nextIndex].path);
  };

  // Map the active index to dial rotation (like an old phone dial)
  const dialRotation = [-40, 0, 40][activeIndex] ?? 0;

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-white text-black">
      <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.2fr)] gap-16 md:gap-24 items-center">
        {/* Left: Dial */}
        <div className="relative flex justify-center md:justify-start">
          <motion.div
            ref={dialRef}
            className="relative w-60 h-60 md:w-72 md:h-72 rounded-full border border-black/10 bg-neutral-50 shadow-[0_40px_120px_rgba(0,0,0,0.08)] overflow-hidden"
            animate={{ rotate: dialRotation }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ scale: 1.04, y: -6 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleDial}
          >
            {/* Dial ticks */}
            {[0, 1, 2].map((i) => {
              const angle = -90 + i * 120; // distribute around circle
              return (
                <div
                  key={i}
                  className="absolute left-1/2 top-1/2 w-1 h-10 bg-black/10 origin-bottom rounded-full"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${angle}deg)`,
                  }}
                />
              );
            })}

            {/* First letters around the dial */}
            {OPTIONS.map((option, i) => {
              const angle = -90 + i * 120;
              return (
                <div
                  key={option.id}
                  className="absolute left-1/2 top-1/2 text-xs md:text-sm font-mono uppercase tracking-[0.18em]"
                  style={{
                    transform: `translate(-50%, -50%) rotate(${angle}deg) translate(0, -46%) rotate(${-angle}deg)`,
                    opacity: activeIndex === i ? 0.9 : 0.4,
                  }}
                >
                  {option.label.charAt(0)}
                </div>
              );
            })}

            {/* Indicator arm */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[3px] h-24 bg-black origin-bottom rounded-full"
                animate={{ rotate: dialRotation * 1.4 }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>

            {/* Center knob */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-full bg-black text-white flex flex-col items-center justify-center text-xs font-mono tracking-[0.18em] uppercase">
                <span>Dial to</span>
                <span className="mt-1 text-[10px] opacity-70">navigate</span>
              </div>
            </div>
          </motion.div>

          {/* Subcopy */}
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 md:-bottom-12 text-xs font-mono uppercase tracking-[0.3em] text-black/40 whitespace-nowrap">
            Interactive navigation
          </div>
        </div>

        {/* Right: options */}
        <div className="space-y-8">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-black/50 mb-4">
              After Education
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight mb-4">
              Where do you want <span className="text-black/50">to go next?</span>
            </h2>
            <p className="text-base md:text-lg text-black/60 max-w-xl">
              Use the dial-like selector to jump directly into projects, skills, or certifications. Each choice
              spins the dial and opens the page with a circular reveal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {OPTIONS.map((option, index) => (
              <motion.button
                key={option.id}
                className={`group relative text-left rounded-2xl border px-4 py-5 md:px-5 md:py-6 cursor-pointer transition-colors ${
                  activeIndex === index
                    ? 'border-black bg-black text-white'
                    : 'border-black/10 bg-neutral-50 hover:bg-black hover:text-white hover:border-black'
                }`}
                data-cursor="explore"
              >
                <div className="flex items-center justify-between gap-3 mb-3">
                  <span className="text-sm font-mono uppercase tracking-[0.2em] opacity-60">
                    {index + 1 < 10 ? `0${index + 1}` : index + 1}
                  </span>
                  <span className="w-8 h-8 rounded-full border border-current flex items-center justify-center text-[10px] font-mono uppercase tracking-[0.18em]">
                    Go
                  </span>
                </div>
                <p className="text-lg md:text-xl font-semibold mb-1">{option.label}</p>
                <p className="text-sm md:text-[15px] opacity-70 leading-relaxed">{option.description}</p>
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Circular overlay transition */}
      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            className="fixed inset-0 pointer-events-none z-[60] overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute rounded-full bg-black"
              style={{
                width: 120,
                height: 120,
                left: transitionFromCenter.x - 60,
                top: transitionFromCenter.y - 60,
                transformOrigin: 'center',
              }}
              initial={{ scale: 0, opacity: 0.9 }}
              animate={circleControls}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

