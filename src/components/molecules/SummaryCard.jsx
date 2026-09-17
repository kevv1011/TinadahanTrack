// Molecule — stat card shown at the top of the Dashboard
// Props: label (string), value (string | number), accent (boolean)
export default function SummaryCard({ label, value, accent = false }) {
  return (
    <div className={`summary-card ${accent ? 'summary-card--accent' : ''}`}>
      <p className="summary-card__value">{value}</p>
      <p className="summary-card__label">{label}</p>
    </div>
  );
}
