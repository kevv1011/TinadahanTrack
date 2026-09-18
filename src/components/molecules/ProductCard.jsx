// Molecule — inventory card for one product
// Props: product ({ id, name, category, price, current_stock, min_threshold }),
//        onUpdateStock (fn(id, delta)), onEditItem (fn(id, fields)), onDeleteItem (fn(id))
import { useState } from 'react';
import StockBadge from '../atoms/StockBadge';
import Button from '../atoms/Button';
import EditModal from './EditModal';

export default function ProductCard({ product, onUpdateStock, onEditItem, onDeleteItem }) {
  const { id, name, category, price, current_stock, min_threshold } = product;
  const [showEdit, setShowEdit] = useState(false);

  const handleSave = async (fields) => {
    await onEditItem(id, fields);
    setShowEdit(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Delete "${name}"?\n\nThis action cannot be undone.`)) {
      onDeleteItem(id);
    }
  };

  return (
    <>
      <article className="product-card">
        {/* ── Top row: category label + action icons ── */}
        <div className="product-card__header">
          <p className="product-card__category">{category}</p>
          <div className="product-card__actions">
            <button
              className="product-card__action-btn product-card__action-btn--edit"
              onClick={() => setShowEdit(true)}
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

      {showEdit && (
        <EditModal
          product={product}
          onSave={handleSave}
          onClose={() => setShowEdit(false)}
        />
      )}
    </>
  );
}
