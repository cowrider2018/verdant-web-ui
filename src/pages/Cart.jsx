import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import MediaPlaceholder from '../components/MediaPlaceholder.jsx'
import MagneticButton from '../components/MagneticButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { useCart } from '../context/CartContext.jsx'
import { getProduct, formatPrice } from '../data/products.js'

const SHIPPING = 120
const FREE_OVER = 1500

export default function Cart() {
  const { items, setQty, remove, clear } = useCart()

  const detailed = items
    .map((i) => ({ ...i, product: getProduct(i.id) }))
    .filter((i) => i.product)

  const subtotal = detailed.reduce((s, i) => s + i.product.price * i.qty, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_OVER ? 0 : SHIPPING
  const total = subtotal + shipping

  if (detailed.length === 0) {
    return (
      <section className="container">
        <Reveal className="cart__empty">
          <h2>你的購物車還很空曠</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>
            像一片等待生長的林地。去挑幾件森林好物吧。
          </p>
          <Link to="/products" className="btn btn--primary">前往選物</Link>
        </Reveal>
      </section>
    )
  }

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <Reveal>
        <span className="eyebrow">購物車</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', marginBottom: '2rem' }}>
          確認你的選物
        </h1>
      </Reveal>

      <div className="cart">
        <div>
          <AnimatePresence initial={false}>
            {detailed.map(({ product, qty }) => {
              const [tw, th] = [120, 120]
              return (
                <motion.div
                  key={product.id}
                  className="cart__item"
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30, height: 0, marginBlock: 0, paddingBlock: 0 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link to={`/products/${product.id}`}>
                    <MediaPlaceholder type="image" width={tw} height={th} ratio="1 / 1" />
                  </Link>

                  <div>
                    <div className="cart__cat">{product.category}</div>
                    <Link to={`/products/${product.id}`} className="cart__name">
                      {product.name}
                    </Link>
                    <div className="price" style={{ fontSize: '1rem', marginTop: '0.3rem' }}>
                      {formatPrice(product.price)} <small>{product.unit}</small>
                    </div>
                    <button className="cart__remove" onClick={() => remove(product.id)}>
                      移除
                    </button>
                  </div>

                  <div className="cart__qtycol" style={{ textAlign: 'right' }}>
                    <div className="qty">
                      <button onClick={() => setQty(product.id, qty - 1)} aria-label="減少">−</button>
                      <span>{qty}</span>
                      <button onClick={() => setQty(product.id, qty + 1)} aria-label="增加">＋</button>
                    </div>
                    <div className="price" style={{ marginTop: '0.7rem' }}>
                      {formatPrice(product.price * qty)}
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </AnimatePresence>

          <button
            className="cart__remove"
            style={{ marginTop: '1.5rem', display: 'inline-block' }}
            onClick={clear}
          >
            清空購物車
          </button>
        </div>

        {/* Summary */}
        <aside className="cart__summary">
          <h3 className="serif" style={{ fontSize: '1.4rem', marginBottom: '1rem' }}>訂單摘要</h3>
          <div className="cart__row">
            <span>小計</span>
            <span>{formatPrice(subtotal)}</span>
          </div>
          <div className="cart__row">
            <span>運費</span>
            <span>{shipping === 0 ? '免運' : formatPrice(shipping)}</span>
          </div>
          {shipping > 0 && (
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-faint)', marginTop: '0.3rem' }}>
              再湊 {formatPrice(FREE_OVER - subtotal)} 即可免運。
            </p>
          )}
          <div className="cart__total">
            <span>總計</span>
            <b>{formatPrice(total)}</b>
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <MagneticButton className="btn btn--gold btn--block">前往結帳</MagneticButton>
          </div>
          <Link
            to="/products"
            className="btn btn--ghost btn--block"
            style={{ marginTop: '0.8rem' }}
          >
            繼續選購
          </Link>
        </aside>
      </div>
    </section>
  )
}
