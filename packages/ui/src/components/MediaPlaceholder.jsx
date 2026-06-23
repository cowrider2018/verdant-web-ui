/**
 * MediaPlaceholder — 通用的圖片 / 影片佔位符元件。
 * 明確標示尺寸（width × height），以 aspect-ratio 鎖定版位避免 CLS，
 * 方便日後替換為真實 <img> / <video>。
 *
 * Props:
 *  - type:  'image' | 'video'        媒體類型
 *  - width, height: number           原始像素規格（同時用於顯示與長寬比）
 *  - label: string                   位置說明（如「主視覺」）
 *  - ratio: string                   可選，覆寫長寬比（如 '16 / 9'）
 *  - bare:  boolean                  去除圓角（鋪滿容器時用）
 *  - className: string
 */
const ImageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="3" y="4" width="18" height="16" rx="2" />
    <circle cx="8.5" cy="9.5" r="1.6" />
    <path d="M3 16l4.5-4 3.5 3L16 9l5 6" strokeLinejoin="round" />
  </svg>
)

const VideoIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
    <rect x="2.5" y="5" width="14" height="14" rx="2" />
    <path d="M16.5 9.5l5-2.5v10l-5-2.5" strokeLinejoin="round" />
  </svg>
)

export default function MediaPlaceholder({
  type = 'image',
  width = 800,
  height = 600,
  label,
  ratio,
  bare = false,
  className = '',
}) {
  const isVideo = type === 'video'
  const aspect = ratio || `${width} / ${height}`

  return (
    <div
      className={`ph ${bare ? 'ph--bare' : ''} ${className}`}
      style={{ aspectRatio: aspect }}
      role="img"
      aria-label={`${label ? label + '：' : ''}${isVideo ? '影片' : '圖片'}佔位符 ${width}×${height}`}
    >
      <div className="ph__grid" aria-hidden="true" />
      <div className="ph__shimmer" aria-hidden="true" />

      <span className="ph__corner">
        {isVideo ? 'Video' : 'Image'} · {width}×{height}
      </span>

      <div className="ph__body">
        <span className="ph__icon">{isVideo ? <VideoIcon /> : <ImageIcon />}</span>
        <span className="ph__dims">
          {width} × {height}
        </span>
        {label && <span className="ph__label">{label}</span>}
      </div>

      {isVideo && <span className="ph__play" aria-hidden="true" />}
    </div>
  )
}
