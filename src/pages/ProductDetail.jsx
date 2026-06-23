import { useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import MediaPlaceholder from '../components/MediaPlaceholder.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Reveal from '../components/Reveal.jsx'
import ProductCard from '../components/ProductCard.jsx'
import { getProduct, products, formatPrice } from '../data/products.js'
import { useCart } from '../context/CartContext.jsx'

export default function ProductDetail() {
  const { id } = useParams()
  const product = getProduct(id)
  const { add } = useCart()
  const [activeImg, setActiveImg] = useState(0)
  const [qty, setQty] = useState(1)

  if (!product) {
    return (
      <section className="container" style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1>找不到這件商品</h1>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/products" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
            回到選物
          </Link>
        </p>
      </section>
    )
  }

  const [mw, mh] = product.placeholders.main
  const related = products.filter((p) => p.id !== product.id).slice(0, 4)

  return (
    <>
      <section className="container" style={{ paddingTop: '8rem', paddingBottom: '4rem' }}>
        <div className="pd">
          {/* Gallery */}
          <div className="pd__gallery">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImg}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <MediaPlaceholder
                  type="image"
                  width={mw}
                  height={mh}
                  ratio="1 / 1"
                  label={`${product.name}・主圖 ${activeImg + 1}`}
                />
              </motion.div>
            </AnimatePresence>

            <div className="pd__thumbs">
              {product.placeholders.thumbs.map(([tw, th], i) => (
                <button
                  key={i}
                  className={`pd__thumb ${i === activeImg ? 'pd__thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`縮圖 ${i + 1}`}
                >
                  <MediaPlaceholder type="image" width={tw} height={th} ratio="1 / 1" bare />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <Reveal>
              <span className="pd__cat">{product.category}</span>
              <h1 className="pd__title">{product.name}</h1>
              <div className="pd__price">
                {formatPrice(product.price)}{' '}
                <span style={{ fontSize: '1rem', color: 'var(--ink-faint)', fontWeight: 400 }}>
                  {product.unit}
                </span>
              </div>
              <p className="pd__desc">{product.desc}</p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pd__specs">
                {product.specs.map(([k, v]) => (
                  <div className="pd__spec" key={k}>
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="pd__buy">
                <div className="qty">
                  <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="減少數量">−</button>
                  <span>{qty}</span>
                  <button onClick={() => setQty((q) => q + 1)} aria-label="增加數量">＋</button>
                </div>
                <MagneticButton className="btn btn--primary" onClick={() => add(product, qty)}>
                  加入購物車 · {formatPrice(product.price * qty)}
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="container section">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">你可能也喜歡</span>
            <h2>延伸選物</h2>
          </Reveal>
        </div>
        <motion.div
          className="grid grid--products"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {related.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </motion.div>
      </section>
    </>
  )
}
