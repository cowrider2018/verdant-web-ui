import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  MediaPlaceholder,
  MagneticButton,
  Reveal,
  SectionDivider,
  Parallax,
  SunFlare,
  LeafMark,
  Field,
  DateField,
  Select,
} from '@verdant/ui'
import ComponentPreviewPopup from './ComponentPreview.jsx'

const base = import.meta.env.BASE_URL
const SALES_URL = `${base}sales-web/`
const BOOKING_URL = `${base}booking-web/`
const PORTFOLIO_URL = `${base}portfolio-web/`

const components = [
  { name: 'MediaPlaceholder', desc: '標尺寸的圖片／影片佔位符，以 aspect-ratio 鎖版位避免 CLS。' },
  { name: 'MagneticButton', desc: '對游標磁吸位移的 CTA 按鈕。' },
  { name: 'Parallax', desc: '隨捲動產生垂直位移的視差容器。' },
  { name: 'Reveal', desc: '進入視窗時淡入＋上移＋去模糊的進場包裝。' },
  { name: 'SectionDivider', desc: '葉脈風格的 SVG 區塊分隔線。' },
  { name: 'SunFlare', desc: '跟隨游標偏轉的太陽折射光暈（鏡頭眩光）。' },
  { name: 'LeafMark', desc: '通用葉片標誌，外層自行包品牌字樣。' },
  { name: 'GrainOverlay', desc: '覆蓋全頁的細顆粒雜訊紋理，增添底片質感。' },
  { name: 'FloatingLeaves', desc: '緩緩飄落的葉片粒子背景。' },
  { name: 'Marquee', desc: '無限水平捲動的跑馬燈橫幅。' },
  { name: 'TiltCard', desc: '隨游標傾斜的 3D 卡片，可選炫光。' },
  { name: 'AnimatedCounter', desc: '進入視窗時數字滾動到目標值的計數器。' },
  { name: 'Avatar', desc: '附葉片裝飾與外環的圓形頭像。' },
  { name: 'Timeline', desc: '編號節點的垂直時間軸，進場依序淡入。' },
  { name: 'Field', desc: '標籤＋輸入框的表單欄位容器。' },
  { name: 'TextInput', desc: '套用森林主題樣式的文字輸入框。' },
  { name: 'DateField', desc: '自製日期選擇器，附森林主題小日曆面板。' },
  { name: 'Select', desc: '自製下拉選單，選項面板完整套用森林主題。' },
  { name: 'Textarea', desc: '可垂直縮放的多行文字輸入框。' },
  { name: 'formatPrice', desc: '以新台幣格式化金額的工具函式。' },
]

const examples = [
  {
    title: 'Verdant 森林選物',
    tag: '電商網站',
    desc: '首頁、選物、商品詳情與購物車。完整的森林系電商版型示範。',
    url: SALES_URL,
    label: '電商示範站',
  },
  {
    title: '森林旅宿 Verdant Stay',
    tag: '預約系統',
    desc: '房型瀏覽、日期與人數選擇、預約摘要與結帳的完整訂房流程。',
    url: BOOKING_URL,
    label: '旅館預約示範站',
  },
  {
    title: '林深 設計作品集',
    tag: '個人形象',
    desc: '創意設計師的單頁形象站：Hero、跑馬燈、作品傾斜卡、數字計數與聯絡表單。',
    url: PORTFOLIO_URL,
    label: '個人形象示範站',
  },
]

