// Atom — coloured badge showing current stock level
// Green when stock is healthy, red when at or below threshold
// Props: count (number), threshold (number)
export default function StockBadge({ count, threshold }) {
  const isLow = count <= threshold;
  return (
    <span className={`stock-badge${isLow ? ' stock-badge--low' : ''}`}>
      {count} left
    </span>
  );
}
