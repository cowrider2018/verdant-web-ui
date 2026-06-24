import { useRef } from 'react'
import {
  motion,
  useMotionValue,
  useMotionTemplate,
  useSpring,
  useReducedMotion,
} from 'framer-motion'

/**
 * TiltCard — 指標驅動 3D 傾斜卡片包裝（裝飾件）。
 * 滑鼠在卡片上移動時依相對位置產生 rotateX/rotateY 傾斜，移出歸位；
 * 可選的 glare 會在指標處加一抹光澤反光。
 * 尊重 prefers-reduced-motion（停用傾斜與反光）。
 * Props:
 *  - children: ReactNode
 *  - max: number       最大傾斜角度（度）
 *  - glare: boolean    顯示光澤反光
 *  - className: string
 */
export default function TiltCard({
  children,
  max = 12,
  glare = false,
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()

  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const gx = useMotionValue(50)
  const gy = useMotionValue(50)
  const rotateX = useSpring(rx, { stiffness: 200, damping: 18 })
  const rotateY = useSpring(ry, { stiffness: 200, damping: 18 })
  const glareBg = useMotionTemplate`radial-gradient(circle at ${gx}% ${gy}%, rgba(244, 241, 233, 0.45), transparent 55%)`

  const handleMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    rx.set((0.5 - py) * max * 2)
    ry.set((px - 0.5) * max * 2)
    gx.set(px * 100)
    gy.set(py * 100)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
    gx.set(50)
    gy.set(50)
  }

  return (
    <motion.div
      ref={ref}
      className={`tilt ${className}`}
      style={{ rotateX, rotateY, transformPerspective: 900 }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      {...rest}
    >
      {children}
      {glare && !reduce && (
        <motion.span
          className="tilt__glare"
          aria-hidden="true"
          style={{ background: glareBg }}
        />
      )}
    </motion.div>
  )
}