export default function App() {
  const [date, setDate] = useState('')
  const [service, setService] = useState('')
  // 目前開啟預覽的元件卡：{ item, x, y }，x/y 為點擊時的游標視窗座標
  const [active, setActive] = useState(null)

  // 單擊卡片：再點同一張則關閉，否則於游標位置開啟
  const openPreview = (e, item) =>
    setActive((prev) =>
      prev && prev.item.name === item.name
        ? null
        : { item, x: e.clientX, y: e.clientY },
    )

  // 鍵盤開啟：以卡片中心為座標
  const handleCardKey = (e, item) => {
    if (e.key !== 'Enter' && e.key !== ' ') return
    e.preventDefault()
    const r = e.currentTarget.getBoundingClientRect()
    setActive((prev) =>
      prev && prev.item.name === item.name
        ? null
        : { item, x: r.left + r.width / 2, y: r.top + r.height / 2 },
    )
  }

  return (
    <>
      {/* ===== Header ===== */}
      <header className="g-nav">
        <div className="container g-nav__inner">
          <span className="g-nav__brand" style={{ color: 'var(--forest-700)' }}>
            <LeafMark size={26} />
            Verdant UI
          </span>
          <nav className="g-nav__links">
            <a className="nav__link" href={SALES_URL}>電商站</a>
            <a className="nav__link" href={BOOKING_URL}>旅宿站</a>
            <a className="nav__link" href={PORTFOLIO_URL}>形象站</a>
          </nav>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="g-hero">
        <Parallax speed={40} className="g-hero__bg">
          <MediaPlaceholder type="image" width={1920} height={1080} label="展示廊主視覺" bare />
        </Parallax>
        <div className="g-hero__scrim" />
        <SunFlare />
        <div className="container g-hero__content">
          <motion.span
            className="eyebrow"
            style={{ color: 'var(--sage-200)', display: 'block', marginBottom: '1.2rem' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            森林風格元件庫 · 示範網頁
          </motion.span>
          <motion.h1
            className="g-hero__title"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            一套元件庫，<br />長出整片森林網站
          </motion.h1>
          <motion.p
            className="g-hero__lede"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            @verdant/ui 提供動畫、佔位符與設計 tokens。下方兩個示範網頁，皆由同一套元件庫打造。
          </motion.p>
          <motion.div
            className="g-hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <a href={SALES_URL}>
              <MagneticButton className="btn btn--gold">逛電商站</MagneticButton>
            </a>
            <a
              href={BOOKING_URL}
              className="btn btn--ghost"
              style={{ color: 'var(--cream-50)', borderColor: 'rgba(244,241,233,0.4)' }}
            >
              訂森林旅宿
            </a>
          </motion.div>
        </div>
      </section>

      {/* ===== Examples ===== */}
      <section className="container section">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">示範網頁</span>
            <h2>兩個獨立部署的示範站</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>每個示範站都是獨立的資料夾與 GitHub Pages 子路徑，共用同一套 @verdant/ui 元件庫。</p>
          </Reveal>
        </div>

        <div className="grid grid--feature">
          {examples.map((ex, i) => (
            <Reveal key={ex.title} delay={i * 0.1}>
              <a href={ex.url} className="g-example">
                <div className="g-example__media">
                  <span className="card__tag">{ex.tag}</span>
                  <MediaPlaceholder type="image" width={1200} height={800} ratio="3 / 2" label={ex.label} />
                </div>
                <div className="g-example__body">
                  <h3 className="g-example__title">{ex.title}</h3>
                  <p className="g-example__desc">{ex.desc}</p>
                  <span className="btn btn--primary" style={{ marginTop: '1.2rem' }}>
                    開啟 {ex.label} →
                  </span>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      <SectionDivider />

      {/* ===== Components ===== */}
      <section className="container section">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">元件庫</span>
            <h2>@verdant/ui 提供的元件</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>動畫與佈局的基礎積木。以下卡片本身即由這些元件與樣式構成。</p>
          </Reveal>
        </div>

        <div className="grid grid--products">
          {components.map((c, i) => (
            <Reveal key={c.name} delay={(i % 4) * 0.06}>
              <div
                className={`g-comp ${active?.item.name === c.name ? 'g-comp--active' : ''}`.trim()}
                role="button"
                tabIndex={0}
                aria-haspopup="dialog"
                onClick={(e) => openPreview(e, c)}
                onKeyDown={(e) => handleCardKey(e, c)}
              >
                <code className="g-comp__name">{c.name}</code>
                <p className="g-comp__desc">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Live demo strip */}
        <div className="g-demo">
          <Reveal>
            <h3 className="serif" style={{ fontSize: '1.5rem', marginBottom: '1.2rem' }}>
              即時預覽
            </h3>
          </Reveal>
          <div className="g-demo__grid">
            <Reveal className="g-demo__cell">
              <MediaPlaceholder type="image" width={400} height={300} label="MediaPlaceholder" />
            </Reveal>
            <Reveal className="g-demo__cell" delay={0.08}>
              <MediaPlaceholder type="video" width={400} height={300} label="影片佔位符" />
            </Reveal>
            <div className="g-demo__cell g-demo__cell--center">
              <MagneticButton className="btn btn--primary">磁吸按鈕</MagneticButton>
              <div style={{ marginTop: '1.5rem' }}>
                <SectionDivider />
              </div>
              <div style={{ marginTop: '1.5rem', color: 'var(--forest-700)' }}>
                <LeafMark size={40} />
              </div>
            </div>
            <Reveal className="g-demo__cell g-demo__cell--form" delay={0.12}>
              <Field label="自訂日期選擇器">
                <DateField value={date} onChange={setDate} />
              </Field>
              <Field label="自訂下拉選單">
                <Select
                  value={service}
                  onChange={setService}
                  options={[
                    { value: 'design', label: '品牌設計' },
                    { value: 'web', label: '網站開發' },
                    { value: 'photo', label: '攝影' },
                  ]}
                />
              </Field>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="g-footer">
        <div className="container">
          <div className="g-footer__brand" style={{ color: 'var(--cream-50)' }}>
            <LeafMark size={26} />
            Verdant UI
          </div>
          <p>森林風格元件庫與示範網頁 · 版型示範 · 圖片影片皆為尺寸佔位符</p>
          <p style={{ marginTop: '0.4rem', fontSize: '0.82rem', color: 'rgba(244,241,233,0.5)' }}>
            © {new Date().getFullYear()} Verdant · 以 @verdant/ui 打造
          </p>
        </div>
      </footer>

      {/* ===== Component preview popup ===== */}
      <AnimatePresence>
        {active && (
          <ComponentPreviewPopup
            key={active.item.name}
            item={active.item}
            origin={{ x: active.x, y: active.y }}
            onClose={() => setActive(null)}
          />
        )}
      </AnimatePresence>
    </>
  )
}
