export function QuoteBlock({ settings }) {
  return (
    <section className="quote-block section-wrap">

      <div className="quote-block__paperclip quote-block__paperclip--green" />
      <div className="quote-block__paperclip quote-block__paperclip--orange" />
      <blockquote>
        <p>«{settings.sections.quote}»</p>
        <footer>
          <strong>{settings.sections.quoteAuthor}</strong>
          <span>{settings.sections.quoteRole}</span>
        </footer>
      </blockquote>
      <div className="quote-block__portrait">
        <img src="/uploads/quote-rushan.jpg" alt="" />
      </div>
    </section>
  );
}
