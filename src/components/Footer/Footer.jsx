import { useState } from "react";
import { api } from "../../lib/api.js";
import { SocialIcon } from "../../lib/icons.jsx";

export function Footer({ settings }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("");
  const header = settings.header;

  async function subscribe(event) {
    event.preventDefault();
    try {
      await api("/api/subscribers", { method: "POST", body: { email } });
      setEmail("");
      setStatus("Подписка оформлена");
    } catch (error) {
      setStatus(error.message);
    }
  }

  return (
    <footer className="footer" id="contacts">
      <div className="footer__cta section-wrap">
        <h2>{settings.sections.footerCtaTitle}</h2>
        <div>
          <a className="button button--orange" href="#join">
            Вступить в Союз
          </a>
        </div>
      </div>

      <div className="footer__bottom section-wrap">
        <div className="footer__bottom-grid">
          <div className="footer__bottom-brand">
            <img src={header.logoUrl} alt="" />
            <span>© 2026 Союз Солидарной Молодёжи</span>
          </div>

          <form onSubmit={subscribe}>
            <h3>Будь в курсе наших новостей</h3>
            <div className="footer__subscribe-row">
              <input type="email" placeholder="Твой e-mail" value={email} onChange={(event) => setEmail(event.target.value)} required />
              <button className="button button--orange" type="submit">
                Подписаться
              </button>
            </div>
            {status && <p>{status}</p>}
          </form>

          <div>
            <h3>Мы в социальных сетях</h3>
            <div className="footer__socials">
              {Object.entries(header.socials || {}).map(([name, href]) => {
                if (!href) return null;
                return (
                  <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>
                    <SocialIcon platform={name} iconUrl={header.socialIcons?.[name]} size={26} />
                  </a>
                );
              })}
            </div>
          </div>

          <address>
            <h3>Напиши нам</h3>
            <a href={`mailto:${settings.sections.footerEmail}`}>{settings.sections.footerEmail}</a>
            <a href={`tel:${settings.sections.footerPhone.replace(/[^+\d]/g, "")}`}>{settings.sections.footerPhone}</a>
          </address>
        </div>

        <div className="footer__bottom-links">
          <span>сверстано by <a href="https://vk.com/marknudel" target="_blank" rel="noreferrer">Mark Nudel</a></span>
        </div>
      </div>
    </footer>
  );
}
