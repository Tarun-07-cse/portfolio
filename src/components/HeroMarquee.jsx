import { motion } from 'framer-motion';

const PHRASES = ['WAKE UP.', 'DEVELOP.', 'REPEAT.'];

function StripContent() {
  return (
    <>
      {PHRASES.map((phrase, j) => (
        <span
          key={j}
          className={`text-[clamp(4rem,10vw,8rem)] font-display font-bold tracking-tighter leading-none whitespace-nowrap ${
            j === 1 ? 'text-black/30' : 'text-black/12'
          }`}
        >
          {phrase}
        </span>
      ))}
      <span className="text-[clamp(4rem,10vw,8rem)] font-display font-bold tracking-tighter text-black/10">—</span>
    </>
  );
}

export default function HeroMarquee() {
  return (
    <div className="absolute bottom-0 left-0 right-0 overflow-hidden py-6 border-t border-black/5">
      <motion.div
        className="flex w-max"
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
      >
        <div className="flex gap-[6vw] items-center shrink-0">
          <StripContent />
          <StripContent />
          <StripContent />
        </div>
        <div className="flex gap-[6vw] items-center shrink-0">
          <StripContent />
          <StripContent />
          <StripContent />
        </div>
      </motion.div>
    </div>
  );
}
