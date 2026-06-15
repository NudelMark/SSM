import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle.jsx";

export function RegionsPage({ site }) {
  const { regions } = site;

  return (
    <>
      <Header settings={site.settings} />
      <main className="regions-page">
        <section className="section-wrap">
          <SectionTitle tone="orange">Региональные отделения</SectionTitle>
          <div className="regions-page__grid">
            {regions && regions.length > 0 ? (
              regions.map((r) => (
                <a key={r.id} href={`/region/${r.id}`} className="regions-page__card">
                  <span className="regions-page__card-name">{r.name}</span>
                  <span className="regions-page__card-arrow">→</span>
                </a>
              ))
            ) : (
              <p className="regions-page__empty">Пока нет зарегистрированных отделений.</p>
            )}
          </div>
        </section>
      </main>
      <Footer settings={site.settings} />
    </>
  );
}
