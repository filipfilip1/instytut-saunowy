'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  scale?: number;
  translateY?: number;
}

/**
 * HoverCard animation component
 * Adds smooth hover animations to product cards
 */
export default function HoverCard({
  children,
  className = '',
  scale = 1.02,
  translateY = -4,
}: HoverCardProps) {
  return (
    <motion.div
      whileHover={{
        scale,
        y: translateY,
        transition: {
          duration: 0.3,
          ease: [0.25, 0.4, 0.25, 1],
        },
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
