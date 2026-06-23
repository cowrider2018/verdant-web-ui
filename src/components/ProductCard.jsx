import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import MediaPlaceholder from './MediaPlaceholder.jsx'
import { formatPrice } from '../data/products.js'

/**
 * ProductCard — hover 時依游標位置做 3D 傾斜，並有光澤掃過 + 進場動畫。
 * 以 framer-motion variants 配合父層 staggerChildren。
 */
const variants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}

export default function ProductCard({ product }) {
  const reduce = useReducedMotion()
  const ref = useRef(null)
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const rotateX = useSpring(useTransform(ry, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 })
  const rotateY = useSpring(useTransform(rx, [-0.5, 0.5], [-10, 10]), { stiffness: 200, damping: 18 })

  const handleMove = (e) => {
    if (reduce || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rx.set((e.clientX - rect.left) / rect.width - 0.5)
    ry.set((e.clientY - rect.top) / rect.height - 0.5)
  }
  const reset = () => {
    rx.set(0)
    ry.set(0)
  }

  const [w, h] = product.placeholders.main

  return (
    <motion.article
      variants={variants}
      className="card"
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ rotateX: reduce ? 0 : rotateX, rotateY: reduce ? 0 : rotateY }}
      whileHover={reduce ? {} : { y: -6 }}
    >
      <Link to={`/products/${product.id}`} aria-label={product.name}>
        <div className="card__media">
          {product.tag && <span className="card__tag">{product.tag}</span>}
          <span className="card__sheen" />
          <MediaPlaceholder
            type="image"
            width={w}
            height={h}
            ratio="1 / 1"
            label={product.name}
          />
        </div>
        <div className="card__body">
          <span className="card__cat">{product.category}</span>
          <h3 className="card__name">{product.name}</h3>
          <p className="card__blurb">{product.blurb}</p>
          <div className="card__foot">
            <span className="price">
              {formatPrice(product.price)} <small>{product.unit}</small>
            </span>
            <span className="btn btn--ghost" style={{ padding: '0.5em 1.1em', fontSize: '0.85rem' }}>
              查看
            </span>
          </div>
        </div>
      </Link>
    </motion.article>
  )
}
