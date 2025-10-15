
'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const SunHalf = ({
  side,
  animate,
}: {
  side: 'left' | 'right';
  animate: boolean;
}) => {
  const isLeft = side === 'left';
  const initialX = isLeft ? '-100vw' : '100vw';
  const finalX = isLeft ? '-50%' : '50%';

  return (
    <motion.div
      className="absolute top-1/2 -translate-y-1/2"
      style={{
        width: '200px',
        height: '400px',
        [isLeft ? 'left' : 'right']: '50%',
        clipPath: isLeft
          ? 'polygon(0 0, 100% 0, 100% 100%, 0 100%)'
          : 'polygon(0 0, 100% 0, 100% 100%, 0 100%)',
      }}
      initial={{ x: initialX, y: '-50%', scale: 2 }}
      animate={animate ? { x: finalX, scale: 1 } : {}}
      transition={{ duration: 1.5, ease: 'easeOut' }}
    >
      <div
        className="relative w-[400px] h-[400px] bg-transparent border-[20px] rounded-full"
        style={{
          borderColor: '#E8FA00', // fluorescent yellow
          transform: isLeft ? 'translateX(-50%)' : 'translateX(0)',
        }}
      >
        {/* Crack */}
        <motion.div
          className="absolute top-1/2 left-1/2 w-1 h-full bg-[#111] origin-center"
          style={{
            transform: `translate(-50%, -50%) rotate(${
              isLeft ? '-5' : '5'
            }deg)`,
          }}
          initial={{ scaleY: 1 }}
          animate={animate ? { scaleY: 0 } : {}}
          transition={{ duration: 0.5, delay: 1.5 }}
        />
      </div>
    </motion.div>
  );
};

const WelcomeAnimation = ({
  onAnimationComplete,
}: {
  onAnimationComplete: () => void;
}) => {
  const [startAnimation, setStartAnimation] = useState(false);
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setStartAnimation(true);

    const textTimer = setTimeout(() => {
      setShowText(true);
    }, 2000); // Text appears after sun joins

    const completeTimer = setTimeout(() => {
      onAnimationComplete();
    }, 4000); // End of animation + text fade in

    return () => {
      clearTimeout(textTimer);
      clearTimeout(completeTimer);
    };
  }, [onAnimationComplete]);

  return (
    <div className="relative w-[400px] h-[400px] flex items-center justify-center">
      <AnimatePresence>
        {startAnimation && (
          <>
            <SunHalf side="left" animate={startAnimation} />
            <SunHalf side="right" animate={startAnimation} />
          </>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {showText && (
          <motion.h1
            className="absolute top-full mt-8 text-4xl font-headline text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            SuryaSetu
          </motion.h1>
        )}
      </AnimatePresence>
    </div>
  );
};

export default WelcomeAnimation;
