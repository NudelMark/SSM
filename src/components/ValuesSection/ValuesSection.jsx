import { Icon } from "../../lib/icons.jsx";
import { SectionTitle } from "../SectionTitle/SectionTitle.jsx";

export function ValuesSection({ title, values }) {
  return (
    <section className="values-section section-wrap" id="values">
      <SectionTitle>{title}</SectionTitle>
      <div className="values-board">
        {values.map((value, index) => (
          <article className={`value-tile value-tile--${value.color} value-tile--${index + 1}`} key={value.id}>
            <Icon name={value.icon} size={52} strokeWidth={1.2} />
            <h3>{value.title}</h3>
            <p>{value.description}</p>
          </article>
        ))}

      </div>
    </section>
  );
}
