import { Link } from 'react-router-dom'
import Brand from './Brand.jsx'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand" style={{ color: 'var(--cream-50)' }}>
              <Brand size={28} />
              Verdant
            </div>
            <p>
              森林系選物店。我們相信日常裡的一抹綠意與木質溫度，能讓生活慢下來、深呼吸。
            </p>
          </div>

          <div>
            <h4>選購</h4>
            <ul>
              <li><Link to="/products">全部商品</Link></li>
              <li><Link to="/products">咖啡與茶</Link></li>
              <li><Link to="/products">植栽綠意</Link></li>
              <li><Link to="/products">居家香氛</Link></li>
            </ul>
          </div>

          <div>
            <h4>關於</h4>
            <ul>
              <li><a href="#story">品牌故事</a></li>
              <li><a href="#sustain">永續承諾</a></li>
              <li><a href="#journal">森活誌</a></li>
              <li><a href="#contact">聯絡我們</a></li>
            </ul>
          </div>

          <div>
            <h4>客服</h4>
            <ul>
              <li><a href="#ship">運送方式</a></li>
              <li><a href="#return">退換貨</a></li>
              <li><a href="#faq">常見問題</a></li>
              <li><a href="#privacy">隱私權政策</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__divider" />
        <div className="footer__base">
          <span>© {new Date().getFullYear()} Verdant 森林選物 · 版型示範</span>
          <span>低飽和綠棕 · 森林風格 · 圖片影片皆為尺寸佔位符</span>
        </div>
      </div>
    </footer>
  )
}
