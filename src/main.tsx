import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import App from "./App";
import "./index.css";
import AiSecurityArticlePage from "./pages/AiSecurityArticlePage";
import AboutPage from "./pages/AboutPage";
import AwsTaipeiLaunchArticlePage from "./pages/AwsTaipeiLaunchArticlePage";
import ContactPage from "./pages/ContactPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import SpeedArticlePage from "./pages/SpeedArticlePage";
import TrendsPage from "./pages/TrendsPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="trends" element={<TrendsPage />} />
          <Route path="trends/mobile-speed" element={<SpeedArticlePage />} />
          <Route path="trends/ai-security" element={<AiSecurityArticlePage />} />
          <Route path="trends/aws-taipei-launch" element={<AwsTaipeiLaunchArticlePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="home" element={<Navigate to="/" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
