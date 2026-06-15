import { MapPin, Sparkles, Users } from "lucide-react";
import { SectionTitle } from "../SectionTitle/SectionTitle.jsx";

const statIcons = [MapPin, Users, Sparkles];

export function AboutSection({ settings }) {
  return (
    <section className="about-section section-wrap" id="about">
      <div className="about-section__text">
        <SectionTitle tone="blue">{settings.sections.aboutTitle}</SectionTitle>
        <p>{settings.sections.aboutText}</p>
        <div className="about-section__stats">
          {settings.stats.map((stat, index) => {
            const StatIcon = statIcons[index % statIcons.length];
            return (
              <div className="about-section__stat" key={stat.label}>
                <StatIcon size={20} strokeWidth={1.5} />
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            );
          })}
        </div>
        <a className="button button--blue" href="#join">
          {settings.sections.aboutButton}
        </a>
      </div>
      <div className="about-section__visual">
        <img src="/uploads/about-team.jpg" alt="Команда Союза Солидарной Молодёжи" />
        <span className="doodle doodle--green" />
        <span className="doodle doodle--orange" />
      </div>
    </section>
  );
}
