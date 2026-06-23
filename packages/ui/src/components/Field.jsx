/**
 * Field — 表單欄位包裝：上方小標籤 + 下方輸入內容。
 * 用 <label> 包裹，點標籤即聚焦內部控制項。full 讓欄位在 grid 中跨整列。
 */
export default function Field({
  label,
  children,
  full = false,
  className = '',
  ...rest
}) {
  return (
    <label className={`field ${full ? 'field--full' : ''} ${className}`.trim()} {...rest}>
      {label && <span className="field__label">{label}</span>}
      {children}
    </label>
  )
}
