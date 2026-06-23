/**
 * Textarea — 受控多行文字輸入，預設 3 列、可垂直拉伸。
 */
export default function Textarea({ rows = 3, className = '', ...rest }) {
  return <textarea rows={rows} className={`textarea ${className}`.trim()} {...rest} />
}
