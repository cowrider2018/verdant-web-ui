import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ProductCard from '../components/ProductCard.jsx'
import Reveal from '../components/Reveal.jsx'
import { products, categories } from '../data/products.js'

export default function Products() {
  const [active, setActive] = useState('全部')

  const filtered =
    active === '全部' ? products : products.filter((p) => p.category === active)

  return (
    <>
      <section className="container page-head">
        <Reveal>
          <span className="eyebrow">全部選物</span>
          <h1>森林選物誌</h1>
          <p>低飽和的綠與棕，從咖啡到木作。挑一件，把自然的節奏帶回家。</p>
        </Reveal>
      </section>

      <section className="container section" style={{ paddingTop: '2rem' }}>
        <Reveal className="filters">
          {categories.map((c) => (
            <button
              key={c}
              className={`chip ${active === c ? 'chip--active' : ''}`}
              onClick={() => setActive(c)}
            >
              {c}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid grid--products">
          <AnimatePresence mode="popLayout">
            {filtered.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <ProductCard product={p} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="center" style={{ padding: '3rem', color: 'var(--ink-faint)' }}>
            此分類暫無商品。
          </p>
        )}
      </section>
    </>
  )
}
