import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';

export default function Home() {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });

  return (
    <div ref={containerRef} className="bg-white text-black selection:bg-black selection:text-white">
      <HeroSection />

      {/* Circular navigation buttons after education hero */}
      <section className="py-24 md:py-28 px-6 md:px-12 bg-white text-black">
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

      {/* FOOTER CTA - unchanged */}
      <section ref={footerRef} className="py-40 px-6 md:px-12 bg-black text-white">
        <div className="max-w-[1920px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24"
          >
            <div>
              <h3 className="text-sm font-mono text-gray-500 mb-8 uppercase tracking-widest">Services</h3>
              <ul className="space-y-4 text-2xl font-light text-gray-300">
                {['Visual Identities', 'Product Design', 'Webflow / Development', 'Creative Direction'].map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, x: -20 }}
                    animate={footerInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.1 * i, duration: 0.5 }}
                    className="hover:text-white transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-mono text-gray-500 mb-8 uppercase tracking-widest">Connect</h3>
              <div className="flex flex-col gap-4 text-xl">
                <motion.a
                  href="mailto:tarun.anand2127@gmail.com"
                  className="hover:text-white transition-colors text-gray-400"
                  initial={{ opacity: 0, x: -20 }}
                  animate={footerInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  tarun.anand2127@gmail.com
                </motion.a>
                <div className="flex gap-6 mt-4">
                  <a href="https://www.linkedin.com/in/tarun-anand-b12bb7329/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-gray-400" data-cursor="view">LinkedIn</a>
                  <a href="#" className="hover:text-white transition-colors text-gray-400" data-cursor="view">Instagram</a>
                  <a href="https://github.com/Tarun-07-cse" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors text-gray-400" data-cursor="view">Github</a>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={footerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="border-t border-white/20 pt-20"
          >
            <h2 className="text-[8vw] leading-[0.8] font-display font-bold tracking-tighter text-white mb-8">
              ALWAYS KEEN <br /> FOR EXCITING <br /> <span className="text-gray-600">COLLAB.</span>
            </h2>
            <Link to="/contact" data-cursor="explore">
              <motion.div
                whileHover={{ x: 10 }}
                className="inline-flex items-center gap-4 text-2xl md:text-3xl mt-8 cursor-pointer group"
              >
                <span className="border-b border-white/30 group-hover:border-white transition-colors">Start a Project</span>
                <ArrowRight className="group-hover:translate-x-2 transition-transform" />
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}