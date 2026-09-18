// Molecule — modal overlay for editing a product's details
// Props: product (object), onSave (fn(updatedFields)), onClose (fn)
import { useState } from 'react';

export default function EditModal({ product, onSave, onClose }) {
  const [form, setForm] = useState({
    name:          product.name,
    category:      product.category,
    price:         product.price,
    current_stock: product.current_stock,
    min_threshold: product.min_threshold,
  });
  const [saving, setSaving] = useState(false);

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    await onSave({
      ...form,
      price:         Number(form.price),
      current_stock: Number(form.current_stock),
      min_threshold: Number(form.min_threshold),
    });
    setSaving(false);
  };

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={`Edit ${product.name}`}>
      <div className="modal">
        <div className="modal__header">
          <h2 className="modal__title">Edit Product</h2>
          <button className="modal__close" onClick={onClose} aria-label="Close edit modal">×</button>
        </div>

        <form className="modal__form" onSubmit={handleSubmit}>
          <label className="form-label" htmlFor="edit-name">Product Name</label>
          <input
            id="edit-name"
            className="form-input"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <label className="form-label" htmlFor="edit-category">Category</label>
          <input
            id="edit-category"
            className="form-input"
            name="category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <div className="modal__row">
            <div>
              <label className="form-label" htmlFor="edit-price">Price (₱)</label>
              <input
                id="edit-price"
                className="form-input"
                name="price"
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="edit-stock">Current Stock</label>
              <input
                id="edit-stock"
                className="form-input"
                name="current_stock"
                type="number"
                min="0"
                value={form.current_stock}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label className="form-label" htmlFor="edit-threshold">Min Threshold</label>
              <input
                id="edit-threshold"
                className="form-input"
                name="min_threshold"
                type="number"
                min="0"
                value={form.min_threshold}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="modal__footer">
            <button type="button" className="btn btn--secondary" onClick={onClose} disabled={saving}>
              Cancel
            </button>
            <button type="submit" className="btn btn--primary" disabled={saving}>
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
