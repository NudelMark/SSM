import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { SectionTitle } from "../../components/SectionTitle/SectionTitle.jsx";
import { formatDate } from "../../lib/api.js";

export function NewsPage({ site }) {
  return (
    <>
      <Header settings={site.settings} />
      <main className="news-page section-wrap">
        <SectionTitle>Все новости</SectionTitle>
        <div className="news-page__grid">
          {site.news.map((item) => (
            <a className="news-card" href={`/news/${item.id}`} key={item.id}>
              <img src={item.image} alt="" />
              <time>{formatDate(item.date)}</time>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
            </a>
          ))}
        </div>
      </main>
      <Footer settings={site.settings} />
    </>
  );
}
