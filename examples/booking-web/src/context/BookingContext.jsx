import { createContext, useContext, useEffect, useState } from 'react'

const BookingContext = createContext(null)
const STORAGE_KEY = 'verdant-booking'

const EMPTY = { roomId: null, checkIn: '', checkOut: '', guests: 2 }

/** 計算兩個 yyyy-mm-dd 日期之間的住宿晚數（無效或反序回傳 0）。 */
export function diffNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime()
  if (Number.isNaN(ms) || ms <= 0) return 0
  return Math.round(ms / 86400000)
}

function init() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? { ...EMPTY, ...JSON.parse(raw) } : EMPTY
  } catch {
    return EMPTY
  }
}

export function BookingProvider({ children }) {
  const [draft, setDraft] = useState(init)
  const [confirmation, setConfirmation] = useState(null)
  const [toast, setToast] = useState(null)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(draft))
    } catch {
      /* ignore */
    }
  }, [draft])

  // toast 自動消失
  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(null), 2400)
    return () => clearTimeout(t)
  }, [toast])

  const nights = diffNights(draft.checkIn, draft.checkOut)

  // 局部更新預約草稿（日期 / 人數 / 房型）
  const update = (patch) => setDraft((d) => ({ ...d, ...patch }))

  // 在房型詳情選好條件後加入預約
  const reserve = ({ roomId, checkIn, checkOut, guests }, roomName) => {
    setDraft((d) => ({
      ...d,
      roomId,
      checkIn: checkIn ?? d.checkIn,
      checkOut: checkOut ?? d.checkOut,
      guests: guests ?? d.guests,
    }))
    setToast(`已加入預約 · ${roomName ?? ''}`.trim())
  }

  // 完成預約 → 產生確認碼
  const confirm = (guestInfo) => {
    const code =
      'VS-' + Math.random().toString(36).slice(2, 7).toUpperCase()
    const result = { code, ...draft, guestInfo, nights }
    setConfirmation(result)
    setToast('預約已確認 · ' + code)
    return result
  }

  // 清空草稿與確認狀態（再訂一筆）
  const reset = () => {
    setDraft(EMPTY)
    setConfirmation(null)
  }

  return (
    <BookingContext.Provider
      value={{ draft, nights, update, reserve, confirm, reset, confirmation, toast }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking 必須在 BookingProvider 內使用')
  return ctx
}
