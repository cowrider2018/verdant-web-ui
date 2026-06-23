import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

/**
 * MagneticButton — CTA 對游標磁吸位移。滑入時按鈕追隨游標微移，移出回正。
 * 可作為 <button> 或 <a>（傳 as / href / to 由外層處理，這裡用 onClick）。
 */
export default function MagneticButton({
  children,
  className = 'btn btn--primary',
  strength = 0.4,
  onClick,
  type = 'button',
  ...rest
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x = useSpring(mx, { stiffness: 220, damping: 16 })
  const y = useSpring(my, { stiffness: 220, damping: 16 })

  const handleMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    mx.set(relX * strength)
    my.set(relY * strength)
  }
  const reset = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <motion.button
      ref={ref}
      type={type}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      {...rest}
    >
      {children}
    </motion.button>
  )
}
