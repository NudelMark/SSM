export function RegionsLine({ regions }) {
  if (!regions || regions.length === 0) return null;

  const items = [...regions, ...regions];

  return (
    <section className="regions-line" aria-label="Региональные отделения">
      <div className="regions-line__track">
        <div className="regions-line__content">
          {items.map((r, i) => (
            <a key={i} href={`/region/${r.id}`} className="regions-line__name">{r.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
