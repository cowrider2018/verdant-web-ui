import { diffNights } from '../context/BookingContext.jsx'

const todayStr = () => new Date().toISOString().slice(0, 10)

/**
 * DatePicker — 入住 / 退房日期 + 入住人數選擇，並即時顯示住宿晚數。
 * 受控元件：以 value 傳入 { checkIn, checkOut, guests }，變更時呼叫 onChange(patch)。
 */
export default function DatePicker({
  checkIn,
  checkOut,
  guests,
  maxGuests = 6,
  onChange,
  className = '',
}) {
  const nights = diffNights(checkIn, checkOut)
  const minOut = checkIn || todayStr()

  return (
    <div className={`datepick ${className}`}>
      <div className="datepick__row">
        <label className="datepick__field">
          <span>入住</span>
          <input
            type="date"
            value={checkIn}
            min={todayStr()}
            onChange={(e) => {
              const v = e.target.value
              // 若退房早於新入住日，順手清空退房
              const patch = { checkIn: v }
              if (checkOut && diffNights(v, checkOut) <= 0) patch.checkOut = ''
              onChange(patch)
            }}
          />
        </label>

        <label className="datepick__field">
          <span>退房</span>
          <input
            type="date"
            value={checkOut}
            min={minOut}
            onChange={(e) => onChange({ checkOut: e.target.value })}
          />
        </label>

        <label className="datepick__field">
          <span>入住人數</span>
          <select
            value={guests}
            onChange={(e) => onChange({ guests: Number(e.target.value) })}
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} 人
              </option>
            ))}
          </select>
        </label>
      </div>

      <p className="datepick__nights">
        {nights > 0 ? `共 ${nights} 晚` : '請選擇入住與退房日期'}
      </p>
    </div>
  )
}
