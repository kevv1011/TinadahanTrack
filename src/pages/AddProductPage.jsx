// Page — Add Product route "/add-item"
// Props: onAddItem (fn)
// Shows a 3-second success Toast before redirecting to /inventory.
import Header from '../components/organisms/Header';
import ProductForm from '../components/organisms/ProductForm';
import Toast from '../components/atoms/Toast';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AddProductPage({ onAddItem, theme, toggleTheme }) {
  const [formError, setFormError]   = useState('');
  const [showToast, setShowToast]   = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (fields) => {
    const { name, category, price, current_stock, min_threshold } = fields;

    // Validate required fields
    if (!name || !category || !price || current_stock === '' || min_threshold === '') {
      setFormError('Please fill in all required fields.');
      return;
    }

    setFormError('');

    // Save the item
    await onAddItem(fields);

    // Show toast, then redirect after 3 s
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
      navigate('/inventory');
    }, 3000);
  };

  return (
    <div className="page">
      <Header title="Add New Item" showBackButton theme={theme} toggleTheme={toggleTheme} />
      <main className="add-product" aria-label="Add product form">
        <ProductForm onSubmit={handleSubmit} formError={formError} />
      </main>

      {/* ── Success toast ── */}
      <Toast message="Product saved successfully! ✓" visible={showToast} />
    </div>
  );
}
