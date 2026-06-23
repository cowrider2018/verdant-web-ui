/**
 * SectionDivider — SVG 葉脈 / 木紋風格的區塊分隔線。
 */
export default function SectionDivider({ color = 'var(--sage-300)' }) {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1rem',
        color,
        opacity: 0.7,
        margin: '0 auto',
        maxWidth: '240px',
      }}
    >
      <svg width="100%" height="20" viewBox="0 0 240 20" fill="none">
        <line x1="0" y1="10" x2="96" y2="10" stroke="currentColor" strokeWidth="1" />
        <path
          d="M120 2c-6 4-10 6-10 8s4 4 10 8c6-4 10-6 10-8s-4-4-10-8z"
          fill="currentColor"
          opacity="0.6"
        />
        <path d="M120 4v12" stroke="var(--cream-100)" strokeWidth="0.8" />
        <line x1="144" y1="10" x2="240" y2="10" stroke="currentColor" strokeWidth="1" />
      </svg>
    </div>
  )
}
