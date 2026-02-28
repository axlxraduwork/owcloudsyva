import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <section className="section surface">
      <h1>404</h1>
      <p>找不到這個頁面。</p>
      <Link to="/" className="btn primary inline-btn">
        回到首頁
      </Link>
    </section>
  );
}
