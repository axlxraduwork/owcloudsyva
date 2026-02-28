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
            <NavLink to="/" className={({ isActive }) => `overlay-link${isActive ? " is-active" : ""}`} end>
              首頁
            </NavLink>

            <button
              type="button"
              className={`overlay-link overlay-link-button${openMega === "about" ? " is-open" : ""}`}
              onClick={() => setOpenMega((current) => (current === "about" ? null : "about"))}
            >
              公司簡介
              <span className="chevron" aria-hidden="true">
                ▾
              </span>
            </button>

            <button
              type="button"
              className={`overlay-link overlay-link-button${openMega === "trends" ? " is-open" : ""}`}
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
              開始免費使用
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
        <p>© {new Date().getFullYear()} Cloudsyva. All rights reserved.</p>
      </footer>
    </div>
  );
}
