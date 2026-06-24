import { useState, useRef, useEffect, useLayoutEffect, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  MediaPlaceholder,
  MagneticButton,
  Reveal,
  SectionDivider,
  Parallax,
  SunFlare,
  LeafMark,
  GrainOverlay,
  FloatingLeaves,
  Marquee,
  TiltCard,
  AnimatedCounter,
  Avatar,
  Timeline,
  Field,
  TextInput,
  DateField,
  Select,
  Textarea,
  formatPrice,
} from '@verdant/ui'

const sampleOptions = [
  { value: 'design', label: '品牌設計' },
  { value: 'web', label: '網站開發' },
  { value: 'photo', label: '攝影' },
]

/** DateField / Select 為受控元件，這裡用區域 state 包成可互動的小展示。 */
function DateFieldDemo() {
  const [date, setDate] = useState('')
  return <DateField value={date} onChange={setDate} className="cp-form" />
}
function SelectDemo() {
  const [val, setVal] = useState('')
  return <Select value={val} onChange={setVal} options={sampleOptions} className="cp-form" />
}

/**
 * previews — 元件名 → 迷你預覽節點。
 * 可獨立渲染的元件直接渲染真元件；背景／工具類（SunFlare、Parallax、formatPrice）
 * 改用受控小展示框示意。
 */
const previews = {
  MediaPlaceholder: () => (
    <MediaPlaceholder type="image" width={320} height={200} label="主視覺" />
  ),
  MagneticButton: () => <MagneticButton className="btn btn--primary">磁吸按鈕</MagneticButton>,
  Parallax: () => (
    <div className="cp-box cp-parallax">
      <Parallax speed={26} className="cp-parallax__layer cp-parallax__layer--back">
        <MediaPlaceholder type="image" width={200} height={120} label="背景層" />
      </Parallax>
      <Parallax speed={-18} className="cp-parallax__layer cp-parallax__layer--front">
        <LeafMark size={42} />
      </Parallax>
      <span className="cp-box__tag">隨捲動垂直位移</span>
    </div>
  ),
  Reveal: () => (
    <Reveal once={false} className="cp-reveal">
      <span className="cp-reveal__title serif">Reveal</span>
      <span className="cp-reveal__sub">淡入 · 上移 · 去模糊</span>
    </Reveal>
  ),
  SectionDivider: () => <SectionDivider />,
  SunFlare: () => (
    <div className="cp-box cp-flare">
      <SunFlare />
      <span className="cp-box__tag">在框內移動游標看光暈偏轉</span>
    </div>
  ),
  LeafMark: () => (
    <span style={{ color: 'var(--forest-700)' }}>
      <LeafMark size={56} />
    </span>
  ),
  GrainOverlay: () => (
    <div className="cp-box cp-grain">
      <GrainOverlay fixed={false} opacity={0.6} blend="overlay" />
      <span className="cp-box__tag">細顆粒雜訊紋理</span>
    </div>
  ),
  FloatingLeaves: () => (
    <div className="cp-box cp-leaves">
      <FloatingLeaves count={8} color="var(--moss-500)" />
    </div>
  ),
  Marquee: () => (
    <Marquee speed={12}>
      <span className="chip">品牌設計</span>
      <span className="chip">攝影</span>
      <span className="chip">網站開發</span>
      <span className="chip">插畫</span>
    </Marquee>
  ),
  TiltCard: () => (
    <TiltCard glare className="cp-tilt">
      <LeafMark size={30} />
      <span className="serif">Tilt me</span>
    </TiltCard>
  ),
  AnimatedCounter: () => (
    <span className="cp-counter serif">
      <AnimatedCounter value={1280} suffix="+" />
    </span>
  ),
  Avatar: () => <Avatar size={84} alt="頭像" />,
  Timeline: () => (
    <Timeline
      className="cp-timeline"
      items={[
        { time: '08:00', title: '晨霧森徑', text: '沿步道緩行。' },
        { time: '12:30', title: '溪畔野食', text: '林間用餐。' },
      ]}
    />
  ),
  Field: () => (
    <Field label="姓名" className="cp-form">
      <TextInput placeholder="林深" />
    </Field>
  ),
  TextInput: () => <TextInput className="cp-form" placeholder="輸入文字…" />,
  DateField: () => <DateFieldDemo />,
  Select: () => <SelectDemo />,
  Textarea: () => <Textarea className="cp-form" rows={3} placeholder="留言…" />,
  formatPrice: () => (
    <div className="cp-code">
      <code>formatPrice(1280)</code>
      <span className="cp-code__arrow">→</span>
      <strong>{formatPrice(1280)}</strong>
    </div>
  ),
}

