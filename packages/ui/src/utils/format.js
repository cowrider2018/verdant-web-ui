/** 以新台幣格式化金額，例如 1280 → "NT$1,280"。 */
export const formatPrice = (n) =>
  'NT$' + n.toLocaleString('zh-TW', { maximumFractionDigits: 0 })
