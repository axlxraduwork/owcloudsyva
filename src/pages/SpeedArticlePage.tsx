import { Link } from "react-router-dom";

export default function SpeedArticlePage() {
  return (
    <article className="section surface trend-entry">
      <header className="trend-entry-head">
        <Link to="/trends" className="trend-entry-back">
          ← 返回趨勢文章
        </Link>
        <p className="eyebrow">網站效能</p>
        <h1>網站載入超過 3 秒，超過一半用戶直接離開！</h1>
        <p className="trend-entry-lead">
          根據 Google 與 SOASTA 在 2017 年發布的《The Need for Mobile Speed》研究，行動裝置網頁載入時間超過 3
          秒時，最多有 53% 的使用者會直接離開。
        </p>
      </header>

      <figure className="trend-entry-figure">
        <img
          src="https://firebasestorage.googleapis.com/v0/b/cloudsyva.firebasestorage.app/o/speed3.jpg?alt=media&token=bf913950-f663-4f48-a546-925bfc116f7e"
          alt="網站載入超過 3 秒導致使用者離站的研究示意圖"
          loading="lazy"
        />
        <figcaption>行動網頁載入超過 3 秒，使用者流失風險顯著上升。</figcaption>
      </figure>

      <section className="trend-entry-block">
        <h2>研究重點數據</h2>
        <ul className="checklist trend-entry-list">
          <li>行動網站平均載入時間約為 15 秒（研究當時數據）。</li>
          <li>載入時間從 1 秒增加到 3 秒，跳出率（Bounce Rate）增加 32%。</li>
          <li>載入時間從 1 秒增加到 5 秒，跳出率增加 90%。</li>
          <li>載入時間從 1 秒增加到 10 秒，跳出率增加 123%。</li>
        </ul>
      </section>

      <section className="trend-entry-block">
        <h2>為什麼網站速度這麼重要？</h2>
        <h3>1. 影響使用者體驗（UX）</h3>
        <p>使用者對等待時間容忍度很低，尤其在行動網路情境，延遲幾秒就可能直接離站。</p>
        <h3>2. 影響搜尋排名（SEO）</h3>
        <p>Google 已將頁面體驗與 Core Web Vitals 納入評估，載入速度會影響整體 SEO 表現。</p>
        <h3>3. 影響轉換率與營收</h3>
        <p>載入時間每增加 1 秒，都可能造成更高跳出率與更低轉換率，直接影響營收。</p>
      </section>

      <section className="trend-entry-block">
        <h2>結論</h2>
        <p>
          若網站載入超過 3 秒，很可能已流失大量潛在用戶。透過部署在 AWS 台北站點並搭配快取與效能優化策略，
          可有效降低延遲並提升整體訪問體驗，進一步強化網站競爭力。
        </p>
      </section>
    </article>
  );
}
