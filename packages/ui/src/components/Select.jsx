/**
 * Select — 受控下拉選單，附自訂箭頭（樣式見 primitives.css 的 .select）。
 * <option> 由呼叫端以 children 傳入。
 */
export default function Select({ children, className = '', ...rest }) {
  return (
    <select className={`select ${className}`.trim()} {...rest}>
      {children}
    </select>
  )
}
