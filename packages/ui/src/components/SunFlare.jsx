import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'

/**
 * SunFlare — 跟隨滑鼠游標偏轉的「一整列太陽折射光暈」（鏡頭眩光 / lens flare）。
 *
 * 物理直覺：游標 = 光源方向控制點。整條折射軸沿著「游標 ↔ 容器中心」延伸，
 * 但游標並非軸的頂點 —— 軸線會大幅延伸超出游標（負 t 側），游標只決定偏轉方向。
 * 游標移動時，整列光環繞著容器中心擺盪、滑移，產生折射光暈偏轉的效果。
 *
 * 範圍：此元件渲染於 Hero 主視覺內，座標一律相對所在容器計算，
 * 因此光暈只在主視覺圖片區域顯示，並由容器的 overflow:hidden 裁切（其他地方遮罩）。
 *
 * 每顆 ghost 的位置：P = L + t·(C − L)，其中 L 為游標、C 為容器中心（皆為容器相對座標）。
 *   t=0 在游標、t=1 在中心、t>1 越過中心到對側、t<0 在游標「後方」(延伸超出游標)。
 * 因為是逐分量線性內插，x 只依賴 Lx、y 只依賴 Ly，可分離計算。
 *
 * 色彩：模擬陽光在樹葉間被切分的色散 —— 暖金、琥珀、嫩綠、苔綠、青綠交錯。
 */

// t: 軸線位置；size: 直徑；color: 色相；ring: 是否為空心光環；opacity / blur 微調
const GHOSTS = [
  // ── 延伸超出游標（軸的另一頂點在游標之外）──
  { t: -1.35, size: 360, color: 'rgba(180,200,120,0.4)', ring: false, opacity: 0.3, blur: 40 },
  { t: -1.05, size: 150, color: 'rgba(205,180,120,0.7)', ring: true, opacity: 0.4, blur: 4 },
  { t: -0.78, size: 110, color: 'rgba(150,190,110,0.55)', ring: false, opacity: 0.4, blur: 20 },
  { t: -0.5, size: 52, color: 'rgba(225,190,120,0.85)', ring: false, opacity: 0.55, blur: 8 },
  { t: -0.26, size: 34, color: 'rgba(120,170,120,0.85)', ring: true, opacity: 0.55, blur: 2 },
  // ── 游標附近（決定方向；游標本身不放亮核）──
  { t: 0.2, size: 40, color: 'rgba(110,180,160,0.8)', ring: true, opacity: 0.5, blur: 2 },
  { t: 0.42, size: 92, color: 'rgba(225,185,110,0.7)', ring: false, opacity: 0.5, blur: 16 },
  { t: 0.62, size: 30, color: 'rgba(190,205,140,0.95)', ring: false, opacity: 0.6, blur: 4 },
  // ── 跨越中心到對側 ──
  { t: 0.85, size: 220, color: 'rgba(135,165,120,0.5)', ring: true, opacity: 0.4, blur: 8 },
  { t: 1.12, size: 60, color: 'rgba(210,175,110,0.65)', ring: false, opacity: 0.42, blur: 18 },
  { t: 1.45, size: 38, color: 'rgba(160,200,170,0.8)', ring: true, opacity: 0.45, blur: 2 },
  { t: 1.85, size: 140, color: 'rgba(120,150,110,0.5)', ring: false, opacity: 0.3, blur: 26 },
  { t: 2.3, size: 320, color: 'rgba(190,200,150,0.42)', ring: false, opacity: 0.24, blur: 44 },
]

function Ghost({ sx, sy, center, t, size, color, ring, opacity, blur }) {
  const x = useTransform(sx, (v) => v + t * (center.current.x - v))
  const y = useTransform(sy, (v) => v + t * (center.current.y - v))

  return (
    <motion.span
      className={`flare__ghost ${ring ? 'flare__ghost--ring' : ''}`}
      style={{
        x,
        y,
        width: size,
        height: size,
        marginLeft: -size / 2,
        marginTop: -size / 2,
        opacity,
        filter: `blur(${blur}px)`,
        ...(ring
          ? { borderColor: color, boxShadow: `0 0 ${size / 3}px ${color}` }
          : { background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }),
      }}
    />
  )
}

export default function SunFlare() {
  const reduce = useReducedMotion()
  const wrapRef = useRef(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  // 較軟的彈簧 → 移動時整列光環有拖曳擺盪的偏轉感
  const sx = useSpring(mx, { stiffness: 120, damping: 18, mass: 0.6 })
  const sy = useSpring(my, { stiffness: 120, damping: 18, mass: 0.6 })
  const center = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reduce) return
    const el = wrapRef.current
    if (!el) return

    // 折射軸心 = 視窗中心，但換算成容器相對座標。
    // （容器可能比視窗高/有捲動，故不能用容器幾何中心，否則整列光環會被往容器正中央拉而偏移）
    const recenter = () => {
      const r = el.getBoundingClientRect()
      center.current = {
        x: window.innerWidth / 2 - r.left,
        y: window.innerHeight / 2 - r.top,
      }
      return r
    }
    recenter()
    // 初始停在中心，避免從角落甩入
    mx.set(center.current.x)
    my.set(center.current.y)

    // 游標換算成容器相對座標；游標離開主視覺時，光暈會被 overflow 裁掉
    const move = (e) => {
      const r = recenter()
      mx.set(e.clientX - r.left)
      my.set(e.clientY - r.top)
    }
    window.addEventListener('pointermove', move)
    window.addEventListener('scroll', recenter, { passive: true })
    window.addEventListener('resize', recenter)
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('scroll', recenter)
      window.removeEventListener('resize', recenter)
    }
  }, [mx, my, reduce])

  if (
    reduce ||
    (typeof window !== 'undefined' && !window.matchMedia('(hover: hover)').matches)
  ) {
    return null
  }

  return (
    <div className="flare" ref={wrapRef} aria-hidden="true">
      {GHOSTS.map((g, i) => (
        <Ghost key={i} sx={sx} sy={sy} center={center} {...g} />
      ))}
    </div>
  )
}
