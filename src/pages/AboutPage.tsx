import { useEffect, useMemo, useState } from "react";

export default function AboutPage() {
  const [sparkleOpacity, setSparkleOpacity] = useState(0.3);
  const [parallaxOffset, setParallaxOffset] = useState({ x: 0, y: 0 });
  const stars = useMemo(
    () => [
      { left: "12%", top: "20%", delay: "0s", duration: "2.8s", size: "5px", depth: 0.35 },
      { left: "30%", top: "26%", delay: "0.9s", duration: "3.1s", size: "4px", depth: 0.55 },
      { left: "47%", top: "18%", delay: "0.4s", duration: "2.6s", size: "5px", depth: 0.45 },
      { left: "65%", top: "30%", delay: "1.2s", duration: "3.3s", size: "6px", depth: 0.7 },
      { left: "80%", top: "19%", delay: "0.7s", duration: "2.9s", size: "5px", depth: 0.6 },
      { left: "72%", top: "46%", delay: "1.5s", duration: "3.5s", size: "4px", depth: 0.4 },
    ],
    [],
  );

  useEffect(() => {
    const onScroll = () => {
      const hero = document.querySelector(".about-hero-image-wrap");
      if (!hero) return;
      const rect = hero.getBoundingClientRect();
      const viewH = window.innerHeight;
      const visible = Math.max(0, Math.min(rect.bottom, viewH) - Math.max(rect.top, 0));
      const ratio = Math.max(0, Math.min(1, visible / Math.max(1, Math.min(rect.height, viewH))));
      setSparkleOpacity(0.22 + ratio * 0.68);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section className="section surface about-section">
      <div
        className="about-hero-image-wrap about-hero-elevated"
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const nx = (event.clientX - rect.left) / rect.width - 0.5;
          const ny = (event.clientY - rect.top) / rect.height - 0.5;
          setParallaxOffset({ x: nx * 14, y: ny * 10 });
        }}
        onMouseLeave={() => setParallaxOffset({ x: 0, y: 0 })}
      >
        <img
          className="about-hero-image"
          src="https://firebasestorage.googleapis.com/v0/b/cloudsyva.firebasestorage.app/o/cloudsyva_company.png?alt=media&token=89e47e73-afc8-4e50-946b-77807a07b26b"
          alt="Cloudsyva 公司介紹主視覺"
        />
        <div className="about-sparkles" style={{ opacity: sparkleOpacity }} aria-hidden="true">
          {stars.map((star) => (
            <span
              key={`${star.left}-${star.top}`}
              className="about-star-shell"
              style={{
                left: star.left,
                top: star.top,
                transform: `translate(${parallaxOffset.x * star.depth}px, ${parallaxOffset.y * star.depth}px)`,
              }}
            >
              <span
                className="about-star"
                style={{
                  animationDelay: star.delay,
                  animationDuration: star.duration,
                  width: star.size,
                  height: star.size,
                }}
              />
            </span>
          ))}
        </div>
        <div className="about-hero-overlay">
          <p>Cloudsyva Inc.</p>
          <h2>AWS + AI Transformation Partner</h2>
        </div>
      </div>

      <div className="about-copy">
        <p className="eyebrow">About Cloudsyva</p>
        <h1>公司介紹</h1>
        <p className="about-lead">
          Cloudsyva 是一家專業的 AWS 代理商及技術顧問公司，致力於協助企業順利導入 AWS 雲端服務及人工智慧（AI）應用。
        </p>
        <div className="about-prose">
          <p>
            我們透過豐富的實務經驗與技術專長，為企業提供量身訂做的雲端解決方案，從策略規劃到實際部署，
            全程陪伴企業數位轉型。
          </p>
          <p>
            我們的顧問團隊專注於幫助客戶最大化 AWS 雲端架構的優勢，提供資源配置最佳化、
            營運成本降低與資訊安全強化的專業建議。
          </p>
          <p>
            此外，我們也深入瞭解企業需求，協助導入符合企業發展策略的 AI 解決方案，
            提升業務效率並強化市場競爭力。
          </p>
          <p className="about-keyline">
            選擇 Cloudsyva，意味著您將獲得一個可靠且高效的合作夥伴，全面推動企業雲端創新與 AI 應用，
            邁向永續成長的新里程。
          </p>
        </div>
        <p className="about-subtitle">
          我們的服務重點
        </p>
        <p>
          從授權折扣、技術顧問到 AI 導入，協助企業建立可落地、可治理、可擴展的雲端成長模型。
        </p>
      </div>

      <div className="about-highlights">
        <article>
          <h3>AWS 授權與成本優化</h3>
          <p>提供折扣申請、資源配置優化與成本治理建議，讓雲端投資回報更明確。</p>
        </article>
        <article>
          <h3>企業級技術顧問支援</h3>
          <p>從架構設計到上線維運，結合最佳實務與落地經驗，降低導入風險。</p>
        </article>
        <article>
          <h3>AI 應用導入策略</h3>
          <p>依據企業場景規劃可執行的 AI 藍圖，提升流程效率與市場競爭力。</p>
        </article>
      </div>
    </section>
  );
}
