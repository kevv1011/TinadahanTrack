// Molecule — stat card shown at the top of the Dashboard
// Props: label (string), value (string | number), accent (boolean)
// Animates counting from 0 → value over ~500ms on mount.
import { useState, useEffect } from 'react';

export default function SummaryCard({ label, value, accent = false }) {
  const numericValue = Number(value);
  const isNumeric = !isNaN(numericValue) && isFinite(numericValue);
  const [display, setDisplay] = useState(isNumeric ? 0 : value);

  useEffect(() => {
    if (!isNumeric || numericValue === 0) {
      setDisplay(numericValue || value);
      return;
    }

    const duration = 500; // ms
    const steps = 30;
    const increment = numericValue / steps;
    const interval = duration / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current = Math.min(Math.round(increment * step), numericValue);
      setDisplay(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplay(numericValue);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [numericValue]);

  return (
    <div className={`summary-card ${accent ? 'summary-card--accent' : ''}`}>
      <p className="summary-card__value">{display}</p>
      <p className="summary-card__label">{label}</p>
    </div>
  );
}
