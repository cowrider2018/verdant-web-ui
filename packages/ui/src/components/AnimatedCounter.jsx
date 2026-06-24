import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

/**
 * AnimatedCounter — 進入視窗時數字滾動計數。
 * 常用於成就數據（年資、專案數、客戶數…）。
 * 尊重 prefers-reduced-motion（直接顯示終值）。
 * Props:
 *  - value: number     目標數值
 *  - duration: number  動畫秒數
 *  - decimals: number  小數位數
 *  - prefix: string    數字前綴（如 'NT$'）
 *  - suffix: string    數字後綴（如 '+'、'%'）
 *  - className: string
 */
export default function AnimatedCounter({
  value = 0,
  duration = 1.6,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  ...rest
}) {
  const ref = useRef(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) {
      setDisplay(value)
      return
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(v),
    })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={className} {...rest}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
