import { useMemo } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import LeafMark from './LeafMark.jsx'

/**
 * FloatingLeaves — 背景漂浮葉片粒子層（裝飾件）。
 * 在最近的定位父層內隨機散佈數枚葉片，緩慢飄移與旋轉。
 * 純裝飾：aria-hidden；尊重 prefers-reduced-motion（改為靜態散佈）。
 * Props:
 *  - count: number    葉片數量
 *  - color: string    葉片顏色（CSS color）
 *  - speed: number    速度倍率（越大越快）
 *  - className: string
 */
export default function FloatingLeaves({
  count = 12,
  color = 'var(--sage-300)',
  speed = 1,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()

  const leaves = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 14 + Math.random() * 30,
        delay: Math.random() * 6,
        duration: (11 + Math.random() * 12) / speed,
        rotate: Math.random() * 360,
        drift: 16 + Math.random() * 30,
        opacity: 0.22 + Math.random() * 0.4,
      })),
    [count, speed],
  )

  return (
    <div className={`leaves ${className}`} aria-hidden="true" style={{ color }} {...rest}>
      {leaves.map((l) => (
        <motion.span
          key={l.id}
          className="leaves__item"
          style={{ left: `${l.left}%`, top: `${l.top}%`, opacity: l.opacity }}
          initial={{ rotate: l.rotate }}
          animate={
            reduce
              ? { rotate: l.rotate }
              : {
                  y: [0, -l.drift, 0],
                  x: [0, l.drift * 0.5, 0],
                  rotate: [l.rotate, l.rotate + 40, l.rotate],
                }
          }
          transition={
            reduce
              ? undefined
              : {
                  duration: l.duration,
                  delay: l.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }
          }
        >
          <LeafMark size={l.size} />
        </motion.span>
      ))}
    </div>
  )
}
