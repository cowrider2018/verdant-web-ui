import { motion, useReducedMotion } from 'framer-motion'

/**
 * Reveal — 捲動進場包裝。元素進入視窗時淡入＋上移＋去模糊。
 * 尊重 prefers-reduced-motion（僅保留淡入）。
 */
export default function Reveal({
  children,
  as = 'div',
  delay = 0,
  y = 36,
  className = '',
  once = true,
  ...rest
}) {
  const reduce = useReducedMotion()
  const MotionTag = motion[as] || motion.div

  return (
    <MotionTag
      className={className}
      initial={
        reduce
          ? { opacity: 0 }
          : { opacity: 0, y, filter: 'blur(8px)' }
      }
      whileInView={
        reduce ? { opacity: 1 } : { opacity: 1, y: 0, filter: 'blur(0px)' }
      }
      viewport={{ once, margin: '-80px' }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  )
}
