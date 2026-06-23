import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Reveal } from '@verdant/ui'
import RoomCard from '../components/RoomCard.jsx'
import { rooms, roomTypes } from '../data/rooms.js'

export default function Rooms() {
  const [active, setActive] = useState('全部')

  const filtered =
    active === '全部' ? rooms : rooms.filter((r) => r.type === active)

  return (
    <>
      <section className="container page-head">
        <Reveal>
          <span className="eyebrow">全部房型</span>
          <h1>挑一間屬於你的森林居所</h1>
          <p>從兩人樹屋到六人獨棟 Villa，依人數與心情選房。所有房價皆含早餐與步道導覽。</p>
        </Reveal>
      </section>

      <section className="container section" style={{ paddingTop: '2rem' }}>
        <Reveal className="filters">
          {roomTypes.map((t) => (
            <button
              key={t}
              className={`chip ${active === t ? 'chip--active' : ''}`}
              onClick={() => setActive(t)}
            >
              {t}
            </button>
          ))}
        </Reveal>

        <motion.div layout className="grid grid--feature">
          <AnimatePresence mode="popLayout">
            {filtered.map((r) => (
              <motion.div
                key={r.id}
                layout
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <RoomCard room={r} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="center" style={{ padding: '3rem', color: 'var(--ink-faint)' }}>
            此類型暫無房型。
          </p>
        )}
      </section>
    </>
  )
}
