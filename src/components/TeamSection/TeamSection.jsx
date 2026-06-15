import { useMemo, useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SectionTitle } from "../SectionTitle/SectionTitle.jsx";

export function TeamSection({ title, team }) {
  const commissions = useMemo(() => [...new Set(team.map((person) => person.commission))], [team]);
  const [activeCommission, setActiveCommission] = useState(commissions[0] || "");
  const [personIndex, setPersonIndex] = useState(0);
  const people = team.filter((person) => person.commission === activeCommission);
  const selected = people[personIndex] || people[0] || team[0];

  useEffect(() => {
    setPersonIndex(0);
  }, [activeCommission]);

  if (!selected) return null;

  const prevPerson = () => setPersonIndex((i) => (i - 1 + people.length) % people.length);
  const nextPerson = () => setPersonIndex((i) => (i + 1) % people.length);

  return (
    <section className="team-section section-wrap" id="team">
      <SectionTitle>{title}</SectionTitle>
      <div className="team-section__grid">
        <aside className="team-section__filters" aria-label="Комиссии команды">
          {commissions.map((commission) => (
            <button
              key={commission}
              type="button"
              className={commission === activeCommission ? "is-active" : ""}
              onClick={() => setActiveCommission(commission)}
            >
              {commission}
            </button>
          ))}
        </aside>

          <div className="team-section__photo">
            <img className="animate-fade" key={selected.id} src={selected.photo} alt={selected.name} />
            {selected.display_mode !== "person" && (
              <div className="team-section__badge">
                <strong>{people.length}</strong>
                <span>участников комиссии</span>
              </div>
            )}
          {people.length > 1 && (
            <div className="team-section__arrows">
              <button type="button" onClick={prevPerson}>
                <ArrowLeft size={24} />
              </button>
              <button type="button" onClick={nextPerson}>
                <ArrowRight size={24} />
              </button>
            </div>
          )}
        </div>

        <div className="animate-fade" key={selected.id}>
          <article className="team-section__profile">
            <p className="team-section__label">{selected.commission}</p>
            <h3>{selected.name}</h3>
            <div className="team-section__tags">
              <span>ССМ</span>
              <span>команда</span>
              <span>{selected.role}</span>
            </div>
            <ul>
              {people.map((person) => (
                <li key={person.id}>
                  <strong>{person.name}</strong>
                  <span>{person.role}</span>
                </li>
              ))}
            </ul>
            <p>{selected.bio}</p>
          </article>
        </div>
      </div>
    </section>
  );
}
