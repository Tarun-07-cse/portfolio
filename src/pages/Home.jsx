import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Github, Mail, GraduationCap, Code, Target, Users } from 'lucide-react';
import { skills } from '../data/skills';
import PageTransition from '../components/PageTransition';

const Home = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <PageTransition>
      <div className="min-h-screen pt-16 relative">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center"
          >
            <motion.div
              className="mb-4 inline-block px-6 py-4 rounded-3xl transition-all duration-300 hover:invert hover:brightness-125 cursor-pointer w-full"
            >
              <p className="text-sm sm:text-base text-gray-500 dark:text-gray-400 tracking-wide mb-1">
                Hi, I&apos;m
              </p>

              {/* Tarun - Refactored for Seamless "T" Alignment */}
              {/* grid-cols-[1fr_6rem_1fr] assumes 6rem (96px) is enough for the T */}
              <div className="text-center w-full">
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-blue-400 leading-tight">
                  T
                </span>
                <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent leading-tight">
                  arun
                </span>
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6 text-balance"
            >
              <span className="block">I build scalable apps,</span>
              <span className="block bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">
                data-driven systems,
              </span>
              <span className="block">and production-ready software.</span>
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Full-stack developer specializing in React, Flutter, Python, and SQL.
              <br />
              CSE student at Rajalakshmi Institute of Technology • BS Data Science at IIT Madras
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Link to="/projects">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-semibold flex items-center space-x-2 shadow-lg hover:shadow-xl transition-all"
                >
                  <span>View Projects</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </Link>

              <motion.a
                href="https://github.com/Tarun-07-cse"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg font-semibold flex items-center space-x-2 border border-gray-300 dark:border-gray-700 transition-all"
              >
                <Github className="w-5 h-5" />
                <span>GitHub</span>
              </motion.a>

              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent border-2 border-primary-600 dark:border-primary-400 text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 rounded-lg font-semibold flex items-center space-x-2 transition-all"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Me</span>
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Quick Stats / Highlights */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              { label: 'Projects Built', value: '5+' },
              { label: 'Technologies', value: '10+' },
              { label: 'Years Learning', value: '3+' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
                className="text-center p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700"
              >
                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </section>

        {/* About Section (Merged) */}
        <section id="about" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 bg-gray-50/50 dark:bg-gray-800/30 rounded-3xl my-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Header */}
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-gray-900 dark:text-white">
                About Me
              </h2>
              <div className="w-16 h-1 bg-primary-600 dark:bg-primary-400 mx-auto rounded-full"></div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">

              {/* Left: Bio */}
              <div className="prose prose-lg dark:prose-invert max-w-none">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  I'm a Computer Science & Engineering student at <strong>Rajalakshmi Institute of Technology</strong>
                  and pursuing a <strong>BS in Data Science at IIT Madras</strong>.
                </p>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                  I have a <strong>strong practical focus</strong> and a <strong>builder mindset</strong>.
                  Rather than just learning concepts, I build complete systems—from mobile apps with Flutter
                  to full-stack web applications with React and Python backends.
                </p>
                <div className="p-6 bg-white dark:bg-gray-800 rounded-xl border border-primary-100 dark:border-primary-900 shadow-sm mt-8">
                  <h3 className="text-xl font-bold mb-3 text-primary-700 dark:text-primary-300">My Philosophy</h3>
                  <p className="text-gray-600 dark:text-gray-400 italic">
                    "I believe in building systems that work in production, not just in demos.
                    No fluff—just clean, confident engineering."
                  </p>
                </div>
              </div>

              {/* Right: Details cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Education", desc: "CSE @ RIT & BS Data Science @ IITM", icon: GraduationCap },
                  { title: "Focus", desc: "Full-stack & Scalable Architecture", icon: Code },
                  { title: "Approach", desc: "Builder mindset, turning ideas into systems", icon: Target },
                  { title: "Beyond Code", desc: "Leadership in sports & teams", icon: Users },
                ].map((item, i) => (
                  <motion.div
                    key={item.title}
                    whileHover={{ y: -5 }}
                    className="p-5 bg-white dark:bg-gray-800 rounded-xl shadow-md border border-gray-200 dark:border-gray-700"
                  >
                    <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400 mb-3" />
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{item.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </section>

        {/* Compact Skills Preview */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-3xl border border-gray-200/70 dark:border-gray-800/80 shadow-md p-6 sm:p-8"
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div className="text-left">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 dark:text-white">
                  Skillset Overview
                </h2>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
                  A quick snapshot of the technologies I&apos;m comfortable shipping to production.
                </p>
              </div>
              <Link to="/skills">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-4 py-2 text-sm font-medium rounded-full border border-primary-500/70 text-primary-700 dark:text-primary-300 bg-primary-50/60 dark:bg-primary-900/20 hover:bg-primary-100/80 dark:hover:bg-primary-900/40 transition-colors"
                >
                  View full skillset
                </motion.button>
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {Object.values(skills)
                .slice(0, 3)
                .map((category) => (
                  <div
                    key={category.title}
                    className="rounded-2xl border border-gray-200/70 dark:border-gray-800/80 bg-gray-50/80 dark:bg-gray-900/70 p-4 text-left"
                  >
                    <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                      {category.title}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {category.items.slice(0, 4).map((skill) => (
                        <span
                          key={skill.name}
                          className="text-xs px-2.5 py-1 rounded-full bg-white/80 dark:bg-gray-800/80 border border-gray-200/60 dark:border-gray-700/70 text-gray-800 dark:text-gray-200"
                        >
                          {skill.name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
            </div>
          </motion.div>
        </section>
      </div>
    </PageTransition>
  );
};

export default Home;

