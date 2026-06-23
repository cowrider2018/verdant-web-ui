/** 品牌葉片標誌 */
export default function Brand({ size = 26 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M27 5C13 5 6 12 6 24c0 1 0 2 .3 3 8-9 13-11 18-13-4 4-9 6-15 11 11 1 21-6 21-18 0-1 0-2-.3-2H27z"
        fill="currentColor"
      />
      <path
        d="M6.3 27c5-7 11-10 18-13"
        stroke="var(--cream-100)"
        strokeWidth="1.1"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
    </svg>
  )
}
