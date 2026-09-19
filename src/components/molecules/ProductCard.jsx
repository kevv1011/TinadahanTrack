// Molecule — inventory card for one product
// Props: product ({ id, name, category, price, current_stock, min_threshold, image_url }),
//        onUpdateStock (fn(id, delta)), onEditItem (fn(id, fields)), onDeleteItem (fn(id))
import { useState } from 'react';
import { Edit2, Trash2, ShoppingCart } from 'lucide-react';
import StockBadge from '../atoms/StockBadge';
import Button from '../atoms/Button';
import EditModal from './EditModal';

export default function ProductCard({ product, onUpdateStock, onEditItem, onDeleteItem, onAddToCart }) {
  const { id, name, category, price, current_stock, min_threshold, image_url } = product;
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
        {/* ── Product image ── */}
        <div className="product-card__image">
          {image_url
            ? <img src={image_url} alt={name} className="product-card__img" />
            : <div className="product-card__img-placeholder" aria-hidden="true">📦</div>
          }
        </div>

        {/* ── Top row: category label + action icons ── */}
        <div className="product-card__header">
          <p className="product-card__category">{category}</p>
          <div className="product-card__actions">
            {onAddToCart && (
              <button
                className="product-card__action-btn product-card__action-btn--cart"
                onClick={() => onAddToCart(product)}
                aria-label={`Add ${name} to Quick Cart`}
                title="Add to Quick Cart"
                disabled={current_stock === 0}
              >
                <ShoppingCart size={16} />
              </button>
            )}
            <button
              className="product-card__action-btn product-card__action-btn--edit"
              onClick={() => setShowEdit(true)}
              aria-label={`Edit ${name}`}
              title="Edit product"
            >
              <Edit2 size={16} />
            </button>
            <button
              className="product-card__action-btn product-card__action-btn--delete"
              onClick={handleDelete}
              aria-label={`Delete ${name}`}
              title="Delete product"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price mono-num">₱{Number(price).toFixed(2)}</p>
        <StockBadge count={current_stock} threshold={min_threshold} />

        {/* ── Stock [−] [+] controls ── */}
        <div className="product-card__controls">
          <Button variant="secondary" onClick={() => onUpdateStock(id, -1)}>−</Button>
          <Button variant="secondary" onClick={() => onUpdateStock(id, +1)}>+</Button>
        </div>

        {/* ── Stock Progress Bar ── */}
        <div className="stock-progress-bar-container">
          <div
            className="stock-progress-bar"
            style={{
              width: `${Math.min((current_stock / 100) * 100, 100)}%`,
              backgroundColor: current_stock <= min_threshold ? 'var(--color-accent)' : 'var(--color-success)',
            }}
          />
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
