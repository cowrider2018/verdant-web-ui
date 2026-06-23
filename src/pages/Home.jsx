import { Link } from 'react-router-dom'
import { motion, useReducedMotion } from 'framer-motion'
import MediaPlaceholder from '../components/MediaPlaceholder.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Parallax from '../components/Parallax.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import SectionDivider from '../components/SectionDivider.jsx'
import { products } from '../data/products.js'

const TITLE = ['走進', '一座', '可被', '收藏', '的森林']

const categoryTiles = [
  { label: '咖啡與茶', size: [800, 1000] },
  { label: '植栽綠意', size: [800, 1000] },
  { label: '居家香氛', size: [800, 1000] },
  { label: '森活文具', size: [800, 1000] },
]

export default function Home() {
  const reduce = useReducedMotion()
  const featured = products.slice(0, 4)

  return (
    <>
      {/* ===== Hero ===== */}
      <section className="hero">
        <div className="hero__media">
          <Parallax speed={reduce ? 0 : 60} style={{ height: '116%', marginTop: '-8%' }}>
            <MediaPlaceholder
              type="video"
              width={1920}
              height={1080}
              label="主視覺背景影片"
              bare
            />
          </Parallax>
        </div>
        <div className="hero__scrim" />

        <div className="container hero__content">
          <motion.span
            className="eyebrow"
            style={{ color: 'var(--sage-200)', display: 'block', marginBottom: '1.4rem' }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Verdant · 森林選物
          </motion.span>

          <h1 className="hero__title" aria-label="走進一座可被收藏的森林">
            {TITLE.map((word, i) => (
              <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
                <motion.span
                  className="word"
                  initial={reduce ? { opacity: 0 } : { y: '110%' }}
                  animate={reduce ? { opacity: 1 } : { y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {word}
                  {i < TITLE.length - 1 ? ' ' : ''}
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
            以中低飽和的綠與棕，蒐羅咖啡、植栽、香氛與木作。把森林的呼吸，帶回日常。
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
          >
            <Link to="/products">
              <MagneticButton className="btn btn--gold">探索選物</MagneticButton>
            </Link>
            <Link to="/products/cold-drip-coffee" className="btn btn--ghost" style={{ color: 'var(--cream-50)', borderColor: 'rgba(244,241,233,0.4)' }}>
              本月精選
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

      {/* ===== Featured banner ===== */}
      <section className="section container">
        <Reveal>
          <MediaPlaceholder
            type="image"
            width={1200}
            height={675}
            label="特色主題橫幅"
          />
        </Reveal>
      </section>

      {/* ===== Featured products ===== */}
      <section className="section container" id="featured">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">本季精選</span>
            <h2>森林帶來的好物</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>每一件都來自我們對自然質地的偏執。低調的色澤，耐看的細節，陪你度過漫長季節。</p>
          </Reveal>
        </div>

        <motion.div
          className="grid grid--products"
          variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>

        <Reveal className="center" delay={0.1}>
          <div style={{ marginTop: '3rem' }}>
            <Link to="/products" className="btn btn--primary">查看全部選物 →</Link>
          </div>
        </Reveal>
      </section>

      <SectionDivider />

      {/* ===== Brand story w/ parallax ===== */}
      <section className="section container" id="story">
        <div className="story">
          <div className="story__media">
            <Parallax speed={reduce ? 0 : 50}>
              <MediaPlaceholder type="image" width={1000} height={1200} label="品牌故事主圖" />
            </Parallax>
            <Parallax speed={reduce ? 0 : -40} className="floaty">
              <MediaPlaceholder type="image" width={500} height={500} label="細節" />
            </Parallax>
          </div>

          <div className="story__text">
            <Reveal>
              <span className="eyebrow">我們的故事</span>
              <h2>從一片落葉開始的<br />慢生活提案</h2>
            </Reveal>
            <Reveal delay={0.1}>
              <p>
                Verdant 始於一次霧林裡的散步。我們著迷於苔蘚的綠、樹皮的棕，以及光線穿過枝葉的溫柔。於是把這份感受，化作一件件可以帶回家的選物——讓城市裡的你，也能擁有森林的呼吸節奏。
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="story__stats">
                <div>
                  <div className="stat__num">120+</div>
                  <div className="stat__label">精選品項</div>
                </div>
                <div>
                  <div className="stat__num">98%</div>
                  <div className="stat__label">可回收包材</div>
                </div>
                <div>
                  <div className="stat__num">15</div>
                  <div className="stat__label">合作職人工坊</div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ===== Categories ===== */}
      <section className="section container">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">依分類探索</span>
            <h2>找到你的那片綠</h2>
          </Reveal>
        </div>
        <div className="cats">
          {categoryTiles.map((c, i) => (
            <Reveal key={c.label} delay={i * 0.08}>
              <Link to="/products" className="cat" style={{ display: 'block' }}>
                <MediaPlaceholder type="image" width={c.size[0]} height={c.size[1]} bare label={c.label} />
                <span className="cat__scrim" />
                <span className="cat__label">{c.label}</span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ===== Newsletter ===== */}
      <section className="section container">
        <Reveal>
          <div className="news">
            <span className="news__leaf" aria-hidden="true">🌿</span>
            <span className="eyebrow" style={{ color: 'var(--gold-300)' }}>森活誌</span>
            <h2>訂閱我們的季節來信</h2>
            <form
              className="news__form"
              onSubmit={(e) => {
                e.preventDefault()
                e.currentTarget.reset()
              }}
            >
              <input type="email" required placeholder="你的電子信箱" aria-label="電子信箱" />
              <MagneticButton className="btn btn--gold" type="submit">訂閱</MagneticButton>
            </form>
          </div>
        </Reveal>
      </section>
    </>
  )
}
