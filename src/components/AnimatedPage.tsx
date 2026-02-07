import { motion } from 'motion/react';
import { ReactNode } from 'react';

interface AnimatedPageProps {
  children: ReactNode;
}

export default function AnimatedPage({ children }: AnimatedPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  );
}
