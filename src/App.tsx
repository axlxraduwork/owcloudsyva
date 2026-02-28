import { useEffect, useRef, useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { megaMenus, type MegaKey } from "./data/navigation";

export default function App() {
  const [openMega, setOpenMega] = useState<MegaKey | null>(null);
  const location = useLocation();
  const headerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    setOpenMega(null);
  }, [location.pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMega(null);
      }
    };
    const onPointerDown = (event: MouseEvent) => {
      if (!headerRef.current) return;
      if (!headerRef.current.contains(event.target as Node)) {
        setOpenMega(null);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("mousedown", onPointerDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("mousedown", onPointerDown);
    };
  }, []);

  const isHeroRoute = location.pathname === "/";
  const isHomeActive = location.pathname === "/" && openMega === null;
  const isAboutActive = location.pathname === "/about" && openMega === null;
  const isTrendsActive = location.pathname === "/trends" && openMega === null;

  return (
    <div className="site-shell">
      <header ref={headerRef} className={`overlay-header${isHeroRoute ? " overlay-header-home" : ""}`}>
        <div className="overlay-inner">
          <NavLink to="/" className="overlay-brand" aria-label="Cloudsyva Home" end>
            <span className="brand-bag" aria-hidden="true">
              C
            </span>
            <span className="brand-word">cloudsyva</span>
          </NavLink>

          <nav className="overlay-nav" aria-label="Main navigation">
            <NavLink to="/" className={`overlay-link${isHomeActive ? " is-active" : ""}`} end>
              首頁
            </NavLink>

            <button
              type="button"
              className={`overlay-link overlay-link-button${openMega === "about" ? " is-open" : ""}${isAboutActive ? " is-active" : ""}`}
              onClick={() => setOpenMega((current) => (current === "about" ? null : "about"))}
            >
              公司簡介
              <span className="chevron" aria-hidden="true">
                ▾
              </span>
            </button>

            <button
              type="button"
              className={`overlay-link overlay-link-button${openMega === "trends" ? " is-open" : ""}${isTrendsActive ? " is-active" : ""}`}
              onClick={() => setOpenMega((current) => (current === "trends" ? null : "trends"))}
            >
              趨勢文章
              <span className="chevron" aria-hidden="true">
                ▾
              </span>
            </button>

            <NavLink to="/contact" className={({ isActive }) => `overlay-link${isActive ? " is-active" : ""}`}>
              聯繫我們
            </NavLink>
          </nav>

          <div className="overlay-actions">
            <Link to="/contact" className="overlay-login">
              登入
            </Link>
            <Link to="/contact" className="overlay-cta">
              立即開始試用
            </Link>
          </div>
        </div>

        {openMega ? (
          <div className="mega-wrap">
            <div className="mega-panel" role="menu" aria-label={megaMenus[openMega].heading}>
              <div className="mega-grid">
                {megaMenus[openMega].sections.map((section) => (
                  <section className="mega-col" key={section.title}>
                    <h3>{section.title}</h3>
                    {section.links.map((item) => (
                      <Link key={item.label} to={item.to} className="mega-item" onClick={() => setOpenMega(null)}>
                        <strong>{item.label}</strong>
                        <span>{item.desc}</span>
                      </Link>
                    ))}
                  </section>
                ))}
              </div>
              <div className="mega-bottom">
                <Link to="/contact" onClick={() => setOpenMega(null)}>
                  立即預約顧問
                </Link>
                <Link to="/trends" onClick={() => setOpenMega(null)}>
                  檢視最新洞察
                </Link>
                <Link to="/about" onClick={() => setOpenMega(null)}>
                  探索 Cloudsyva 能力
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </header>

      <main className={`page-content${openMega ? " dimmed" : ""}`}>
        <Outlet />
      </main>

      <footer className="footer">
        <div className="footer-main">
          <div className="footer-brand-block">
            <span className="footer-mark" aria-hidden="true">
              C
            </span>
          </div>

          <div className="footer-content">
            <div className="footer-columns">
              <section className="footer-col">
                <h4>Cloudsyva</h4>
                <Link to="/about">關於</Link>
                <Link to="/about">職缺</Link>
                <Link to="/about">投資人</Link>
                <Link to="/about">新聞媒體</Link>
                <Link to="/about">合作夥伴</Link>
                <Link to="/about">隱私權政策</Link>
                <Link to="/about">使用者條款</Link>
              </section>

              <section className="footer-col">
                <h4>支援服務</h4>
                <Link to="/contact">商家支援服務</Link>
                <Link to="/contact">Cloudsyva 說明中心</Link>
                <Link to="/contact">聘僱合作夥伴</Link>
                <Link to="/contact">Cloudsyva 學習中心</Link>
              </section>

              <section className="footer-col">
                <h4>開發人員</h4>
                <Link to="/trends">Cloudsyva.dev</Link>
                <Link to="/trends">API 文件</Link>
                <Link to="/trends">開發者計畫</Link>
              </section>

              <section className="footer-col">
                <h4>產品</h4>
                <Link to="/">商店</Link>
                <Link to="/">Cloudsyva Plus</Link>
                <Link to="/">企業適用解決方案</Link>
              </section>
            </div>

            <div className="footer-subrow">
              <section className="footer-col footer-col-sub">
                <h4>解決方案</h4>
                <Link to="/">Saas服務搭建</Link>
                <Link to="/">網站建立工具</Link>
              </section>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-meta">
            <span>台灣 | 繁體中文</span>
            <Link to="/about">服務條款</Link>
            <Link to="/about">隱私權政策</Link>
            <Link to="/about">網站地圖</Link>
          </div>
          <div className="footer-social" aria-label="Social links">
            <a href="#" aria-label="Facebook">
              fb
            </a>
            <a href="#" aria-label="YouTube">
              yt
            </a>
            <a href="#" aria-label="Instagram">
              ig
            </a>
            <a href="#" aria-label="LinkedIn">
              in
            </a>
          </div>
        </div>
        <p className="footer-copyright">© {new Date().getFullYear()} Cloudsyva. All rights reserved.</p>
      </footer>
    </div>
  );
}
