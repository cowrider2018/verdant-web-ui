# @verdant/ui

森林風格的 React 元件庫 —— 動畫豐富、中低飽和度綠棕色系。提供可重用的動畫/佔位元件、
設計 tokens 與基底樣式。本 monorepo 內的示範網頁（`examples/*`）皆直接引用此套件原始碼。

## 引用方式（monorepo workspaces）

```jsx
import {
  MediaPlaceholder,
  MagneticButton,
  Parallax,
  Reveal,
  SectionDivider,
  SunFlare,
  LeafMark,
  formatPrice,
} from '@verdant/ui'

// 樣式（通常在 app 進入點各 import 一次）
import '@verdant/ui/styles/theme.css'      // 設計 tokens（色票/字體/圓角/陰影）
import '@verdant/ui/styles/primitives.css' // reset + 工具樣式（.btn、.ph、.container…）
```

## 元件

| 元件 | 說明 |
| --- | --- |
| `MediaPlaceholder` | 標尺寸的圖片／影片佔位符，以 `aspect-ratio` 鎖版位避免 CLS |
| `MagneticButton` | 對游標磁吸位移的 CTA 按鈕 |
| `Parallax` | 隨捲動產生垂直位移的視差容器 |
| `Reveal` | 進入視窗時淡入＋上移＋去模糊的進場包裝 |
| `SectionDivider` | 葉脈風格的 SVG 區塊分隔線 |
| `SunFlare` | 跟隨游標偏轉的太陽折射光暈（鏡頭眩光），放在 Hero 內 |
| `LeafMark` | 通用葉片標誌（純圖形，外層自行包品牌字樣） |

## 工具

- `formatPrice(n)` — 以新台幣格式化金額，例如 `1280 → "NT$1,280"`。

## 對等依賴

`react`、`react-dom`、`framer-motion`（由示範站提供，於 monorepo 根 hoist）。
元件本身不依賴 router，可在任何 React app 使用。
