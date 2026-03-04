import { Link } from "react-router-dom";

const articles = [
  {
    title: "AWS 亞太（台北）區域已正式上線",
    category: "雲端基礎設施",
    date: "2026-03-04",
    summary: "AWS 亞太（台北）區域（ap-east-2）開放，帶來更低延遲、在地資料儲存與企業合規優勢。",
    to: "/trends/aws-taipei-launch",
  },
  {
    title: "速度至上",
    category: "網站效能",
    date: "2026-03-03",
    summary: "網站載入超過 3 秒，超過一半用戶直接離開！點擊查看完整分析與優化方向。",
    to: "/trends/mobile-speed",
  },
  {
    title: "AI 時代，駭客更厲害？企業要如何強化資安防護",
    category: "雲端資安",
    date: "2026-03-03",
    summary: "AI 改變攻防節奏，企業該如何透過 AWS 與治理流程建立更強韌的防禦體系。",
    to: "/trends/ai-security",
  },
  {
    title: "Applied AI Playbook 2026",
    category: "Applied AI",
    date: "2026-02-20",
    summary: "企業如何建立從驗證到量產的 AI 營運流程。",
    to: "/trends",
  },
  {
    title: "Cloud Governance Essentials",
    category: "Cloud Governance",
    date: "2026-02-14",
    summary: "治理流程、成本可視化與稽核策略的落地手冊。",
    to: "/trends",
  },
  {
    title: "Regional Data Strategy",
    category: "Data Strategy",
    date: "2026-02-08",
    summary: "跨區資料佈局設計，兼顧法規、延遲與成本效率。",
    to: "/trends",
  },
];

export default function TrendsPage() {
  return (
    <section className="section surface trends-hub">
      <div className="trends-hub-head">
        <p className="eyebrow">Cloudsyva Insights</p>
        <h1>趨勢文章</h1>
        <p>聚焦 AWS、AI、資安與雲端治理，提供可直接落地的實務觀點。</p>
      </div>

      <div className="trends-hub-list">
        {articles.map((article) => (
          <article className="trends-hub-item" key={article.title}>
            <div className="trends-hub-meta">
              <span>{article.category}</span>
              <span>{article.date}</span>
            </div>
            {article.to === "/trends" ? <span className="trends-hub-draft">即將發布</span> : null}
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
            {article.to === "/trends" ? (
              <span className="trends-hub-disabled">內容整理中</span>
            ) : (
              <Link to={article.to} className="trends-hub-link">
                閱讀文章 →
              </Link>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
