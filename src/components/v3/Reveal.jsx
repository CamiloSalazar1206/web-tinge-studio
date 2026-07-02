import { motion } from 'framer-motion'

// Scroll-reveal helper (Framer Motion) tuned to the Recent feel:
// fade + rise + BLUR-IN (elements come in slightly out of focus and sharpen),
// snappy easing, plays once when the element enters the viewport.
const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({
  as = 'div',
  delay = 0,
  y = 24,
  blur = 8,
  duration = 0.7,
  amount = 0.25,
  className = '',
  children,
  ...rest
}) {
  const MotionTag = motion[as] || motion.div
  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, amount }}
      transition={{ duration, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
