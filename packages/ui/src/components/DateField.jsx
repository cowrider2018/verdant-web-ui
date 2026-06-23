import { useState, useRef, useEffect, useLayoutEffect } from 'react'
import { createPortal } from 'react-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const pad = (n) => String(n).padStart(2, '0')
const toStr = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
const parse = (s) => {
  if (!s) return null
  const [y, m, d] = s.split('-').map(Number)
  return new Date(y, m - 1, d)
}
const sameDay = (a, b) =>
  a && b && a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
const startOfDay = (d) => new Date(d.getFullYear(), d.getMonth(), d.getDate())

const WEEKDAYS = ['日', '一', '二', '三', '四', '五', '六']
const MONTHS = ['1 月', '2 月', '3 月', '4 月', '5 月', '6 月', '7 月', '8 月', '9 月', '10 月', '11 月', '12 月']

/**
 * DateField — 自訂日期選擇器，附森林主題小日曆面板。
 * 受控元件：value 為 'YYYY-MM-DD' 字串，選取時呼叫 onChange(value)。
 * min 限制最早可選日期（同為 'YYYY-MM-DD'）。原生月曆無法套用樣式，故自繪。
 * 面板以 portal 掛到 document.body，避免被卡片的 overflow / transform / filter
 * 等堆疊脈絡裁切或遮蔽。
 */
export default function DateField({
  value,
  onChange,
  min,
  placeholder = '選擇日期',
  className = '',
  ...rest
}) {
  const [open, setOpen] = useState(false)
  const [coords, setCoords] = useState(null)
  const triggerRef = useRef(null)
  const popRef = useRef(null)
  const reduce = useReducedMotion()

  const selected = parse(value)
  const minDate = min ? startOfDay(parse(min)) : null
  const today = startOfDay(new Date())

  // 目前檢視的月份（以該月 1 號代表）
  const [view, setView] = useState(() => selected || today)
  useEffect(() => {
    if (selected) setView(selected)
  }, [value]) // eslint-disable-line react-hooks/exhaustive-deps

  // 依觸發按鈕位置擺放面板（fixed 定位）
  const place = () => {
    const el = triggerRef.current
    if (!el) return
    const r = el.getBoundingClientRect()
    setCoords({ top: r.bottom + 8, left: r.left, width: r.width })
  }
  useLayoutEffect(() => {
    if (open) place()
  }, [open])

  // 點擊外部 / Esc 關閉；捲動 / 縮放時重新定位
  useEffect(() => {
    if (!open) return
    const onDoc = (e) => {
      if (triggerRef.current && triggerRef.current.contains(e.target)) return
      if (popRef.current && popRef.current.contains(e.target)) return
      setOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }
    const onReposition = () => place()
    document.addEventListener('mousedown', onDoc)
    document.addEventListener('keydown', onKey)
    window.addEventListener('resize', onReposition)
    window.addEventListener('scroll', onReposition, true)
    return () => {
      document.removeEventListener('mousedown', onDoc)
      document.removeEventListener('keydown', onKey)
      window.removeEventListener('resize', onReposition)
      window.removeEventListener('scroll', onReposition, true)
    }
  }, [open])

  const viewYear = view.getFullYear()
  const viewMonth = view.getMonth()
  const firstWeekday = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(viewYear, viewMonth, i + 1)),
  ]

  const goMonth = (delta) => setView(new Date(viewYear, viewMonth + delta, 1))
  const pick = (d) => {
    onChange(toStr(d))
    setOpen(false)
  }
  const isDisabled = (d) => Boolean(minDate && d < minDate)

  return (
    <div className={`datefield ${className}`.trim()} {...rest}>
      <button
        ref={triggerRef}
        type="button"
        className={`input datefield__trigger ${value ? '' : 'datefield__trigger--empty'}`.trim()}
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="dialog"
        aria-expanded={open}
      >
        <span>{value || placeholder}</span>
        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="4" width="18" height="18" rx="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      </button>

      {createPortal(
        <AnimatePresence>
          {open && coords && (
            <motion.div
              ref={popRef}
              className="datefield__pop"
              role="dialog"
              style={{ top: coords.top, left: coords.left, minWidth: coords.width }}
              initial={reduce ? false : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18 }}
            >
              <div className="datefield__head">
                <button type="button" className="datefield__nav" onClick={() => goMonth(-1)} aria-label="上個月">‹</button>
                <span className="datefield__title">{viewYear} 年 {MONTHS[viewMonth]}</span>
                <button type="button" className="datefield__nav" onClick={() => goMonth(1)} aria-label="下個月">›</button>
              </div>

              <div className="datefield__grid">
                {WEEKDAYS.map((w) => (
                  <span key={w} className="datefield__wd">{w}</span>
                ))}
                {cells.map((d, i) =>
                  d ? (
                    <button
                      key={i}
                      type="button"
                      className={
                        'datefield__day' +
                        (sameDay(d, selected) ? ' datefield__day--sel' : '') +
                        (sameDay(d, today) ? ' datefield__day--today' : '')
                      }
                      disabled={isDisabled(d)}
                      onClick={() => pick(d)}
                    >
                      {d.getDate()}
                    </button>
                  ) : (
                    <span key={i} className="datefield__day datefield__day--blank" />
                  )
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </div>
  )
}
