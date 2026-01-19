import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Code, Smartphone, Server, Database, Cloud, Palette } from 'lucide-react';
import { skills } from '../data/skills';
import PageTransition from '../components/PageTransition';

const Skills = () => {
  const iconMap = {
    Code: Code,
    Smartphone: Smartphone,
    Server: Server,
    Database: Database,
    Cloud: Cloud,
    Palette: Palette,
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const skillCategories = Object.values(skills);

  return (
    <PageTransition>
      <div className="min-h-screen pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">Skills</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Technologies and tools I work with to build production-ready applications
            </p>
            <div className="w-24 h-1 bg-primary-600 dark:bg-primary-400 mx-auto mt-4"></div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {skillCategories.map((category, categoryIndex) => {
              const IconComponent = iconMap[category.icon] || Code;
              return (
                <motion.div
                  key={category.title}
                  variants={cardVariants}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                      <IconComponent className="w-6 h-6 text-primary-600 dark:text-primary-400" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {category.title}
                    </h2>
                  </div>

                  <div className="space-y-3">
                    {category.items.map((skill, skillIndex) => (
                      <Link
                        key={skill.name}
                        to={`/projects?skill=${encodeURIComponent(skill.name)}`}
                        className="block"
                      >
                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: categoryIndex * 0.1 + skillIndex * 0.05 }}
                          whileHover={{ scale: 1.02, x: 4 }}
                          className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-900/50 rounded-lg cursor-pointer hover:bg-primary-50/60 dark:hover:bg-primary-900/40 transition-colors"
                        >
                          <span className="text-gray-900 dark:text-gray-100 font-medium">
                            {skill.name}
                          </span>
                          <span className="text-[10px] uppercase tracking-wide px-2 py-1 bg-primary-100 dark:bg-primary-900/40 text-primary-700 dark:text-primary-300 rounded-full">
                            {skill.level}
                          </span>
                        </motion.div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </PageTransition>
  );
};

export default Skills;

