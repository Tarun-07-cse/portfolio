import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects';
import { skills } from '../data/skills';

const LoadingScreen = ({ onComplete }) => {
    const [count, setCount] = useState(0);
    const [wordIndex, setWordIndex] = useState(0);
    const [skillPositions, setSkillPositions] = useState([]);

    // 1. Filter ONLY PROJECTS that contain 't' or 'T'
    const validProjects = useMemo(() => {
        let words = [];
        projects.forEach(p => {
            if (p.title.toLowerCase().includes('t')) {
                words.push({
                    text: p.title,
                    type: 'PROJECT',
                    description: p.shortDescription || p.type
                });
            }
        });

        if (words.length > 0) {
            words = [...words, ...words, ...words];
        } else {
            words = [{ text: "Portfolio", type: "SYSTEM", description: "Initializing System..." }];
        }

        return words;
    }, []);

    const uniqueProjectCount = projects.filter(p => p.title.toLowerCase().includes('t')).length || 1;

    // 2. Gather ALL skills for floating background
    const allSkills = useMemo(() => {
        const list = [];
        Object.values(skills).forEach(cat => {
            cat.items.forEach(item => list.push(item.name));
        });
        return list;
    }, []);

    const currentWordObj = validProjects[wordIndex % validProjects.length];

    // Helper to render text with highlighted T
    const renderHighlightedText = (text) => {
        if (!text) return null;
        const lowerText = text.toLowerCase();
        const tIndex = lowerText.indexOf('t');

        if (tIndex === -1) return text; // Should not happen given logic

        const before = text.slice(0, tIndex);
        const theChar = text.charAt(tIndex);
        const after = text.slice(tIndex + 1);

        return (
            <>
                <span className="text-gray-500">{before}</span>
                <span className="text-blue-400">{theChar}</span>
                <span className="text-gray-500">{after}</span>
            </>
        );
    };

    useEffect(() => {
        const initialPositions = Array(20).fill(0).map((_, i) => ({
            id: i,
            skill: allSkills[i % allSkills.length],
            top: Math.random() * 90 + 5 + '%',
            left: Math.random() * 90 + 5 + '%',
            scale: Math.random() * 0.6 + 0.6,
            delay: Math.random() * 2,
        }));
        setSkillPositions(initialPositions);

        // Speed up word cycling
        const interval = setInterval(() => {
            setWordIndex(prev => prev + 1);
        }, 800); // Faster cycling (was 1200)
        return () => clearInterval(interval);
    }, [allSkills]);

    useEffect(() => {
        // FIXED DURATION: 2 seconds max
        const calculatedDuration = 2000;
        const totalSteps = calculatedDuration / 30;
        const increment = 100 / totalSteps;

        const progressInterval = setInterval(() => {
            setCount((prev) => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return Math.min(prev + increment, 100);
            });
        }, 30);
        return () => clearInterval(progressInterval);
    }, []); // Removed dependency on uniqueProjectCount

    useEffect(() => {
        if (count === 100) {
            // Quick exit after 100%
            const timer = setTimeout(() => {
                onComplete();
            }, 300); // Faster exit (was 800)
            return () => clearTimeout(timer);
        }
    }, [count, onComplete]);

    return (
        <div className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden font-sans text-white">

            {/* Background 3D Grid */}
            <div
                className="absolute inset-0 opacity-20"
                style={{
                    backgroundImage: `linear-gradient(to right, #60a5fa 1px, transparent 1px),
                                      linear-gradient(to bottom, #60a5fa 1px, transparent 1px)`,
                    backgroundSize: '60px 60px',
                    transform: 'perspective(500px) rotateX(20deg) scale(1.5)',
                    transformOrigin: 'top center',
                    maskImage: 'linear-gradient(to bottom, transparent, black 10%, black 90%, transparent)'
                }}
            />

            {/* Floating Background Skills */}
            {skillPositions.map((item) => (
                <SkillBox key={item.id} item={item} />
            ))}

            {/* Main Center Area - Natural Text Flow */}
            <div className="relative z-20 flex flex-col items-center justify-center w-full max-w-7xl mx-auto h-screen px-4 sm:px-6 lg:px-8 text-center">

                {/* Title with Highlighted T */}
                <div className="mb-4"> {/* Padding specifically for the title area */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={`word-${wordIndex}`}
                            initial={{ opacity: 0, y: 10 }} // Subtle vertical fade
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.3 }}
                            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight"
                        >
                            {renderHighlightedText(currentWordObj?.text)}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Project Description (Gist) */}
                <div className="h-12 w-full flex items-start justify-center"> {/* Fixed height container to prevent jumps */}
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={`desc-${wordIndex}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-medium"
                        >
                            {currentWordObj?.description}
                        </motion.p>
                    </AnimatePresence>
                </div>

                {/* Context Label */}
                <div className="absolute top-32 text-xs font-bold tracking-[0.5em] text-blue-400/60 uppercase">
                    LOADING PROJECTS...
                </div>

                {/* Bottom Loader */}
                <div className="absolute bottom-12 w-full max-w-xs px-8 flex flex-col gap-2 z-30">
                    <div className="flex justify-between items-end text-white text-[10px] font-bold tracking-widest">
                        <span className="text-blue-400 animate-pulse">SYSTEM INITIALIZING</span>
                        <span>{Math.round(count)}%</span>
                    </div>
                </div>

            </div>

            {/* Vignette Overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,black_100%)] pointer-events-none" />

        </div>
    );
};

const SkillBox = ({ item }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setVisible(true);
        }, item.delay * 1000);

        const flickerInterval = setInterval(() => {
            setVisible(Math.random() > 0.3);
        }, 800 + Math.random() * 1500);

        return () => {
            clearTimeout(timeout);
            clearInterval(flickerInterval);
        }
    }, [item.delay]);

    return (
        <motion.div
            className="absolute px-2 py-1 bg-black/60 border border-blue-400/30 rounded z-10 pointer-events-none"
            style={{ top: item.top, left: item.left }}
            initial={{ opacity: 0 }}
            animate={{
                opacity: visible ? 0.6 : 0,
                scale: visible ? item.scale : 0.5,
            }}
            transition={{ duration: 0.5 }}
        >
            <span className="text-[10px] sm:text-xs font-mono text-blue-300 font-bold uppercase tracking-widest">
                {item.skill}
            </span>
        </motion.div>
    );
}

export default LoadingScreen;
