export function SectionTitle({ children, tone = "orange", className = "" }) {
  return (
    <h2 className={`section-title section-title--${tone} ${className}`}>
      <span>{children}</span>
    </h2>
  );
}
