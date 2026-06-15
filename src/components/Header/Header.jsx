import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { SocialIcon } from "../../lib/icons.jsx";

export function Header({ settings }) {
  const header = settings.header;
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <header className="site-header">
        <a className="site-header__logo" href="/" aria-label="Союз Солидарной Молодёжи">
          <img src={header.logoUrl} alt="Союз Солидарной Молодёжи" />
        </a>

        <a className="site-header__logo-short" href="/" aria-label="Союз Солидарной Молодёжи">
          <img src={header.logoShortUrl} alt="Союз Солидарной Молодёжи" />
        </a>

        <nav className="site-header__nav" aria-label="Основная навигация">
          {header.nav.map((item) => (
            <a key={`${item.href}-${item.label}`} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>

        <div className="site-header__right">
          <div className="site-header__socials">
            {Object.entries(header.socials || {}).map(([name, href]) => {
              if (!href) return null;
              return (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>
                  <SocialIcon platform={name} iconUrl={header.socialIcons?.[name]} size={18} />
                </a>
              );
            })}
          </div>
          <a className="button button--orange" href={header.ctaHref}>
            {header.ctaText}
          </a>
        </div>

        <button className="site-header__menu-btn" onClick={() => setMenuOpen(true)} aria-label="Открыть меню">
          <Menu size={28} />
        </button>
      </header>

      <div className={`site-header__overlay ${menuOpen ? "is-open" : ""}`}>
        <button className="site-header__overlay-close" onClick={() => setMenuOpen(false)} aria-label="Закрыть меню">
          <X size={28} />
        </button>
        <a className="site-header__overlay-logo" href="/" onClick={() => setMenuOpen(false)}>
          <img src={header.logoBigUrl} alt="Союз Солидарной Молодёжи" />
        </a>
        <nav className="site-header__overlay-nav">
          {header.nav.map((item) => (
            <a key={`${item.href}-${item.label}`} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="site-header__overlay-actions">
          <div className="site-header__overlay-socials">
            {Object.entries(header.socials || {}).map(([name, href]) => {
              if (!href) return null;
              return (
                <a key={name} href={href} target="_blank" rel="noreferrer" aria-label={name}>
                  <SocialIcon platform={name} iconUrl={header.socialIcons?.[name]} size={20} />
                </a>
              );
            })}
          </div>
          <a className="button button--orange" href={header.ctaHref} onClick={() => setMenuOpen(false)}>
            {header.ctaText}
          </a>
        </div>
      </div>
    </>
  );
}
