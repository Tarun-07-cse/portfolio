import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ReactLenis } from 'lenis/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import Home from './pages/Home';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import Skills from './pages/Skills';
import Contact from './pages/Contact';
import Certifications from './pages/Certifications';

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/certifications" element={<Certifications />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  const [isLoading, setIsLoading] = useState(true);

  // Keep GSAP ScrollTrigger in sync with Lenis/resize
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('resize', refresh);
    return () => window.removeEventListener('resize', refresh);
  }, []);

  return (
    <ReactLenis root>
      <Router>
        <div className="App min-h-screen bg-background relative overflow-x-hidden selection:bg-white selection:text-black cursor-none">
          <CustomCursor />

          {/* Global Grain Overlay */}
          <div className="fixed inset-0 pointer-events-none opacity-20 z-[0] bg-grain mix-blend-overlay"></div>

          <AnimatePresence mode="wait">
            {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
          </AnimatePresence>

          {!isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} // Updated easing for smoother feel
              className="relative z-10"
            >
              <Navbar />
              <main>
                <AppRoutes />
              </main>
            </motion.div>
          )}
        </div>
      </Router>
    </ReactLenis>
  );
}

export default App;
