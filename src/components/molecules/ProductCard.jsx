// Molecule — inventory card for one product
// Props: product ({ id, name, category, price, current_stock, min_threshold }),
//        onUpdateStock (fn(id, delta))
// Edit/Delete are placeholder alerts until the backend is wired up.
import StockBadge from '../atoms/StockBadge';
import Button from '../atoms/Button';

export default function ProductCard({ product, onUpdateStock }) {
  const { id, name, category, price, current_stock, min_threshold } = product;

  const handleEdit = () =>
    window.alert(`Edit: "${name}" (id: ${id})\n\nThis will open an edit form once the backend is connected.`);

  const handleDelete = () => {
    if (window.confirm(`Delete "${name}"?\n\nThis action cannot be undone.`)) {
      window.alert(`Delete confirmed for "${name}" (id: ${id})\n\nBackend DELETE /api/items/${id} will be called here.`);
    }
  };

  return (
    <article className="product-card">
      {/* ── Top row: category label + action icons ── */}
      <div className="product-card__header">
        <p className="product-card__category">{category}</p>
        <div className="product-card__actions">
          <button
            className="product-card__action-btn product-card__action-btn--edit"
            onClick={handleEdit}
            aria-label={`Edit ${name}`}
            title="Edit product"
          >
            ✏️
          </button>
          <button
            className="product-card__action-btn product-card__action-btn--delete"
            onClick={handleDelete}
            aria-label={`Delete ${name}`}
            title="Delete product"
          >
            🗑️
          </button>
        </div>
      </div>

      <h3 className="product-card__name">{name}</h3>
      <p className="product-card__price">₱{Number(price).toFixed(2)}</p>
      <StockBadge count={current_stock} threshold={min_threshold} />

      {/* ── Stock [−] [+] controls ── */}
      <div className="product-card__controls">
        <Button variant="secondary" onClick={() => onUpdateStock(id, -1)}>−</Button>
        <Button variant="secondary" onClick={() => onUpdateStock(id, +1)}>+</Button>
      </div>
    </article>
  );
}
