import { Link } from 'react-router-dom'
import { LeafMark } from '@verdant/ui'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div>
            <div className="footer__brand" style={{ color: 'var(--cream-50)' }}>
              <LeafMark size={28} />
              森林旅宿
            </div>
            <p>
              隱身山林的慢宿提案。在樹梢、溪畔與星空下，把日常的喧囂留在山腳，只帶一身森林的呼吸入眠。
            </p>
          </div>

          <div>
            <h4>住宿</h4>
            <ul>
              <li><Link to="/rooms">全部房型</Link></li>
              <li><Link to="/rooms">樹屋與木屋</Link></li>
              <li><Link to="/rooms">家庭房</Link></li>
              <li><Link to="/rooms">獨棟 Villa</Link></li>
            </ul>
          </div>

          <div>
            <h4>旅宿</h4>
            <ul>
              <li><a href="#facilities">設施介紹</a></li>
              <li><a href="#location">交通位置</a></li>
              <li><a href="#dining">森林餐桌</a></li>
              <li><a href="#contact">聯絡我們</a></li>
            </ul>
          </div>

          <div>
            <h4>服務</h4>
            <ul>
              <li><a href="#policy">訂房須知</a></li>
              <li><a href="#cancel">取消政策</a></li>
              <li><a href="#faq">常見問題</a></li>
              <li><a href="#privacy">隱私權政策</a></li>
            </ul>
          </div>
        </div>

        <div className="footer__divider" />
        <div className="footer__base">
          <span>© {new Date().getFullYear()} 森林旅宿 Verdant Stay · 版型示範</span>
          <span>低飽和綠棕 · 森林風格 · 圖片皆為尺寸佔位符</span>
        </div>
      </div>
    </footer>
  )
}
