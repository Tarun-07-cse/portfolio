import { motion } from 'framer-motion';

const certifications = [
  {
    title: 'Google Cloud Fundamentals',
    issuer: 'Google Cloud Platform',
    year: '2024',
    category: 'Cloud & Infra',
  },
  {
    title: 'Data Science Foundations',
    issuer: 'IIT Madras (BSc Program)',
    year: '2024',
    category: 'AI & Data',
  },
  {
    title: 'Modern React & Frontend',
    issuer: 'Online Certification',
    year: '2023',
    category: 'Frontend',
  },
];

export default function Certifications() {
  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-20 px-6 md:px-12 selection:bg-black selection:text-white overflow-hidden">
      <div className="max-w-[1920px] mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.8, clipPath: 'circle(0% at 50% 0%)' }}
          animate={{ opacity: 1, scale: 1, clipPath: 'circle(140% at 50% 0%)' }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="bg-black text-white rounded-[2.5rem] px-6 md:px-12 py-16 md:py-20 shadow-[0_40px_120px_rgba(0,0,0,0.5)]"
        >
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-12 border-b border-white/10 pb-10">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-white/50 mb-4">
                Credentials
              </p>
              <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
                Certifications
              </h1>
              <p className="text-base md:text-lg text-white/60 max-w-xl">
                A snapshot of formal credentials that back the hands-on projects and experience.
              </p>
            </div>
            <div className="text-sm font-mono uppercase tracking-[0.25em] text-white/40">
              Circle fade-in reveal
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {certifications.map((cert, idx) => (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="border border-white/15 rounded-2xl p-5 md:p-6 bg-white/5 backdrop-blur-md"
              >
                <p className="text-xs font-mono uppercase tracking-[0.2em] text-white/40 mb-2">
                  {cert.category}
                </p>
                <h2 className="text-xl md:text-2xl font-semibold mb-1">{cert.title}</h2>
                <p className="text-sm text-white/60 mb-3">{cert.issuer}</p>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-white/40">
                  {cert.year}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

