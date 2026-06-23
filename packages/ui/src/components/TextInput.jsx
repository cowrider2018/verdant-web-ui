/**
 * TextInput — 受控文字輸入框。type 可為 text / email / tel / date 等。
 * value / onChange / required / min 等屬性由 ...rest 透傳。
 */
export default function TextInput({ type = 'text', className = '', ...rest }) {
  return <input type={type} className={`input ${className}`.trim()} {...rest} />
}
