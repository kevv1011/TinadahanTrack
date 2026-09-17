// Molecule — single row in the low-stock alert list
// Props: product ({ id, name, current_stock, min_threshold })
import StockBadge from '../atoms/StockBadge';

export default function AlertRow({ product }) {
  const { name, current_stock, min_threshold } = product;
  return (
    <li className="alert-row">
      <span className="alert-row__name">{name}</span>
      <StockBadge count={current_stock} threshold={min_threshold} />
    </li>
  );
}
