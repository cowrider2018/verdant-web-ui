import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import {
  MediaPlaceholder,
  MagneticButton,
  Parallax,
  Reveal,
  SunFlare,
  SectionDivider,
} from '@verdant/ui'
import RoomCard from '../components/RoomCard.jsx'
import { rooms } from '../data/rooms.js'

const TITLE = ['在', '樹梢', '與', '星空', '之間', '入眠']

const facilities = [
  { label: '森林裸湯', size: [800, 1000] },
  { label: '山系餐桌', size: [800, 1000] },
  { label: '步道導覽', size: [800, 1000] },
  { label: '營火夜談', size: [800, 1000] },
]

export default function Home() {
  const reduce = useReducedMotion()
  const featured = rooms.slice(0, 3)

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero__media">
          <Parallax speed={reduce ? 0 : 60} style={{ height: '116%', marginTop: '-8%' }}>
            <MediaPlaceholder type="video" width={1920} height={1080} label="旅宿主視覺空拍影片" bare />
          </Parallax>
        </div>
        <div className="hero__scrim" />

        {/* 光暈僅在主視覺圖片區域顯示，由 .hero 的 overflow:hidden 裁切 */}
        <SunFlare />

        <div className="container hero__content">
          <motion.span
            className="eyebrow"
            style={{ color: 'var(--sage-200)', display: 'block', marginBottom: '1.4rem' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            森林旅宿 · Verdant Stay
          </motion.span>

          <h1 className="hero__title" aria-label="在樹梢與星空之間入眠">
            {TITLE.map((word, i) => (
              <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  className="word"
                  initial={reduce ? { opacity: 0 } : { y: '110%' }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                  {i < TITLE.length - 1 ? ' ' : ''}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            className="hero__lede"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
          >
            隱身山林的慢宿。樹屋、溪畔木屋與觀星閣樓，選一處安放疲憊，讓森林替你調慢呼吸。
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Link to="/rooms">
              <MagneticButton className="btn btn--gold">瀏覽房型</MagneticButton>
            </Link>
            <Link
              to="/rooms/canopy-treehouse"
              className="btn btn--ghost"
              style={{ color: 'var(--cream-50)', borderColor: 'rgba(244,241,233,0.4)' }}
            >
              人氣樹屋
            </Link>
          </motion.div>
        </div>

        <motion.div
          className="hero__scroll"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 1 }}
        >
          向下捲動
          <span />
        </motion.div>
      </section>

      {/* ===== Intro banner ===== */}
      <section className="section container">
        <Reveal>
          <MediaPlaceholder type="image" width={1200} height={675} label="旅宿全景橫幅" />
        </Reveal>
      </section>

      {/* ===== Featured rooms ===== */}
      <section className="section container" id="rooms">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">精選房型</span>
            <h2>選一處，安放此刻</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>從樹梢到溪畔，每一間都被森林環抱。低調的木質與綠意，是給疲憊旅人的溫柔提案。</p>
          </Reveal>
        </div>

        <motion.div
          className="grid grid--feature"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featured.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </motion.div>

        <Reveal className="center" delay={0.1}>
          <div style={{ marginTop: '3rem' }}>
            <Link to="/rooms" className="btn btn--primary">查看全部房型 →</Link>
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      {/* ===== Story w/ parallax ===== */}
      <section className="section container" id="story">
        <div className="story">
          <div className="story__media">
            <Parallax speed={reduce ? 0 : 50}>
              <MediaPlaceholder type="image" width={1000} height={1200} label="旅宿故事主圖" />
            </Parallax>
            <Parallax speed={reduce ? 0 : -40} className="floaty">
              <MediaPlaceholder type="image" width={500} height={500} label="細節" />
            </Parallax>
          </div>

          <div className="story__text">
            <Reveal>
              <span className="eyebrow">關於旅宿</span>
              <h2>把房子，<br />蓋進森林的縫隙裡</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                森林旅宿始於一個念頭：不砍樹，而是讓建築退讓給森林。我們沿著既有的樹與石，把每一間房安放進林子的縫隙，讓你推開窗，就走進一整片呼吸的綠。
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="story__stats">
                <div>
                  <div className="stat__num">6</div>
                  <div className="stat__label">獨立房型</div>
                </div>
                <div>
                  <div className="stat__num">12</div>
                  <div className="stat__label">公頃森林</div>
                </div>
                <div>
                  <div className="stat__num">4.9</div>
                  <div className="stat__label">旅客評分</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Facilities ===== */}
      <section className="section container" id="facilities">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">旅宿設施</span>
            <h2>住一晚，森活一整天</h2>
          </Reveal>
        </div>
        <div className="cats">
          {facilities.map((f, i) => (
            <Reveal key={f.label} delay={i * 0.08}>
              <div className="cat" style={{ display: 'block' }}>
                <MediaPlaceholder type="image" width={f.size[0]} height={f.size[1]} bare label={f.label} />
                <span className="cat__scrim" />
                <span className="cat__label">{f.label}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="section container" id="location">
        <Reveal>
          <div className="news">
            <span className="news__leaf" aria-hidden="true">🌲</span>
            <span className="eyebrow" style={{ color: 'var(--gold-300)' }}>準備好了嗎</span>
            <h2>讓森林替你預留一夜寧靜</h2>
            <p style={{ color: 'rgba(244,241,233,0.8)', maxWidth: '40ch', marginTop: '1rem' }}>
              即時查詢空房與房價，三步驟完成預約。把行李交給山，把日常留在山腳。
            </p>
            <div style={{ marginTop: '2rem' }}>
              <Link to="/rooms">
                <MagneticButton className="btn btn--gold">開始預約</MagneticButton>
              </Link>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  )
}
