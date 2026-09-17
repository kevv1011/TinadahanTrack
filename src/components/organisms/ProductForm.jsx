// Organism — the "Add Product" form
// Props: onSubmit (fn), formError (string)
// "Category" is now a <select> dropdown instead of a free-text input.
import FormField from '../molecules/FormField';
import Button from '../atoms/Button';
import { useState } from 'react';

const CATEGORIES = ['Snacks', 'Canned Goods', 'Beverages', 'Noodles', 'Dairy', 'Personal Care', 'Household', 'Other'];

export default function ProductForm({ onSubmit, formError }) {
  const [fields, setFields] = useState({
    name: '',
    category: '',
    price: '',
    current_stock: '',
    min_threshold: '',
  });

  const handleChange = (e) => {
    setFields(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(fields);
  };

  return (
    <form className="product-form" onSubmit={handleSubmit} noValidate>
      {formError && <p className="product-form__error" role="alert">{formError}</p>}

      <FormField
        label="Product Name"
        id="name"
        value={fields.name}
        onChange={handleChange}
        placeholder="e.g. Piattos Cheese"
      />

      {/* ── Category dropdown ── */}
      <div className="form-field">
        <label htmlFor="category" className="form-field__label">Category</label>
        <select
          id="category"
          className="input select"
          value={fields.category}
          onChange={handleChange}
        >
          <option value="" disabled>Select a category…</option>
          {CATEGORIES.map(cat => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <FormField
        label="Price (₱)"
        id="price"
        type="number"
        value={fields.price}
        onChange={handleChange}
        placeholder="0.00"
      />
      <FormField
        label="Current Stock"
        id="current_stock"
        type="number"
        value={fields.current_stock}
        onChange={handleChange}
        placeholder="0"
      />
      <FormField
        label="Min. Threshold"
        id="min_threshold"
        type="number"
        value={fields.min_threshold}
        onChange={handleChange}
        placeholder="5"
      />

      <Button type="submit" variant="primary">Save Product</Button>
    </form>
  );
}
