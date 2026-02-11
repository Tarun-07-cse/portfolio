import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { skills } from '../data/skills';
import { projects } from '../data/projects';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.15 },
  },
};

const categoryVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const skillItemVariants = {
  hidden: { opacity: 0, x: -16 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: 0.05 * i, duration: 0.4 },
  }),
};

export default function Skills() {
  const categories = Object.values(skills);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const relatedRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, amount: 0.5 });
  const gridInView = useInView(gridRef, { once: true, amount: 0.1 });

  const relatedInView = useInView(relatedRef, { once: true, amount: 0.2 });

  // Map each skill category to the projects that use at least one of its skills
  const relatedByCategory = categories
    .map((category) => {
      const skillNames = category.items.map((s) => s.name.toLowerCase());
      const relatedProjects = projects.filter((project) =>
        project.techStack &&
        project.techStack.some((tech) => skillNames.includes(tech.toLowerCase()))
      );

      return {
        title: category.title,
        projects: relatedProjects,
      };
    })
    .filter((group) => group.projects.length > 0);

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12 selection:bg-black selection:text-white">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 28 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-20 border-b border-black/10 pb-12"
        >
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 text-black">
            EXPERTISE
          </h1>
          <p className="text-xl text-black/60 max-w-2xl">
            A comprehensive overview of the technologies, tools, and methodologies I leverage to build production-grade software.
          </p>
        </motion.div>

        <motion.div
          ref={gridRef}
          variants={containerVariants}
          initial="hidden"
          animate={gridInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-24"
        >
          {categories.map((category, index) => (
            <motion.div
              key={category.title}
              variants={categoryVariants}
              className="group"
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3 text-black">
                <motion.span
                  className="w-2 h-2 rounded-full bg-black/50"
                  initial={{ scale: 0 }}
                  animate={gridInView ? { scale: 1 } : {}}
                  transition={{ delay: 0.2 + index * 0.08, type: 'spring', stiffness: 400 }}
                />
                {category.title}
              </h2>

              <div className="space-y-6 border-l border-black/10 pl-6">
                {category.items.map((skill, i) => (
                  <motion.div
                    key={skill.name}
                    custom={i}
                    variants={skillItemVariants}
                    className="skill-item group/item"
                  >
                    <div className="flex justify-between items-baseline mb-1">
                      <span className="text-lg font-medium text-black/80 group-hover/item:text-black transition-colors">
                        {skill.name}
                      </span>
                      <span className="text-xs font-mono text-black/30 uppercase tracking-widest group-hover/item:text-black/50 transition-colors">
                        {skill.level}
                      </span>
                    </div>
                    <div className="w-full bg-black/5 h-[2px] group-hover/item:bg-black/25 transition-colors" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skills → Projects scrollytelling section */}
        {relatedByCategory.length > 0 && (
          <section
            ref={relatedRef}
            className="mt-24 md:mt-32 py-16 md:py-24 px-0 md:px-0 bg-gradient-to-b from-white via-black/5 to-black text-white rounded-[2.5rem]"
          >
            <div className="max-w-[1920px] mx-auto px-6 md:px-12">
              <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.5fr)_minmax(0,1fr)] gap-16 md:gap-24 items-start">
                {/* Pinned narrative */}
                <motion.div
                  initial={{ opacity: 0, y: 24 }}
                  animate={relatedInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:sticky lg:top-32 space-y-6"
                >
                  <p className="text-xs font-mono tracking-[0.25em] uppercase text-white/50">
                    Skills in action
                  </p>
                  <h2 className="text-4xl md:text-5xl font-display font-bold leading-tight text-white">
                    Projects that put these <span className="text-white/60">skills to work.</span>
                  </h2>
                  <p className="text-base md:text-lg text-white/60 max-w-md">
                    Scroll to move from one skill area to the next. Each block highlights
                    real projects built using that set of capabilities.
                  </p>
                </motion.div>

                {/* Scrollable project groups */}
                <div className="space-y-20 md:space-y-24">
                  {relatedByCategory.map((group, groupIndex) => (
                    <motion.div
                      key={group.title}
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.35 }}
                      transition={{
                        duration: 0.7,
                        delay: 0.05 * groupIndex,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="border border-white/10 rounded-3xl p-6 md:p-8 bg-black/40 backdrop-blur-xl"
                    >
                      <div className="flex flex-wrap items-baseline justify-between gap-4 mb-8 border-b border-white/10 pb-5">
                        <div>
                          <p className="text-xs font-mono tracking-[0.25em] uppercase text-white/40">
                            Skill track
                          </p>
                          <h3 className="text-2xl md:text-3xl font-display font-semibold text-white mt-1">
                            {group.title}
                          </h3>
                        </div>
                        <p className="text-xs font-mono text-white/40 uppercase tracking-[0.2em]">
                          {group.projects.length.toString().padStart(2, '0')} Project
                          {group.projects.length > 1 ? 's' : ''}
                        </p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7">
                        {group.projects.map((project) => (
                          <motion.div
                            key={project.id}
                            whileHover={{ y: -4 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                            className="group border border-white/10 rounded-2xl p-5 md:p-6 bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
                          >
                            <Link to={`/projects/${project.slug}`} data-cursor="explore">
                              <div className="flex items-start justify-between gap-4 mb-4">
                                <div>
                                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-1">
                                    {project.type}
                                  </p>
                                  <h4 className="text-xl md:text-2xl font-semibold text-white group-hover:text-white">
                                    {project.title}
                                  </h4>
                                </div>
                                <div className="w-9 h-9 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-300 shrink-0">
                                  <ArrowUpRight size={18} />
                                </div>
                              </div>

                              <p className="text-sm md:text-base text-white/60 mb-4 line-clamp-3">
                                {project.shortDescription}
                              </p>

                              <div className="flex flex-wrap gap-2 mt-2">
                                {project.techStack?.slice(0, 3).map((tech) => (
                                  <span
                                    key={tech}
                                    className="text-[11px] md:text-xs font-mono uppercase tracking-[0.18em] px-3 py-1 rounded-full bg-white/5 text-white/60 border border-white/10"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
