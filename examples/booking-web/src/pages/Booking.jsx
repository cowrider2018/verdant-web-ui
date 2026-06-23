import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Reveal, MagneticButton, formatPrice, Field, TextInput, Textarea } from '@verdant/ui'
import DatePicker from '../components/DatePicker.jsx'
import BookingSummary, { calcTotal } from '../components/BookingSummary.jsx'
import { getRoom } from '../data/rooms.js'
import { useBooking } from '../context/BookingContext.jsx'

export default function Booking() {
  const navigate = useNavigate()
  const { draft, nights, update, confirm, reset, confirmation } = useBooking()
  const room = getRoom(draft.roomId)
  const [guest, setGuest] = useState({ name: '', email: '', phone: '', note: '' })

  // ===== 已完成預約：顯示確認畫面 =====
  if (confirmation) {
    const r = getRoom(confirmation.roomId)
    const { total } = calcTotal(r, confirmation.nights)
    return (
      <section className="container" style={{ paddingTop: '9rem', paddingBottom: '6rem' }}>
        <Reveal className="confirm">
          <div className="confirm__badge" aria-hidden="true">✓</div>
          <span className="eyebrow">預約完成</span>
          <h1 className="confirm__title">山林已為你預留</h1>
          <p className="confirm__code">確認碼 · {confirmation.code}</p>
          <p style={{ color: 'var(--ink-soft)', marginTop: '0.6rem' }}>
            {r?.name} ・ 共 {confirmation.nights} 晚 ・ {confirmation.guests} 人 ・ {formatPrice(total)}
          </p>
          <p style={{ color: 'var(--ink-faint)', marginTop: '1rem', fontSize: '0.9rem' }}>
            確認信已寄至 {confirmation.guestInfo?.email || '你的信箱'}（此為示範，不會真的寄出）。
          </p>
          <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              className="btn btn--primary"
              onClick={() => {
                reset()
                navigate('/rooms')
              }}
            >
              再訂一筆
            </button>
            <Link to="/" className="btn btn--ghost">回首頁</Link>
          </div>
        </Reveal>
      </section>
    )
  }

  // ===== 尚未選擇房型：空狀態 =====
  if (!room) {
    return (
      <section className="container">
        <Reveal className="cart__empty" style={{ paddingTop: '9rem' }}>
          <h2>還沒有選擇房型</h2>
          <p style={{ color: 'var(--ink-soft)', marginBottom: '2rem' }}>
            先去挑一間森林居所，選好日期就能在這裡完成預約。
          </p>
          <Link to="/rooms" className="btn btn--primary">瀏覽房型</Link>
        </Reveal>
      </section>
    )
  }

  const guests = Math.min(draft.guests, room.capacity)
  const canConfirm = nights > 0 && guest.name && guest.email

  const handleConfirm = (e) => {
    e.preventDefault()
    if (!canConfirm) return
    confirm(guest)
    window.scrollTo({ top: 0 })
  }

  return (
    <section className="container" style={{ paddingTop: '8rem', paddingBottom: '5rem' }}>
      <Reveal>
        <span className="eyebrow">完成預約</span>
        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', marginBottom: '2rem' }}>
          確認你的森林假期
        </h1>
      </Reveal>

      <form className="cart" onSubmit={handleConfirm}>
        <div>
          {/* 可再次調整日期 / 人數 */}
          <div className="booking__block">
            <h3 className="serif booking__blocktitle">入住資訊</h3>
            <DatePicker
              checkIn={draft.checkIn}
              checkOut={draft.checkOut}
              guests={guests}
              maxGuests={room.capacity}
              onChange={update}
            />
          </div>

          {/* 入住人資料 */}
          <div className="booking__block">
            <h3 className="serif booking__blocktitle">入住人資料</h3>
            <div className="formgrid">
              <Field label="姓名 *">
                <TextInput
                  type="text"
                  required
                  value={guest.name}
                  onChange={(e) => setGuest({ ...guest, name: e.target.value })}
                  placeholder="王小森"
                />
              </Field>
              <Field label="電子信箱 *">
                <TextInput
                  type="email"
                  required
                  value={guest.email}
                  onChange={(e) => setGuest({ ...guest, email: e.target.value })}
                  placeholder="you@example.com"
                />
              </Field>
              <Field label="聯絡電話">
                <TextInput
                  type="tel"
                  value={guest.phone}
                  onChange={(e) => setGuest({ ...guest, phone: e.target.value })}
                  placeholder="0912-345-678"
                />
              </Field>
              <Field label="備註（飲食 / 抵達時間等）" full>
                <Textarea
                  rows={3}
                  value={guest.note}
                  onChange={(e) => setGuest({ ...guest, note: e.target.value })}
                  placeholder="預計傍晚抵達，一位素食。"
                />
              </Field>
            </div>
          </div>
        </div>

        {/* Summary aside */}
        <aside className="cart__summary">
          <BookingSummary
            room={room}
            checkIn={draft.checkIn}
            checkOut={draft.checkOut}
            guests={guests}
            nights={nights}
          />
          <div style={{ marginTop: '1.5rem' }}>
            <MagneticButton
              className="btn btn--gold btn--block"
              type="submit"
              disabled={!canConfirm}
              style={!canConfirm ? { opacity: 0.5, cursor: 'not-allowed' } : undefined}
            >
              確認預約
            </MagneticButton>
          </div>
          {!canConfirm && (
            <p style={{ fontSize: '0.8rem', color: 'var(--ink-faint)', marginTop: '0.8rem', textAlign: 'center' }}>
              {nights <= 0 ? '請選擇入住與退房日期' : '請填寫姓名與電子信箱'}
            </p>
          )}
          <Link
            to="/rooms"
            className="btn btn--ghost btn--block"
            style={{ marginTop: '0.8rem' }}
          >
            繼續挑房
          </Link>
        </aside>
      </form>
    </section>
  )
}
