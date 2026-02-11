import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import { currentProjects } from '../data/currentProjects';

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState('');

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

  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12 selection:bg-black selection:text-white">
      <div className="max-w-[1920px] mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h1 className="text-6xl md:text-9xl font-display font-bold tracking-tighter mb-8 text-black">
            ALL <br /> PROJECTS
          </h1>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between border-b border-black/20 pb-8">
            <p className="text-xl text-black/60 max-w-xl">
              A collection of digital products, systems, and experiments built for production.
            </p>

            <div className="relative w-full md:w-auto min-w-[300px]">
              <Search className="absolute left-0 top-1/2 -translate-y-1/2 w-5 h-5 text-black/40" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent border-b border-black/20 pl-8 py-2 text-black placeholder:text-black/40 focus:outline-none focus:border-black transition-colors"
              />
            </div>
          </div>
        </motion.div>

        {/* Current Projects / In Progress */}
        {currentProjects.length > 0 && !searchQuery && (
          <div className="mb-32">
            <div className="flex items-center gap-4 mb-12">
              <div className="w-2 h-2 rounded-full bg-black animate-pulse"></div>
              <h2 className="text-sm font-bold tracking-widest uppercase text-black/80">Currently building</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {currentProjects.map((project, idx) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + idx * 0.1 }}
                  className="group border border-black/10 p-8 rounded-2xl hover:bg-black/5 transition-colors"
                >
                  <div className="flex justify-between items-start mb-6">
                    <span className="text-xs font-mono px-3 py-1 rounded-full border border-black/20 text-black/60">{project.status}</span>
                    <span className="font-display font-bold text-4xl text-black/10 group-hover:text-black/30 transition-colors">0{idx + 1}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-3 text-black">{project.title}</h3>
                  <p className="text-black/60 mb-6 line-clamp-2">{project.description}</p>

                  <div className="w-full bg-black/10 h-1 rounded-full overflow-hidden mb-4">
                    <div className="h-full bg-black w-full origin-left transform scale-x-0" style={{ width: `${project.progress}%`, transform: `scaleX(1)` }}></div>
                  </div>
                  <div className="flex justify-between text-xs text-black/40 font-mono">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          <AnimatePresence mode='popLayout'>
            {filteredProjects.length > 0 ? (
              filteredProjects.map((project, index) => (
                <motion.div
                  layout
                  key={project.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProjectCard project={project} index={index} />
                </motion.div>
              ))
            ) : (
              <div className="col-span-2 py-20 text-center">
                <p className="text-2xl text-black/40">No projects found.</p>
              </div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.slug}`} className="group block">
      <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative mb-6">
        {project.image ? (
          <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
        ) : (
          <div className="w-full h-full bg-gray-50 group-hover:bg-gray-100 transition-colors duration-500 relative flex flex-col items-center justify-center p-8 border border-black/5">
            <span className="text-8xl font-display font-bold text-black/5 group-hover:text-black/10 transition-colors absolute bottom-[-10%] right-[-5%]">{project.title.charAt(0)}</span>
            <div className="z-10 text-center">
              <span className="text-sm font-mono text-black/40">{project.type}</span>
            </div>
          </div>
        )}

        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-sm">
          <div className="w-16 h-16 rounded-full bg-black text-white flex items-center justify-center transform scale-50 group-hover:scale-100 transition-transform duration-300">
            <ArrowUpRight size={24} />
          </div>
        </div>
      </div>

      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-bold mb-2 text-black group-hover:underline decoration-1 underline-offset-4">{project.title}</h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.slice(0, 3).map(tech => (
              <span key={tech} className="text-sm text-black/50">{tech}</span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );
}
