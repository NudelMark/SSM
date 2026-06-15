export function RegionsStrip({ regions }) {
  if (!regions || regions.length === 0) return null;

  const items = [...regions, ...regions];

  return (
    <section className="regions-strip" aria-label="Региональные отделения">
      <div className="regions-strip__track">
        <div className="regions-strip__content">
          {items.map((r, i) => (
            <a key={i} href={`/region/${r.id}`} className="regions-strip__name">{r.name}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
