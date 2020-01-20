import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function SlideInOut({ condition, children, duration = 250 }) {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          transition={{ duration: duration / 1000, type: 'tween' }}
          key="item"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 100 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FadeInOut({ condition, children, duration = 250 }) {
  return (
    <AnimatePresence>
      {condition && (
        <motion.div
          transition={{ duration: duration / 1000, type: 'tween' }}
          key="item"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function HeightModifier({ height, children, duration = 250 }) {
  return (
    <motion.div
      transition={{ duration: duration / 1000, type: 'tween' }}
      animate={{ height: height }}
    >
      {children}
    </motion.div>
  );
}

function OpacityModifier({ condition, children, duration = 250 }) {
  return (
    <motion.div
      transition={{ duration: duration / 1000, type: 'tween' }}
      animate={{ opacity: condition ? 1 : 0 }}
    >
      {children}
    </motion.div>
  );
}

export {
  motion,
  SlideInOut,
  FadeInOut,
  HeightModifier,
  OpacityModifier,
  AnimatePresence
};
