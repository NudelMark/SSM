import { useEffect, useState } from "react";
import { api } from "./lib/api.js";
import { HomePage } from "./pages/HomePage/HomePage.jsx";
import { NewsPage } from "./pages/NewsPage/NewsPage.jsx";
import { NewsDetailPage } from "./pages/NewsDetailPage/NewsDetailPage.jsx";
import { AdminPage } from "./pages/AdminPage/AdminPage.jsx";
import { RegionPage } from "./pages/RegionPage/RegionPage.jsx";
import { RegionsPage } from "./pages/RegionsPage/RegionsPage.jsx";

export default function App() {
  const [site, setSite] = useState(null);
  const [error, setError] = useState("");
  const [path, setPath] = useState(window.location.pathname);

  async function loadSite() {
    try {
      setSite(await api("/api/site"));
      setError("");
    } catch (requestError) {
      setError(requestError.message || "Не удалось загрузить сайт");
    }
  }

  useEffect(() => {
    loadSite();
    const onPop = () => setPath(window.location.pathname);
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      const link = event.target.closest("a");
      if (!link) return;
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) return;
      if (link.target || link.hasAttribute("download")) return;

      event.preventDefault();
      window.history.pushState({}, "", `${url.pathname}${url.hash}`);
      setPath(url.pathname);
      if (url.hash) {
        requestAnimationFrame(() => document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" }));
      } else {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  if (error) {
    return (
      <main className="system-state">
        <h1>Сайт временно недоступен</h1>
        <p>{error}</p>
        <p>Проверьте, что API запущен командой `npm run dev:api`.</p>
      </main>
    );
  }

  if (!site) {
    return (
      <main className="system-state">
        <div className="loader" />
        <p>Загружаем Союз Солидарной Молодёжи...</p>
      </main>
    );
  }

  if (path.startsWith("/admin")) return <AdminPage site={site} onSiteChange={loadSite} />;

  if (path.startsWith("/news/")) {
    return <NewsDetailPage site={site} newsId={decodeURIComponent(path.replace("/news/", ""))} />;
  }

  if (path === "/news") return <NewsPage site={site} />;

  if (path === "/regions") return <RegionsPage site={site} />;

  if (path.startsWith("/region/")) {
    return <RegionPage site={site} regionId={decodeURIComponent(path.replace("/region/", ""))} />;
  }

  return <HomePage site={site} />;
}