function FallbackPreview({ item }) {
  return (
    <div className="cp-fallback">
      <code className="g-comp-pop__name">{item.name}</code>
      <p>{item.desc}</p>
    </div>
  )
}

const MARGIN = 12 // 浮窗與視窗邊界的最小間距
const GAP = 20 // 與游標之間理想的留白（頁寬允許時）

/**
 * ComponentPreviewPopup — 點擊元件卡片後在游標旁彈出的迷你預覽浮窗。
 * 朝頁面中心方向偏移、盡量不碰游標；頁寬不足被邊界擠壓時才允許貼近。
 * 以模糊淡入進場（呼應 Reveal idiom），尊重 prefers-reduced-motion。
 */
export default function ComponentPreviewPopup({ item, origin, onClose }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const [pos, setPos] = useState(null)

  const place = useCallback(() => {
    const el = ref.current
    if (!el) return
    const { width, height } = el.getBoundingClientRect()
    const vw = window.innerWidth
    const vh = window.innerHeight

    // 朝頁面中心偏移：游標在左半 → 浮窗放右側；在右半 → 放左側
    const toRight = origin.x < vw / 2
    let left = toRight ? origin.x + GAP : origin.x - GAP - width

    // 若理想側放不下，貼回邊界（此時可能貼近游標，符合「頁寬太小可觸碰」）
    left = Math.min(Math.max(left, MARGIN), Math.max(MARGIN, vw - width - MARGIN))

    // 垂直以游標為中心，夾在上下邊界內
    const top = Math.min(
      Math.max(origin.y - height / 2, MARGIN),
      Math.max(MARGIN, vh - height - MARGIN),
    )

    setPos({ left, top })
  }, [origin.x, origin.y])

  // 量測實際尺寸後再定位（useLayoutEffect 於 paint 前同步執行，避免位置跳動）
  useLayoutEffect(() => {
    place()
  }, [place, item.name])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    // 點擊浮窗 / 其內元件的 portal 面板（DateField、Select）/ 卡片以外的區域才關閉，
    // 讓使用者能進到浮窗實際操作元件（如日期選擇）。
    const onDown = (e) => {
      if (e.target.closest('.g-comp-pop, .select__pop, .datefield__pop, .g-comp')) return
      onClose()
    }
    document.addEventListener('mousedown', onDown)
    window.addEventListener('keydown', onKey)
    window.addEventListener('resize', place)
    return () => {
      document.removeEventListener('mousedown', onDown)
      window.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', place)
    }
  }, [place, onClose])

  // 滑鼠同時離開介紹卡片（.g-comp--active）與預覽浮窗兩者時關閉。
  // 兩者間有 GAP 空隙，故用短延遲容忍跨越；中途回到任一者即取消關閉。
  useEffect(() => {
    // 介紹卡片、浮窗、以及浮窗內元件的 portal 面板（DateField、Select）都算「停留區」
    const STAY = '.g-comp--active, .g-comp-pop, .select__pop, .datefield__pop'
    let timer = null
    const cancel = () => {
      if (timer) {
        clearTimeout(timer)
        timer = null
      }
    }
    const onOver = (e) => {
      if (e.target.closest(STAY)) cancel()
      else if (!timer) timer = setTimeout(onClose, 180)
    }
    document.addEventListener('mouseover', onOver)
    return () => {
      cancel()
      document.removeEventListener('mouseover', onOver)
    }
  }, [onClose])

  const Preview = previews[item.name]

  return createPortal(
    <motion.div
        ref={ref}
        className="g-comp-pop"
        role="dialog"
        aria-label={`${item.name} 預覽`}
        style={{
          left: pos ? pos.left : -9999,
          top: pos ? pos.top : 0,
          visibility: pos ? 'visible' : 'hidden',
        }}
        initial={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.96, filter: 'blur(12px)' }}
        animate={reduce ? { opacity: 1 } : { opacity: 1, scale: 1, filter: 'blur(0px)' }}
        exit={reduce ? { opacity: 0 } : { opacity: 0, scale: 0.97, filter: 'blur(8px)' }}
        transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="g-comp-pop__head">
          <code className="g-comp-pop__name">{item.name}</code>
        </div>
        <div className="g-comp-pop__stage">
          {Preview ? <Preview /> : <FallbackPreview item={item} />}
        </div>
        <p className="g-comp-pop__desc">{item.desc}</p>
      </motion.div>,
    document.body,
  )
}
