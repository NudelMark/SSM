import { Header } from "../../components/Header/Header.jsx";
import { Footer } from "../../components/Footer/Footer.jsx";
import { formatDate } from "../../lib/api.js";

export function NewsDetailPage({ site, newsId }) {
  const item = site.news.find((newsItem) => newsItem.id === newsId);

  return (
    <>
      <Header settings={site.settings} />
      <main className="news-detail section-wrap">
        {!item ? (
          <article>
            <h1>Новость не найдена</h1>
            <a className="button button--orange" href="/news">
              Вернуться к новостям
            </a>
          </article>
        ) : (
          <article>
            <time>{formatDate(item.date)}</time>
            <h1>{item.title}</h1>
            <p className="news-detail__excerpt">{item.excerpt}</p>
            <img src={item.image} alt="" />
            <p>{item.body}</p>
            <a className="button button--blue" href="/news">
              Все новости
            </a>
          </article>
        )}
      </main>
      <Footer settings={site.settings} />
    </>
  );
}
