import LeafMark from './LeafMark.jsx'
import MediaPlaceholder from './MediaPlaceholder.jsx'

/**
 * Avatar — 帶葉環裝飾框的個人頭像。
 * 有 src 時顯示圖片，否則以 MediaPlaceholder 佔位（方便日後替換真實照片）。
 * 外圈 ring 以虛線環＋葉片點綴，呼應森林主題。
 * Props:
 *  - src: string     圖片來源（可省略）
 *  - alt: string     替代文字
 *  - size: number    直徑（px）
 *  - ring: boolean   顯示葉片裝飾外環
 *  - className: string
 */
export default function Avatar({
  src,
  alt = '',
  size = 160,
  ring = true,
  className = '',
  ...rest
}) {
  return (
    <div
      className={`avatar ${ring ? 'avatar--ring' : ''} ${className}`}
      style={{ width: size, height: size }}
      {...rest}
    >
      {ring && (
        <span className="avatar__leaf" aria-hidden="true">
          <LeafMark size={Math.round(size * 0.2)} />
        </span>
      )}
      <div className="avatar__img">
        {src ? (
          <img src={src} alt={alt} width={size} height={size} />
        ) : (
          <MediaPlaceholder
            type="image"
            width={size}
            height={size}
            ratio="1 / 1"
            label={alt || '頭像'}
          />
        )}
      </div>
    </div>
  )
}
