import { useReducedMotion } from 'framer-motion'

/**
 * Marquee — 無限水平跑馬燈（裝飾件）。
 * 將 children 複製一份做無縫循環捲動，常用於技能 / 關鍵字帶。
 * 尊重 prefers-reduced-motion（靜止不動）。
 * Props:
 *  - children: ReactNode
 *  - speed: number         跑完一圈秒數（越大越慢）
 *  - direction: 'left' | 'right'
 *  - gap: string           項目間距（CSS 長度）
 *  - pauseOnHover: boolean  滑入暫停
 *  - className: string
 */
export default function Marquee({
  children,
  speed = 30,
  direction = 'left',
  gap = '3rem',
  pauseOnHover = true,
  className = '',
  ...rest
}) {
  const reduce = useReducedMotion()

  return (
    <div
      className={`marquee ${pauseOnHover ? 'marquee--pause' : ''} ${className}`}
      {...rest}
    >
      <div
        className="marquee__track"
        style={{
          '--marquee-duration': `${speed}s`,
          '--marquee-gap': gap,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
          animationPlayState: reduce ? 'paused' : undefined,
        }}
      >
        <div className="marquee__group">{children}</div>
        <div className="marquee__group" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  )
}
