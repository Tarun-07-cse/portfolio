import { motion } from 'framer-motion';

const PHRASES = ['WAKE UP.', 'DEVELOP.', 'DESIGN.', 'REPEAT.'];

function StripContent() {
  return (
    <>
      {PHRASES.map((phrase, j) => (
        <span
          key={j}
          className={`text-[clamp(1.8rem,4vw,2.6rem)] font-display font-bold tracking-tight leading-none whitespace-nowrap ${
            j === 1 || j === 2 ? 'text-black' : 'text-black/70'
          }`}
        >
          {phrase}
        </span>
      ))}
      <span className="text-[clamp(1.8rem,4vw,2.6rem)] font-display font-bold tracking-tight text-black/40">—</span>
    </>
  );
}

export default function HeroMarquee() {
  return (
    <div className="w-full overflow-hidden py-6 md:py-8 border-t border-black/10 bg-white">
      <motion.div
        className="flex w-max"
        animate={{ x: '-50%' }}
        transition={{ repeat: Infinity, duration: 22, ease: 'linear' }}
      >
        <div className="flex gap-[4vw] items-center shrink-0 pr-[4vw]">
          <StripContent />
          <StripContent />
          <StripContent />
        </div>
        <div className="flex gap-[4vw] items-center shrink-0">
          <StripContent />
          <StripContent />
          <StripContent />
        </div>
      </motion.div>
    </div>
  );
}
