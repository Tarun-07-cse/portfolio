import { useEffect, useState, useRef } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

const MAGNETIC_STRENGTH = 0.2;
const MAGNETIC_RADIUS = 80;

export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default'); // 'default' | 'view' | 'explore' | 'button'
  const hoverTargetRef = useRef(null);

  const dotX = useMotionValue(-100);
  const dotY = useMotionValue(-100);
  const circleX = useMotionValue(-100);
  const circleY = useMotionValue(-100);

  const springConfig = { damping: 24, stiffness: 180 };
  const circleXSpring = useSpring(circleX, springConfig);
  const circleYSpring = useSpring(circleY, springConfig);

  // Only enable the custom cursor on devices with a precise pointer (desktop)
  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia === 'undefined') return;

    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    const update = () => setEnabled(mq.matches);

    update();
    mq.addEventListener ? mq.addEventListener('change', update) : mq.addListener(update);

    return () => {
      mq.removeEventListener ? mq.removeEventListener('change', update) : mq.removeListener(update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const moveCursor = (e) => {
      dotX.set(e.clientX);
      dotY.set(e.clientY);

      if (hoverTargetRef.current && cursorVariant !== 'default') {
        const rect = hoverTargetRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = centerX - e.clientX;
        const dy = centerY - e.clientY;
        const dist = Math.sqrt(dx * dx + dy * dy) || 1;
        const pull = Math.min(1, MAGNETIC_RADIUS / dist) * MAGNETIC_STRENGTH;
        const offsetX = dx * pull;
        const offsetY = dy * pull;
        circleX.set(e.clientX + offsetX);
        circleY.set(e.clientY + offsetY);
      } else {
        circleX.set(e.clientX);
        circleY.set(e.clientY);
      }
    };

    const handleMouseOver = (e) => {
      const target = e.target.closest('a') || e.target.closest('button') || e.target;
      if (target?.dataset?.cursor === 'explore') {
        hoverTargetRef.current = target;
        setCursorVariant('explore');
        return;
      }
      if (target?.dataset?.cursor === 'view' || target?.hasAttribute('data-cursor')) {
        const attr = target.getAttribute('data-cursor');
        if (attr === 'explore') {
          hoverTargetRef.current = target;
          setCursorVariant('explore');
          return;
        }
        if (attr === 'view') {
          hoverTargetRef.current = target;
          setCursorVariant('view');
          return;
        }
      }
      if (
        target?.tagName === 'A' ||
        target?.tagName === 'BUTTON' ||
        target?.dataset?.cursor === 'pointer'
      ) {
        hoverTargetRef.current = target;
        setCursorVariant('button');
        return;
      }
      hoverTargetRef.current = null;
      setCursorVariant('default');
    };

    const handleMouseLeave = () => {
      hoverTargetRef.current = null;
      setCursorVariant('default');
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);
    document.documentElement.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
      document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [enabled, cursorVariant, dotX, dotY, circleX, circleY]);

  const isHovered = cursorVariant !== 'default';
  const cursorLabel =
    cursorVariant === 'explore' ? 'Explore' : cursorVariant === 'view' ? 'View' : null;
  const circleSize = cursorVariant === 'explore' || cursorVariant === 'view' ? 72 : isHovered ? 48 : 32;

  // On touch devices / non-precise pointers, render nothing
  if (!enabled) {
    return null;
  }

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center border border-white"
        style={{
          width: circleSize,
          height: circleSize,
          translateX: circleXSpring,
          translateY: circleYSpring,
          left: 0,
          top: 0,
          x: '-50%',
          y: '-50%',
        }}
        animate={{
          scale: 1,
          backgroundColor: isHovered ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
          borderColor: isHovered ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.5)',
        }}
        transition={{ type: 'spring', stiffness: 400, damping: 28 }}
      >
        {cursorLabel && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="text-[10px] md:text-xs font-medium text-white uppercase tracking-widest whitespace-nowrap"
          >
            {cursorLabel}
          </motion.span>
        )}
      </motion.div>

      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-white rounded-full pointer-events-none z-[9999] mix-blend-difference -translate-x-1/2 -translate-y-1/2"
        style={{
          translateX: dotX,
          translateY: dotY,
        }}
      />
    </>
  );
}
