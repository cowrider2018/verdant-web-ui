import { useRef } from 'react'
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion'

/**
 * Parallax — 隨頁面捲動產生垂直位移的多層視差容器。
 * speed 為位移幅度（px）；正值往上、負值往下。
 */
export default function Parallax({
  children,
  speed = 80,
  className = '',
  style = {},
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [speed, -speed])

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, y: reduce ? 0 : y }}
    >
      {children}
    </motion.div>
  )
}
