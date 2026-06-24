import { useId } from 'react'

/**
 * GrainOverlay — 全幅顆粒 / 雜訊質感覆蓋層（裝飾件）。
 * 以 SVG feTurbulence 產生細緻雜訊，疊在頁面上營造森林有機紙感。
 * 純裝飾：aria-hidden、pointer-events:none，不影響互動。
 * Props:
 *  - opacity: number   雜訊強度（0–1）
 *  - blend:   string   mix-blend-mode（如 'soft-light' / 'overlay'）
 *  - fixed:   boolean  固定於視窗（false 則填滿最近的定位父層）
 *  - className: string
 */
export default function GrainOverlay({
  opacity = 0.06,
  blend = 'soft-light',
  fixed = true,
  className = '',
  ...rest
}) {
  const id = useId().replace(/:/g, '')

  return (
    <div
      className={`grain ${fixed ? 'grain--fixed' : ''} ${className}`}
      aria-hidden="true"
      style={{ opacity, mixBlendMode: blend }}
      {...rest}
    >
      <svg width="100%" height="100%" preserveAspectRatio="none">
        <filter id={id}>
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.82"
            numOctaves="2"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter={`url(#${id})`} />
      </svg>
    </div>
  )
}
