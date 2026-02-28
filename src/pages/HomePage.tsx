import type { CSSProperties } from "react";
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { capabilityCards, hotspots, regions, type RegionId } from "../data/home";

export default function HomePage() {
  const [activeRegion, setActiveRegion] = useState<RegionId>("apac");
  const [pointer, setPointer] = useState({ x: 72, y: 42 });

  const currentRegion = useMemo(
    () => regions.find((region) => region.id === activeRegion) ?? regions[0],
    [activeRegion],
  );

  const visibleHotspots = useMemo(
    () => hotspots.filter((spot) => spot.regions.includes(activeRegion)),
    [activeRegion],
  );

  return (
    <>
      <section
        className="hero-top"
        style={{ "--mx": `${pointer.x}%`, "--my": `${pointer.y}%` } as CSSProperties}
        onMouseMove={(event) => {
          const rect = event.currentTarget.getBoundingClientRect();
          const x = ((event.clientX - rect.left) / rect.width) * 100;
          const y = ((event.clientY - rect.top) / rect.height) * 100;
          setPointer({ x, y });
        }}
      >
        <div className="hero-world-layer" aria-hidden="true">
          <svg viewBox="0 0 1000 520" className="world-bg-svg">
            <defs>
              <pattern id="worldDots" width="8" height="8" patternUnits="userSpaceOnUse">
                <circle cx="2.2" cy="2.2" r="1.6" className="map-dot" />
              </pattern>
            </defs>
            <path
              d="M86 177c40-41 120-76 182-75 65 1 109 33 131 70 15 26 13 52-16 78-30 26-65 38-90 62-22 21-37 48-72 48-48 0-90-31-122-68-30-35-44-75-13-115z"
              className="continent-bg continent-fill"
              fill="url(#worldDots)"
            />
            <path
              d="M341 143c36-30 91-45 142-38 45 6 84 31 102 69 11 22 12 47-4 71-17 25-48 40-77 50-46 15-67 28-90 60-26 36-74 47-118 31-47-17-77-59-78-102-2-53 33-105 123-141z"
              className="continent-bg continent-fill"
              fill="url(#worldDots)"
            />
            <path
              d="M587 121c35-29 89-49 141-47 56 2 107 23 137 59 34 41 43 94 17 135-20 31-53 48-85 57-34 10-72 17-95 43-19 22-16 52-27 79-12 32-45 52-81 52-49 0-90-37-99-83-9-43 14-73 26-104 10-26 10-52 2-76-9-30 5-72 64-115z"
              className="continent-bg continent-fill"
              fill="url(#worldDots)"
            />
            <path
              d="M783 341c25-8 65-3 93 12 30 16 49 43 43 74-5 25-22 48-50 60-31 14-70 8-97-14-23-19-38-56-27-83 6-12 19-40 38-49z"
              className="continent-bg continent-fill"
              fill="url(#worldDots)"
            />
          </svg>

          {visibleHotspots.map((spot) => (
            <button
              key={spot.id}
              type="button"
              className="world-hotspot"
              style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
              aria-label={spot.name}
            >
              <span className="world-hotspot-dot" />
              <span className="world-hotspot-label">{spot.name}</span>
            </button>
          ))}
        </div>

        <div className="hero-overlay" />

        <div className="hero-top-inner">
          <div className="hero-copy-main">
            <p className="eyebrow-light">Cloudsyva Official Website</p>
            <h1>導入雲端，營運如火箭般成長</h1>
            <p>
              從 Webflow 遷移到自建架構，保留品牌語言、升級互動體驗，並讓網站成為 SaaS
              業務成長的第一個產品介面。
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn hero-primary">
                開始免費評估
              </Link>
              <Link to="/about" className="btn hero-ghost">
                檢視方案
              </Link>
            </div>
          </div>

          <div className="hero-glass-card">
            <div className="region-switch" role="tablist" aria-label="Region switch">
              {regions.map((region) => (
                <button
                  key={region.id}
                  type="button"
                  className={`region-btn${activeRegion === region.id ? " region-btn-active" : ""}`}
                  onClick={() => setActiveRegion(region.id)}
                >
                  {region.label}
                </button>
              ))}
            </div>
            <div className="region-info-box" role="status" aria-live="polite">
              <p>{currentRegion.subtitle}</p>
              <h3>{currentRegion.label} Network</h3>
              <span>{currentRegion.summary}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="section surface">
        <h2>核心服務</h2>
        <p>用 Shopify 式清晰商業資訊架構，搭配 Apple 風格視覺質感，建立專業 SaaS 官網體驗。</p>
        <div className="trend-grid">
          {capabilityCards.map((card) => (
            <article key={card.title} className="trend-card">
              <p className="tag">{card.tag}</p>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section split surface">
        <div>
          <p className="eyebrow">Migration Path</p>
          <h2>Webflow 到自建官網的重構流程</h2>
          <p>盤點原站內容、重新定義資訊架構、建立可迭代的前端系統，讓官網成為長期資產。</p>
        </div>
        <div className="timeline">
          <article>
            <h3>01. Content Mapping</h3>
            <p>完整搬遷既有文案與頁面邏輯，避免品牌訊息流失。</p>
          </article>
          <article>
            <h3>02. UI System Upgrade</h3>
            <p>導入 Overlay Navigation、Mega Menu 與玻璃感交互元件。</p>
          </article>
          <article>
            <h3>03. Scalable Frontend</h3>
            <p>以 React + TypeScript 打造可維運、可擴充的官網基礎。</p>
          </article>
        </div>
      </section>
    </>
  );
}
