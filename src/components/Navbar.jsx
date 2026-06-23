import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../context/CartContext.jsx'
import Brand from './Brand.jsx'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { count } = useCart()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? 'nav--scrolled' : ''}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand" style={{ color: 'var(--forest-700)' }}>
          <Brand size={26} />
          Verdant
        </Link>

        <nav className="nav__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav__link ${isActive ? 'nav__link--active' : ''}`
            }
          >
            首頁
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `nav__link ${isActive ? 'nav__link--active' : ''}`
            }
          >
            選物
          </NavLink>
          <NavLink
            to="/products/cold-drip-coffee"
            className={({ isActive }) =>
              `nav__link ${isActive ? 'nav__link--active' : ''}`
            }
          >
            本月精選
          </NavLink>
        </nav>

        <Link to="/cart" className="nav__cart" aria-label={`購物車，${count} 件`}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path d="M3 4h2l2.5 12h10l2-8H6.5" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="9" cy="20" r="1.4" fill="currentColor" />
            <circle cx="17" cy="20" r="1.4" fill="currentColor" />
          </svg>
          <span className="label">購物車</span>
          <AnimatePresence>
            {count > 0 && (
              <motion.span
                key={count}
                className="nav__badge"
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 18 }}
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </div>
    </header>
  )
}
