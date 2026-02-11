import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import HeroMarquee from '../components/HeroMarquee';

export default function Home() {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });

  return (
    <div ref={containerRef} className="bg-white text-black selection:bg-black selection:text-white">
      <HeroSection />
      {/* Circular navigation buttons after education hero */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-gradient-to-b from-white via-neutral-50/80 to-neutral-100 text-black">
        <div className="max-w-[1920px] mx-auto grid grid-cols-1 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-12 md:gap-20 items-center">
          <div className="space-y-5">
            <p className="text-xs font-mono uppercase tracking-[0.3em] text-black/50">
              After Education
            </p>
            <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">
              Choose where to go <span className="text-black/50">next.</span>
            </h2>
            <p className="text-base md:text-lg text-black/60 max-w-xl">
              Tap a circular button to move into detailed views of my projects, skills, or
              certifications. Optimised for touch on phones and smooth interactions on desktop.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 place-items-center">
            {[
              {
                label: 'Projects',
                sub: 'Case studies & builds',
                path: '/projects',
              },
              {
                label: 'Skills',
                sub: 'Tooling & stack',
                path: '/skills',
              },
              {
                label: 'Certifications',
                sub: 'Credentials & wins',
                path: '/certifications',
              },
            ].map((item, index) => (
              <Link key={item.path} to={item.path} className="w-full flex justify-center" data-cursor="explore">
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 20 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.1 * index,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative w-36 h-36 md:w-40 md:h-40 rounded-full border border-black/10 bg-gradient-to-b from-white to-neutral-100 shadow-[0_24px_60px_rgba(0,0,0,0.08)] flex flex-col items-center justify-center text-center px-4"
                >
                  {/* circular accent */}
                  <div className="absolute inset-0 rounded-full pointer-events-none">
                    <motion.div
                      className="absolute inset-[18%] rounded-full border border-black/5"
                      animate={{ scale: [1, 1.05, 1], opacity: [0.4, 0.7, 0.4] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    />
                  </div>

                  <span className="text-xs font-mono uppercase tracking-[0.25em] text-black/50 mb-1">
                    {item.label.charAt(0)}
                  </span>
                  <span className="text-sm md:text-base font-semibold">{item.label}</span>
                  <span className="text-[11px] md:text-xs text-black/50 mt-1">
                    {item.sub}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Scrolling mantra strip below circular navigation */}
      <HeroMarquee />

      {/* FOOTER CTA (simplified, connect only) */}
      <section ref={footerRef} className="py-32 px-6 md:px-12 bg-black text-white">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="border-t border-white/15 pt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-10"
          >
            <div>
              <h2 className="text-[8vw] leading-[0.8] font-display font-bold tracking-tighter text-white mb-4">
                ALWAYS KEEN <br /> FOR EXCITING <br /> <span className="text-gray-600">COLLAB.</span>
              </h2>
              <p className="text-sm md:text-base text-white/50 max-w-md mt-4">
                Whether it&apos;s a product build, a visual system, or something experimental, I&apos;m
                always open to meaningful collaborations.
              </p>
              <Link to="/contact" data-cursor="explore">
                <motion.div
                  whileHover={{ x: 6 }}
                  whileTap={{ scale: 0.97 }}
                  className="inline-flex items-center gap-3 mt-6 px-6 py-3 rounded-full border border-white/30 hover:border-white bg-white/5 hover:bg-white/10 text-sm md:text-base font-medium cursor-pointer group"
                >
                  <span>Start a project</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.div>
              </Link>
            </div>

            <div className="space-y-4 md:text-right">
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/40">
                Connect
              </p>
              <a
                href="mailto:tarun.anand2127@gmail.com"
                className="block text-lg md:text-xl text-white hover:text-white/80 transition-colors"
              >
                tarun.anand2127@gmail.com
              </a>
              <div className="flex md:justify-end gap-6 text-sm text-white/60">
                <a
                  href="https://www.linkedin.com/in/tarun-anand-b12bb7329/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-cursor="view"
                >
                  LinkedIn
                </a>
                <a
                  href="#"
                  className="hover:text-white transition-colors"
                  data-cursor="view"
                >
                  Instagram
                </a>
                <a
                  href="https://github.com/Tarun-07-cse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                  data-cursor="view"
                >
                  Github
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}