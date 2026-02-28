import type { CSSProperties } from "react";
import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { capabilityCards, faqItems, hotspots, regions, type RegionId } from "../data/home";
import { useSpring } from "../hooks/useSpring";

function FaqItem({
  index,
  question,
  answers,
  isOpen,
  onToggle,
}: {
  index: number;
  question: string;
  answers: string[];
  isOpen: boolean;
  onToggle: () => void;
}) {
  const contentRef = useRef<HTMLDivElement | null>(null);
  const measuredHeight = contentRef.current?.scrollHeight ?? 0;
  const progress = useSpring(isOpen ? 1 : 0);
  const animatedHeight = measuredHeight * progress;
  const animatedOpacity = Math.min(1, Math.max(0, progress));
  const animatedOffset = (1 - progress) * -8;
  const iconRotation = progress * 180;

  return (
    <article className={`faq-item${isOpen ? " faq-open" : ""}`}>
      <button type="button" className="faq-trigger" onClick={onToggle} aria-expanded={isOpen}>
        <span className="faq-question">
          {index + 1}. {question}
        </span>
        <span className="faq-icon" style={{ transform: `rotate(${iconRotation}deg)` }} aria-hidden="true">
          ▾
        </span>
      </button>

      <div className="faq-answer-wrap" style={{ height: `${animatedHeight}px`, opacity: animatedOpacity }}>
        <div className="faq-answer-content" ref={contentRef} style={{ transform: `translateY(${animatedOffset}px)` }}>
          {answers.map((answer) => (
            <p key={answer}>{answer}</p>
          ))}
        </div>
      </div>
    </article>
  );
}

export default function HomePage() {
  const [activeRegion, setActiveRegion] = useState<RegionId>("apac");
  const [pointer, setPointer] = useState({ x: 72, y: 42 });
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

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
              <pattern id="worldDots" width="6" height="6" patternUnits="userSpaceOnUse">
                <circle cx="1.6" cy="1.6" r="1.25" className="map-dot" />
              </pattern>
            </defs>
            <path
              d="M73 139c18-16 47-27 80-30 29-4 57-1 82 8 24 9 40 24 51 45 14 28 7 55-18 76-20 16-44 25-60 44-11 14-17 34-28 50-11 17-30 26-46 25-28-1-52-18-67-41-17-25-27-58-24-89 3-34 14-64 30-88zM238 285c14-7 30 1 37 15 8 17 7 38 0 57-7 18-21 31-39 25-15-6-22-27-21-45 1-21 8-43 23-52z"
              className="continent-bg"
              fill="url(#worldDots)"
            />
            <path
              d="M336 116c28-19 64-31 102-34 36-3 73 2 102 17 20 10 35 25 44 43 7 15 8 34-1 49-7 11-20 17-32 23 18 7 34 20 44 38 10 19 12 43 2 62-10 20-32 30-50 39-20 10-43 17-57 34-11 13-14 32-23 48-10 20-29 34-50 40-24 6-50 2-70-13-22-16-34-42-37-69-3-24 2-47 10-68 9-23 24-43 40-62 9-10 17-21 20-33 3-12 0-25-9-34-10-9-24-12-38-11-23 2-45 13-61 30-8 8-14 19-25 23-9 4-20 1-27-5-15-13-13-38-3-55 12-20 32-34 53-48 9-6 18-11 26-16z"
              className="continent-bg"
              fill="url(#worldDots)"
            />
            <path
              d="M603 109c26-20 58-33 92-38 43-6 88-3 128 8 30 8 58 22 77 47 22 29 29 66 23 102-6 35-24 68-52 90-29 22-67 31-101 40-35 8-72 17-99 41-13 11-23 26-31 41-8 15-14 31-24 44-16 21-44 31-70 26-29-5-52-29-62-57-10-28-8-59-1-87 8-31 22-61 30-92 5-20 6-42-3-62-9-20-30-34-50-29-12 3-20 13-30 20-10 7-24 11-34 4-12-9-12-28-5-41 9-15 25-25 40-34 19-11 38-22 58-30 19-8 39-13 60-13 17 0 34 4 48 14 10 8 17 19 18 32 2 19-9 36-18 52-8 13-14 27-15 43-2 23 10 46 29 58 21 13 49 14 72 6 25-8 45-27 53-52 8-24 4-51-8-74-11-21-30-37-49-51-8-6-18-14-18-25-1-10 8-18 16-23z"
              className="continent-bg"
              fill="url(#worldDots)"
            />
            <path
              d="M771 360c22-11 50-16 75-13 25 3 49 14 63 35 15 22 16 53 2 76-13 22-38 35-63 39-26 4-53-1-74-17-20-15-33-40-31-65 2-24 12-48 28-65z"
              className="continent-bg"
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

      <section className="section surface">
        <p className="eyebrow">FAQ</p>
        <h2>常見問題</h2>
        <div className="faq-list">
          {faqItems.map((item, index) => (
            <FaqItem
              key={item.question}
              index={index}
              question={item.question}
              answers={item.answers}
              isOpen={openFaqIndex === index}
              onToggle={() => setOpenFaqIndex((prev) => (prev === index ? -1 : index))}
            />
          ))}
        </div>
      </section>
    </>
  );
}
