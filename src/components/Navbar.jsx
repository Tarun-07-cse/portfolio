import { useState, useEffect, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { path: '/', label: 'About' },
    { path: '/projects', label: 'Projects' },
    { path: '/skills', label: 'Skills' },
    { path: '/contact', label: 'Contact' },
  ];

  const isActive = (path) => location.pathname === path;

  const allSkills = useMemo(() => {
    const list = [];
    Object.values(skills).forEach((category) => {
      category.items.forEach((item) => {
        list.push(item.name);
      });
    });
    return list;
  }, []);

  const matchingSkills = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return [];
    return allSkills.filter((name) => name.toLowerCase().includes(q));
  }, [allSkills, searchValue]);

  const matchingProjects = useMemo(() => {
    const q = searchValue.trim().toLowerCase();
    if (!q) return [];
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(q)) ||
        project.domain.toLowerCase().includes(q)
    );
  }, [searchValue]);

  // Reset selected project when search text changes
  useEffect(() => {
    setSelectedProject(null);
  }, [searchValue]);

  const handleSearchFocus = () => {
    if (!isSearchOpen) {
      setIsSearchOpen(true);
    }
  };

  const handleCloseSearch = () => {
    setIsSearchOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
        ? 'bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-lg'
        : 'bg-transparent'
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Desktop Navigation + Search */}
          <div className="hidden md:flex items-center justify-between w-full gap-6">
            {/* Search on the left */}
            <div className="flex-1 max-w-xs">
              <div className="flex items-center px-3 py-1.5 rounded-full bg-white/70 dark:bg-gray-900/70 border border-gray-200/70 dark:border-gray-700/70 backdrop-blur-md shadow-sm">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Search for a skill or project..."
                  className="flex-1 bg-transparent border-none text-xs text-gray-800 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Nav links in the middle */}
            <div className="flex items-center space-x-1 justify-center flex-none">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className="relative px-4 py-2 text-sm font-medium transition-colors"
                >
                  <span
                    className={`relative z-10 ${isActive(link.path)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                      }`}
                  >
                    {link.label}
                  </span>
                  {isActive(link.path) && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary-100 dark:bg-primary-900/30 rounded-lg"
                      initial={false}
                      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5 text-yellow-500" />
              ) : (
                <Moon className="w-5 h-5 text-gray-700" />
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800"
          >
            <div className="px-4 py-4 space-y-3">
              {/* Mobile search */}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={handleSearchFocus}
                  placeholder="Search for a skill or project..."
                  className="flex-1 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-sm text-gray-800 dark:text-gray-100 placeholder:text-gray-500 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 border border-gray-200 dark:border-gray-700"
                />
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`block px-4 py-2 rounded-lg transition-colors ${isActive(link.path)
                    ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global search overlay */}
      <AnimatePresence>
        {isSearchOpen && searchValue.trim() && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl"
            onClick={handleCloseSearch}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="w-full h-full max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4 gap-3 border-b border-gray-200/70 dark:border-gray-800/80 pb-3">
                <div className="flex-1 px-3 py-2 rounded-lg bg-gray-50/80 dark:bg-gray-800/80 border border-gray-200/70 dark:border-gray-700/70 flex items-center">
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    placeholder="Search skills and projects..."
                    className="flex-1 bg-transparent border-none text-sm text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none"
                    autoFocus
                  />
                </div>
                <button
                  onClick={handleCloseSearch}
                  className="text-xs font-medium px-3 py-1.5 rounded-full bg-gray-200/80 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                >
                  Close
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1.5fr)] gap-4 flex-1 overflow-hidden">
                {/* Left: skills label + scrollable projects list */}
                <div className="flex flex-col overflow-hidden pr-1 md:pr-3">
                  <div className="mb-2">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Skills
                    </p>
                    {matchingSkills.length > 0 ? (
                      <div className="flex flex-wrap gap-1.5">
                        {matchingSkills.map((name) => (
                          <span
                            key={name}
                            className="px-2 py-0.5 rounded-full bg-gray-50 dark:bg-gray-800 text-[11px] text-gray-800 dark:text-gray-100 border border-gray-200 dark:border-gray-700"
                          >
                            {name}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <p className="text-xs text-gray-500 dark:text-gray-500">No matching skills</p>
                    )}
                  </div>

                  <div className="mt-3 flex-1 min-h-0">
                    <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 mb-1 uppercase tracking-wide">
                      Projects
                    </p>
                    {matchingProjects.length > 0 ? (
                      <div className="flex flex-col gap-2 h-full overflow-y-auto pr-1">
                        {matchingProjects.map((project) => (
                          <button
                            key={project.id}
                            type="button"
                            onClick={() => setSelectedProject(project)}
                            className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition-colors ${selectedProject?.id === project.id
                              ? 'bg-primary-600/10 dark:bg-primary-900/40 border-primary-400 text-primary-900 dark:text-primary-100'
                              : 'bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700 text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-700'
                              }`}
                          >
                            <p className="font-medium">{project.title}</p>
                            <p className="text-[11px] text-gray-500 dark:text-gray-400 line-clamp-2">
                              {project.shortDescription}
                            </p>
                          </button>
                        ))}
                      </div>
                    ) : (
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                        No matching projects
                      </p>
                    )}
                  </div>
                </div>

                {/* Right: project details + optional image area */}
                <div className="overflow-y-auto pl-1 md:pl-3">
                  {selectedProject ? (
                    <div className="rounded-2xl border border-primary-200/80 dark:border-primary-800/80 bg-white/95 dark:bg-gray-900/95 shadow-md p-4 sm:p-5 space-y-3 h-full flex flex-col">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-semibold uppercase tracking-wide text-primary-600 dark:text-primary-300">
                            {selectedProject.type}
                          </p>
                          <h3 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                            {selectedProject.title}
                          </h3>
                        </div>
                        <span className="inline-flex px-2.5 py-1 text-[10px] rounded-full bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-200 font-semibold uppercase tracking-wide">
                          {selectedProject.domain}
                        </span>
                      </div>

                      <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
                        {selectedProject.shortDescription}
                      </p>

                      {selectedProject.techStack?.length ? (
                        <div className="flex flex-wrap gap-1.5">
                          {selectedProject.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="text-[10px] px-2 py-0.5 rounded-full bg-primary-50 dark:bg-primary-900/40 text-primary-700 dark:text-primary-200 border border-primary-100/80 dark:border-primary-800/80"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      ) : null}

                      {selectedProject.features?.length ? (
                        <div>
                          <p className="text-[11px] font-semibold text-gray-700 dark:text-gray-300 mb-1">
                            Key features
                          </p>
                          <ul className="space-y-0.5 max-h-24 overflow-y-auto pr-1">
                            {selectedProject.features.slice(0, 6).map((feature) => (
                              <li
                                key={feature}
                                className="text-[11px] text-gray-600 dark:text-gray-300 list-disc list-inside"
                              >
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : null}

                      {/* Optional image placeholder below details */}
                      {selectedProject.image && (
                        <div className="mt-2 pt-2 border-t border-gray-200/70 dark:border-gray-800/80">
                          <img
                            src={selectedProject.image}
                            alt={selectedProject.title}
                            className="w-full rounded-xl object-cover max-h-48"
                          />
                        </div>
                      )}

                      {selectedProject.slug && (
                        <div className="mt-3 pt-2 border-t border-gray-200/70 dark:border-gray-800/80 flex justify-end">
                          <button
                            type="button"
                            onClick={() => {
                              handleCloseSearch();
                              navigate(`/projects/${selectedProject.slug}`);
                            }}
                            className="inline-flex items-center gap-1.5 text-[11px] sm:text-xs font-semibold px-3 py-1.5 rounded-full bg-primary-600 hover:bg-primary-700 text-white shadow-sm transition-colors"
                          >
                            <span>More details</span>
                          </button>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-xs text-gray-500 dark:text-gray-500">
                      Select a project from the left to see details here.
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

