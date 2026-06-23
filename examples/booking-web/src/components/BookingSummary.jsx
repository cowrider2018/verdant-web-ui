import { formatPrice } from '@verdant/ui'

export const CLEANING_FEE = 600

/** 計算單筆預約金額：房價 × 晚數 + 清潔費（晚數為 0 時不計清潔費）。 */
export function calcTotal(room, nights) {
  if (!room || nights <= 0) return { roomCost: 0, cleaning: 0, total: 0 }
  const roomCost = room.pricePerNight * nights
  return { roomCost, cleaning: CLEANING_FEE, total: roomCost + CLEANING_FEE }
}

const fmtDate = (s) =>
  s ? new Date(s).toLocaleDateString('zh-TW', { month: 'long', day: 'numeric', weekday: 'short' }) : '—'

/**
 * BookingSummary — 預約摘要卡：房型、日期、晚數、人數與金額明細。
 */
export default function BookingSummary({ room, checkIn, checkOut, guests, nights }) {
  const { roomCost, cleaning, total } = calcTotal(room, nights)

  return (
    <div className="bsum">
      <h3 className="serif bsum__title">預約摘要</h3>

      {room && (
        <div className="bsum__room">
          <span className="bsum__roomname">{room.name}</span>
          <span className="bsum__roomtype">{room.type} · {room.size}</span>
        </div>
      )}

      <div className="bsum__row">
        <span>入住</span>
        <span>{fmtDate(checkIn)}</span>
      </div>
      <div className="bsum__row">
        <span>退房</span>
        <span>{fmtDate(checkOut)}</span>
      </div>
      <div className="bsum__row">
        <span>入住人數</span>
        <span>{guests} 人</span>
      </div>

      <div className="bsum__divider" />

      {nights > 0 && room ? (
        <>
          <div className="bsum__row">
            <span>{formatPrice(room.pricePerNight)} × {nights} 晚</span>
            <span>{formatPrice(roomCost)}</span>
          </div>
          <div className="bsum__row">
            <span>清潔費</span>
            <span>{formatPrice(cleaning)}</span>
          </div>
          <div className="bsum__total">
            <span>總計</span>
            <b>{formatPrice(total)}</b>
          </div>
        </>
      ) : (
        <p className="bsum__hint">選擇日期後即可看到金額明細。</p>
      )}
    </div>
  )
}
