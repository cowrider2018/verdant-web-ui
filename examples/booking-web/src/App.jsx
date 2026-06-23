import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { LeafMark } from '@verdant/ui'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import { useBooking } from './context/BookingContext.jsx'
import Home from './pages/Home.jsx'
import Rooms from './pages/Rooms.jsx'
import RoomDetail from './pages/RoomDetail.jsx'
import Booking from './pages/Booking.jsx'

const pageVariants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  exit: { opacity: 0, y: -16, transition: { duration: 0.35, ease: [0.4, 0, 1, 1] } },
}

function Page({ children }) {
  return (
    <motion.main variants={pageVariants} initial="initial" animate="enter" exit="exit">
      {children}
    </motion.main>
  )
}

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }, [pathname])
  return null
}

function Toast() {
  const { toast } = useBooking()
  return (
    <AnimatePresence>
      {toast && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 360, damping: 24 }}
        >
          <span style={{ color: 'var(--gold-300)' }}>
            <LeafMark size={18} />
          </span>
          {toast}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/rooms" element={<Page><Rooms /></Page>} />
          <Route path="/rooms/:id" element={<Page><RoomDetail /></Page>} />
          <Route path="/booking" element={<Page><Booking /></Page>} />
        </Routes>
      </AnimatePresence>
      <Footer />
      <Toast />
    </>
  )
}
