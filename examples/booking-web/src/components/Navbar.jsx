import { useEffect, useState } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { LeafMark } from '@verdant/ui'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

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
          <LeafMark size={26} />
          森林旅宿
        </Link>

        <nav className="nav__links">
          <NavLink
            to="/"
            end
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
          >
            首頁
          </NavLink>
          <NavLink
            to="/rooms"
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
          >
            房型
          </NavLink>
          <NavLink
            to="/booking"
            className={({ isActive }) => `nav__link ${isActive ? 'nav__link--active' : ''}`}
          >
            我的預約
          </NavLink>
        </nav>

        <Link to="/rooms" className="nav__cta">
          立即預約
        </Link>
      </div>
    </header>
  )
}
