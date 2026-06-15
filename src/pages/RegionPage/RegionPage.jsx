import { useEffect, useState } from "react";
import { api, formatDate } from "../../lib/api.js";
import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle.jsx";
import { JoinForm } from "../../components/JoinForm/JoinForm.jsx";
import { SocialIcon } from "../../lib/icons.jsx";

export function RegionPage({ site, regionId }) {
  const [region, setRegion] = useState(null);
  const [error, setError] = useState("");

  async function loadRegion() {
    try {
      setRegion(await api(`/api/regions/${regionId}`));
      setError("");
    } catch (err) {
      setError(err.message || "Не удалось загрузить отделение");
    }
  }

  useEffect(() => {
    loadRegion();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [regionId]);

  if (error) {
    return (
      <>
        <Header settings={site.settings} />
        <main className="system-state">
          <h1>Отделение не найдено</h1>
          <p>{error}</p>
          <a className="button button--orange" href="/">На главную</a>
        </main>
      </>
    );
  }

  if (!region) {
    return (
      <>
        <Header settings={site.settings} />
        <main className="system-state">
          <div className="loader" />
          <p>Загружаем отделение...</p>
        </main>
      </>
    );
  }

  return (
    <>
      <Header settings={site.settings} />
      <main>
        {region.banner && (
          <div className="region-banner">
            <img src={region.banner} alt={region.name} />
          </div>
        )}

        <section className="section-wrap region-intro">
          <SectionTitle tone="orange">{region.name}</SectionTitle>
          {region.socials && Object.keys(region.socials).length > 0 && (
            <div className="region-socials">
              {Object.entries(region.socials).map(([platform, href]) => {
                if (!href) return null;
                return (
                  <a key={platform} href={href} target="_blank" rel="noreferrer" aria-label={platform}>
                    <SocialIcon platform={platform} iconUrl={site.settings.header.socialIcons?.[platform]} size={24} />
                  </a>
                );
              })}
            </div>
          )}
        </section>

        {region.news && region.news.length > 0 && (
          <section className="section-wrap region-news-section">
            <h2 className="region-section-title">Новости отделения</h2>
            <div className="region-news-grid">
              {region.news.map((item) => (
                <article key={item.id} className="region-news-card">
                  {item.image && <img src={item.image} alt={item.title} />}
                  <div className="region-news-card__body">
                    <time>{formatDate(item.date)}</time>
                    <h3>{item.title}</h3>
                    <p>{item.excerpt}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {region.team && region.team.length > 0 && (
          <section className="section-wrap region-team-section">
            <h2 className="region-section-title">Состав отделения</h2>
            <div className="region-team-grid">
              {region.team.map((member) => (
                <article key={member.id} className="region-team-card">
                  {member.photo && <img src={member.photo} alt={member.name} />}
                  <h3>{member.name}</h3>
                  <span className="region-team-card__role">{member.role}</span>
                  {member.bio && <p>{member.bio}</p>}
                </article>
              ))}
            </div>
          </section>
        )}

        <JoinForm settings={site.settings} regions={site.regions} defaultRegionId={regionId} />
      </main>
      <Footer settings={site.settings} />
    </>
  );
}
