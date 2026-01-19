import { useState, useMemo, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Search, ArrowRight, ExternalLink, Clock, Code } from 'lucide-react';
import { projects } from '../data/projects';
import { currentProjects } from '../data/currentProjects';
import { skills } from '../data/skills';
import PageTransition from '../components/PageTransition';

const Projects = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();

  // If arriving from Skills page with a ?skill= query, use it to filter projects
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get('q');
    const skill = params.get('skill');
    if (q) {
      setSearchQuery(q);
    } else if (skill) {
      setSearchQuery(skill);
    }
  }, [location.search]);

  const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) return projects;

    const query = searchQuery.toLowerCase();
    return projects.filter(
      (project) =>
        project.title.toLowerCase().includes(query) ||
        project.shortDescription.toLowerCase().includes(query) ||
        project.techStack.some((tech) => tech.toLowerCase().includes(query)) ||
        project.domain.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  // Flatten skills for search suggestions
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
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase();
    return allSkills.filter((name) => name.toLowerCase().includes(q));
  }, [allSkills, searchQuery]);

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Projects</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mb-8">
              Production-ready applications and systems I've built
            </p>
            {searchQuery && (
              <p className="text-sm text-primary-700 dark:text-primary-300">
                Showing results related to{' '}
                <span className="font-semibold break-words">{searchQuery}</span>
              </p>
            )}
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto"></div>
          </motion.div>

          {/* Currently Working On Section */}
          {currentProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="mb-16"
            >
              <div className="flex items-center space-x-3 mb-6">
                <Clock className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  Currently Working On
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                {currentProjects.map((project, index) => (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-gradient-to-br from-primary-50 to-primary-100 dark:from-primary-900/20 dark:to-primary-800/20 rounded-xl shadow-lg border-2 border-primary-200 dark:border-primary-800 overflow-hidden"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Code className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                          <span className="text-xs font-semibold text-primary-700 dark:text-primary-300 uppercase tracking-wide bg-primary-200 dark:bg-primary-900/50 px-2 py-1 rounded">
                            {project.status}
                          </span>
                        </div>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {project.title}
                      </h3>
                      <p className="text-gray-700 dark:text-gray-300 mb-4 text-sm">
                        {project.description}
                      </p>
                      
                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs font-medium text-gray-600 dark:text-gray-400">
                            Progress
                          </span>
                          <span className="text-xs font-semibold text-primary-600 dark:text-primary-400">
                            {project.progress}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${project.progress}%` }}
                            transition={{ duration: 1, delay: 0.3 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-primary-500 to-primary-600 rounded-full"
                          />
                        </div>
                      </div>

                      {/* Tech Stack */}
                      <div className="flex flex-wrap gap-2">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="text-xs px-2 py-1 bg-white dark:bg-gray-800 text-primary-700 dark:text-primary-300 rounded border border-primary-200 dark:border-primary-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Divider */}
          {currentProjects.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mb-12 flex items-center justify-center"
            >
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
              <span className="px-4 text-sm text-gray-500 dark:text-gray-400 font-medium">
                Completed Projects
              </span>
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent"></div>
            </motion.div>
          )}

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12 max-w-2xl mx-auto"
          >
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, tech stack, or domain..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-gray-900 dark:text-gray-100"
              />
            </div>
            {searchQuery && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mt-2 text-sm text-gray-600 dark:text-gray-400 text-center"
              >
                Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
              </motion.p>
            )}
          </motion.div>

          {/* Matching skills preview */}
          {matchingSkills.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 max-w-2xl mx-auto"
            >
              <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Related skills
              </p>
              <div className="flex flex-wrap gap-2">
                {matchingSkills.map((name) => (
                  <span
                    key={name}
                    className="text-xs px-2.5 py-1 rounded-full bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700"
                  >
                    {name}
                  </span>
                ))}
              </div>
            </motion.div>
          )}

          {/* Projects Grid */}
          {filteredProjects.length > 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700 overflow-hidden"
                >
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-xs font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                          {project.type}
                        </span>
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mt-2">
                          {project.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {project.shortDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 3 && (
                        <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded">
                          +{project.techStack.length - 3}
                        </span>
                      )}
                    </div>

                    <Link to={`/projects/${project.slug}`}>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
                      >
                        <span>View Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </motion.button>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Search className="w-16 h-16 mx-auto mb-4 text-gray-400" />
              <p className="text-lg text-gray-600 dark:text-gray-400">
                No projects found matching "{searchQuery}"
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </PageTransition>
  );
};

export default Projects;

