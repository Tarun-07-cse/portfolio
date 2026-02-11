import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import HeroSection from '../components/HeroSection';
import DialNavigator from '../components/DialNavigator';

export default function Home() {
  const containerRef = useRef(null);
  const footerRef = useRef(null);
  const footerInView = useInView(footerRef, { once: true, amount: 0.2 });

  return (
    <div ref={containerRef} className="bg-white text-black selection:bg-black selection:text-white">
      <HeroSection />

      {/* Dial-style navigation after education hero */}
      <DialNavigator />

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