import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

const SubtleBackground = () => {
    const { theme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <div className={`fixed inset-0 -z-10 overflow-hidden perspective-1000 transition-colors duration-500 ${isDark ? 'bg-black' : 'bg-white'}`}>
            {/* 3D Grid Layer */}
            <div
                className={`absolute inset-0 transition-opacity duration-500 ${isDark ? 'opacity-20' : 'opacity-[0.03]'}`}
                style={{
                    backgroundImage: `linear-gradient(to right, ${isDark ? '#0891b2' : '#000000'} 1px, transparent 1px),
                                      linear-gradient(to bottom, ${isDark ? '#0891b2' : '#000000'} 1px, transparent 1px)`,
                    backgroundSize: '50px 50px',
                    transform: 'perspective(500px) rotateX(20deg) scale(1.5)',
                    transformOrigin: 'top center',
                }}
            />

            {/* Moving Glow Orbs - adjusted for Light/Dark themes */}
            <motion.div
                className={`absolute top-[-10%] left-[-10%] w-[50vh] h-[50vh] p-8 rounded-full blur-[100px] transition-colors duration-500 ${isDark ? 'bg-cyan-900/20' : 'bg-cyan-200/40'
                    }`}
                animate={{
                    x: [0, 100, 0],
                    y: [0, 50, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <motion.div
                className={`absolute bottom-[-10%] right-[-10%] w-[60vh] h-[60vh] p-8 rounded-full blur-[120px] transition-colors duration-500 ${isDark ? 'bg-blue-900/20' : 'bg-blue-200/40'
                    }`}
                animate={{
                    x: [0, -100, 0],
                    y: [0, -50, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            {/* Vignette Overlay (Only for Dark Mode) */}
            <div
                className={`absolute inset-0 pointer-events-none transition-opacity duration-500 ${isDark ? 'opacity-100' : 'opacity-0'
                    }`}
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, black 100%)'
                }}
            />
        </div>
    );
};

export default SubtleBackground;
