import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Code, Database, Server } from 'lucide-react';
import { projects } from '../data/projects';
import PageTransition from '../components/PageTransition';

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <PageTransition>
        <div className="min-h-screen pt-16 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
            <Link
              to="/projects"
              className="text-primary-600 dark:text-primary-400 hover:underline"
            >
              Back to Projects
            </Link>
          </div>
        </div>
      </PageTransition>
    );
  }

  const iconMap = {
    'Mobile App': Code,
    'Web Application': ExternalLink,
    'Web App': ExternalLink,
    'Cloud Project': Server,
  };

  const IconComponent = iconMap[project.type] || Code;

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Back Button */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={() => navigate('/projects')}
            className="flex items-center space-x-2 text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400 mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back to Projects</span>
          </motion.button>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center space-x-3 mb-4">
              <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
              <span className="text-sm font-semibold text-primary-600 dark:text-primary-400 uppercase tracking-wide">
                {project.type}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900 dark:text-white">
              {project.title}
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {project.description}
            </p>
          </motion.div>

          {/* Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Tech Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-lg font-medium"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Problem Statement */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Problem Statement
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.problem}
            </p>
          </motion.section>

          {/* Solution Approach */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Solution Approach
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.solution}
            </p>
          </motion.section>

          {/* Architecture */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Architecture
            </h2>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.architecture}
            </p>
          </motion.section>

          {/* Features */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Key Features
            </h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {project.features.map((feature, index) => (
                <motion.li
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + index * 0.05 }}
                  className="flex items-start space-x-3"
                >
                  <span className="text-primary-600 dark:text-primary-400 mt-1">•</span>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </motion.li>
              ))}
            </ul>
          </motion.section>

          {/* Screenshots Placeholder */}
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h2 className="text-2xl font-semibold mb-4 text-gray-900 dark:text-white">
              Screenshots
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((num) => (
                <div
                  key={num}
                  className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center"
                >
                  <span className="text-gray-500 dark:text-gray-400">
                    Screenshot {num}
                  </span>
                </div>
              ))}
            </div>
          </motion.section>

          {/* Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-4"
          >
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors"
              >
                <Github className="w-5 h-5" />
                <span>View on GitHub</span>
              </a>
            )}
            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
                <span>Live Demo</span>
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default ProjectDetail;

