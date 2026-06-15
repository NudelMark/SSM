import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { formatDate } from "../../lib/api.js";
import { SectionTitle } from "../SectionTitle/SectionTitle.jsx";

export function NewsSpotlight({ title, news }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const current = news[currentIndex] || news[0];
  const others = news.filter((_, i) => i !== currentIndex).slice(0, 3);

  if (!current) return null;

  const prev = () => setCurrentIndex((i) => (i - 1 + news.length) % news.length);
  const next = () => setCurrentIndex((i) => (i + 1) % news.length);

  return (
    <section className="news-spotlight section-wrap" id="news">
      <SectionTitle>{title}</SectionTitle>
      <div className="news-spotlight__grid">
        <div className="animate-fade" key={current.id}>
          <article className="news-spotlight__lead">
            <time>{formatDate(current.date)}</time>
            <h3>{current.title}</h3>
            <p>{current.excerpt}</p>
            <a className="button button--orange" href={`/news/${current.id}`}>
              Читать новость
            </a>
          </article>
        </div>

        <div className="news-spotlight__image-frame">
          <div className="animate-fade" key={current.id}>
            <img src={current.image} alt={current.title} />
          </div>
        </div>

        <div>
          <div className="news-spotlight__arrows">
            <button type="button" onClick={prev}>
              <ArrowLeft size={24} />
            </button>
            <button type="button" onClick={next}>
              <ArrowRight size={24} />
            </button>
          </div>
          <div className="animate-fade" key={current.id}>
            <aside className="news-spotlight__list">
              {others.map((item) => (
                <a className="news-spotlight__item" href={`/news/${item.id}`} key={item.id}>
                  <time>{formatDate(item.date)}</time>
                  <strong>{item.title}</strong>
                  <span>{item.excerpt}</span>
                </a>
              ))}
              <a className="news-spotlight__all" href="/news">
                Все новости <ArrowRight size={24} />
              </a>
            </aside>
          </div>
        </div>
      </div>
    </section>
  );
}
