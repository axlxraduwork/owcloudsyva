const articles = [
  {
    title: "Applied AI Playbook 2026",
    category: "Applied AI",
    date: "2026-02-20",
    summary: "企業如何建立從驗證到量產的 AI 營運流程。",
  },
  {
    title: "Cloud Governance Essentials",
    category: "Cloud Governance",
    date: "2026-02-14",
    summary: "治理流程、成本可視化與稽核策略的落地手冊。",
  },
  {
    title: "Regional Data Strategy",
    category: "Data Strategy",
    date: "2026-02-08",
    summary: "跨區資料佈局設計，兼顧法規、延遲與成本效率。",
  },
];

export default function TrendsPage() {
  return (
    <section className="section surface">
      <h1>趨勢文章</h1>
      <div className="trend-list">
        {articles.map((article) => (
          <article className="trend-item" key={article.title}>
            <div className="trend-item-meta">
              <span>{article.category}</span>
              <span>{article.date}</span>
            </div>
            <h2>{article.title}</h2>
            <p>{article.summary}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
