import { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { MediaPlaceholder, MagneticButton, Reveal } from '@verdant/ui'
import DatePicker from '../components/DatePicker.jsx'
import BookingSummary from '../components/BookingSummary.jsx'
import RoomCard from '../components/RoomCard.jsx'
import { getRoom, rooms } from '../data/rooms.js'
import { useBooking } from '../context/BookingContext.jsx'

export default function RoomDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const room = getRoom(id)
  const { draft, nights, update, reserve } = useBooking()
  const [activeImg, setActiveImg] = useState(0)

  if (!room) {
    return (
      <section className="container" style={{ paddingTop: '10rem', paddingBottom: '6rem', textAlign: 'center' }}>
        <h1>找不到這個房型</h1>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/rooms" className="btn btn--primary" style={{ marginTop: '1.5rem' }}>
            回到房型
          </Link>
        </p>
      </section>
    )
  }

  const [mw, mh] = room.placeholders.main
  const guests = Math.min(draft.guests, room.capacity)
  const related = rooms.filter((r) => r.id !== room.id).slice(0, 3)

  const handleReserve = () => {
    reserve(
      { roomId: room.id, checkIn: draft.checkIn, checkOut: draft.checkOut, guests },
      room.name,
    )
    navigate('/booking')
  }

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
                  ratio="4 / 3"
                  label={`${room.name}・主圖 ${activeImg + 1}`}
                />
              </motion.div>
            </AnimatePresence>

            <div className="pd__thumbs">
              {room.placeholders.thumbs.map(([tw, th], i) => (
                <button
                  key={i}
                  className={`pd__thumb ${i === activeImg ? 'pd__thumb--active' : ''}`}
                  onClick={() => setActiveImg(i)}
                  aria-label={`縮圖 ${i + 1}`}
                >
                  <MediaPlaceholder type="image" width={tw} height={th} ratio="4 / 3" bare />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <Reveal>
              <span className="pd__cat">{room.type} · 可住 {room.capacity} 人 · {room.size}</span>
              <h1 className="pd__title">{room.name}</h1>
              <p className="pd__desc">{room.desc}</p>
            </Reveal>

            <Reveal delay={0.05}>
              <ul className="amenities">
                {room.amenities.map((a) => (
                  <li key={a} className="amenities__item">{a}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="pd__specs">
                {room.specs.map(([k, v]) => (
                  <div className="pd__spec" key={k}>
                    <span>{k}</span>
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <div className="roomd__book">
                <DatePicker
                  checkIn={draft.checkIn}
                  checkOut={draft.checkOut}
                  guests={guests}
                  maxGuests={room.capacity}
                  onChange={update}
                />
                <MagneticButton
                  className="btn btn--primary btn--block"
                  onClick={handleReserve}
                  disabled={nights <= 0}
                  style={nights <= 0 ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
                >
                  {nights > 0 ? `加入預約 · 共 ${nights} 晚` : '請先選擇入住日期'}
                </MagneticButton>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Related rooms */}
      <section className="container section">
        <div className="sec-head">
          <Reveal>
            <span className="eyebrow">你可能也喜歡</span>
            <h2>其他房型</h2>
          </Reveal>
        </div>
        <motion.div
          className="grid grid--feature"
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-60px' }}
        >
          {related.map((r) => (
            <RoomCard key={r.id} room={r} />
          ))}
        </motion.div>
      </section>
    </>
  )
}
