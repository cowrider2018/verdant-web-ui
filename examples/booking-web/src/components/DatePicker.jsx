import { Field, DateField, Select } from '@verdant/ui'
import { diffNights } from '../context/BookingContext.jsx'

const pad = (n) => String(n).padStart(2, '0')
const fmt = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
// 本地時區的「今天」（避免 toISOString 的 UTC 位移造成當月日期被誤判為過去）
const todayStr = () => fmt(new Date())
// 'YYYY-MM-DD' 加 n 天（手動解析，避免被當成 UTC）
const addDays = (str, n) => {
  const [y, m, d] = str.split('-').map(Number)
  return fmt(new Date(y, m - 1, d + n))
}

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
  // 退房最早為入住的下一天（至少一晚，不可與入住同日或更早）
  const minOut = checkIn ? addDays(checkIn, 1) : todayStr()

  return (
    <div className={`datepick ${className}`}>
      <div className="datepick__row">
        <Field label="入住">
          <DateField
            value={checkIn}
            min={todayStr()}
            onChange={(v) => {
              // 沒有退房日、或退房日不晚於新入住日時，預設補上入住日的下一天
              const patch = { checkIn: v }
              if (!checkOut || diffNights(v, checkOut) <= 0) patch.checkOut = addDays(v, 1)
              onChange(patch)
            }}
          />
        </Field>

        <Field label="退房">
          <DateField
            value={checkOut}
            min={minOut}
            onChange={(v) => onChange({ checkOut: v })}
          />
        </Field>

        <Field label="入住人數">
          <Select
            value={guests}
            onChange={(e) => onChange({ guests: Number(e.target.value) })}
          >
            {Array.from({ length: maxGuests }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                {n} 人
              </option>
            ))}
          </Select>
        </Field>
      </div>

      <p className="datepick__nights">
        {nights > 0 ? `共 ${nights} 晚` : '請選擇入住與退房日期'}
      </p>
    </div>
  )
}
