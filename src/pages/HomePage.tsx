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
            <h1 className="shopify-hero-title">
              <span>Cloudsyva是</span>  
              <span> AWS台灣代理商</span>
              <span>成本優化，</span>
              <span>雲端架構設計</span>
            </h1>
            <p>
              串接電商、社群與搜尋渠道，讓你的商品在多平台同時曝光，並以同一後台統一管理。
            </p>
            <div className="hero-actions">
              <Link to="/contact" className="btn hero-primary">
                開始免費試用
              </Link>
              <Link to="/about" className="btn hero-ghost">
                了解方案
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

      <section className="section surface shopify-layer-top">
        <p className="eyebrow">功能層一</p>
        <h2>觸及已準備購物的顧客</h2>
        <p>將商品同步到多個流量入口，並在單一平台集中管理，輕鬆完成各平台營運。</p>
        <div className="shopify-channel-grid">
          {capabilityCards.map((card) => (
            <article key={card.title} className="shopify-channel-card">
              <p className="tag">{card.tag}</p>
              <h3>{card.title}</h3>
              <p>{card.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section surface shopify-layer-bottom">
        <div className="shopify-layer-bottom-copy">
          <p className="eyebrow">功能層二</p>
          <h2>集中管理各大市集的銷售業務</h2>
          <p>
            透過 Marketplace Connect 類型的管理思維，即時同步跨平台庫存、價格與產品資訊，讓營運效率更高。
          </p>
          <Link to="/contact" className="btn hero-ghost">
            安排顧問諮詢
          </Link>
        </div>
        <div className="shopify-market-mock" aria-label="Marketplace management panel">
          <div className="market-left-tags">
            <span>amazon</span>
            <span>walmart</span>
            <span>ebay</span>
          </div>
          <div className="market-main-card">
            <div className="market-main-head">
              <strong>cloudsyva</strong>
              <button type="button">發佈</button>
            </div>
            <div className="market-form-row">
              <label htmlFor="market-product-name">產品名稱</label>
              <input id="market-product-name" type="text" value="紫色馬克杯" readOnly />
            </div>
            <div className="market-form-row">
              <label htmlFor="market-product-price">價格</label>
              <input id="market-product-price" type="text" value="NT$1,125" readOnly />
            </div>
          </div>
          <div className="market-right-tags">
            <span>Google</span>
            <span>YouTube</span>
            <span>TikTok</span>
          </div>
        </div>
      </section>

      <section className="section surface shopify-market-strip">
        <h3>探索不同市集</h3>
        <p>在 Cloudsyva 平台中一鍵啟動熱門市場渠道，快速完成跨平台上架。</p>
        <Link to="/trends" className="btn hero-ghost">
          探索更多市集
        </Link>
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
