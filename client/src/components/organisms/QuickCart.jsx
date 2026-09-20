import { X, ShoppingCart } from 'lucide-react';
import Button from '../atoms/Button';

export default function QuickCart({ cart, setCart, onBatchDeduct, isOpen, onClose }) {
  const handleQtyChange = (id, delta) => {
    setCart(prev => 
      prev.map(entry => {
        if (entry.item.id === id) {
          const newQty = Math.max(1, entry.qty + delta); // minimum 1
          return { ...entry, qty: newQty };
        }
        return entry;
      })
    );
  };

  const handleRemove = (id) => {
    setCart(prev => prev.filter(entry => entry.item.id !== id));
  };

  const handleDeduct = async () => {
    if (cart.length === 0) return;
    await onBatchDeduct(cart);
    onClose();
  };

  return (
    <>
      {/* Overlay to close sidebar when clicking outside */}
      {isOpen && <div className="quick-cart__overlay" onClick={onClose} aria-hidden="true" />}
      
      <aside className={`quick-cart ${isOpen ? 'quick-cart--open' : ''}`} aria-label="Quick Cart">
        <header className="quick-cart__header">
          <div className="quick-cart__title">
            <ShoppingCart size={20} />
            <h2>Batch Deduct Cart</h2>
          </div>
          <button className="quick-cart__close" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </header>

        <div className="quick-cart__content">
          {cart.length === 0 ? (
            <p className="empty-text">No items staged for deduction.</p>
          ) : (
            <ul className="quick-cart__list">
              {cart.map((entry) => (
                <li key={entry.item.id} className="quick-cart__item">
                  <div className="quick-cart__item-info">
                    <p className="quick-cart__item-name">{entry.item.name}</p>
                    <p className="quick-cart__item-stock mono-num">Stock: {entry.item.current_stock}</p>
                  </div>
                  
                  <div className="quick-cart__item-controls">
                    <button 
                      className="qty-btn" 
                      onClick={() => handleQtyChange(entry.item.id, -1)}
                      disabled={entry.qty <= 1}
                    >
                      −
                    </button>
                    <span className="qty-val mono-num">{entry.qty}</span>
                    <button 
                      className="qty-btn" 
                      onClick={() => handleQtyChange(entry.item.id, +1)}
                      disabled={entry.qty >= entry.item.current_stock} // Prevent deducting more than available
                    >
                      +
                    </button>
                  </div>

                  <button 
                    className="quick-cart__item-remove" 
                    onClick={() => handleRemove(entry.item.id)}
                    aria-label="Remove item"
                  >
                    <X size={16} />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        <footer className="quick-cart__footer">
          <Button 
            variant="primary" 
            onClick={handleDeduct} 
            disabled={cart.length === 0}
            style={{ width: '100%', padding: '12px' }}
          >
            Deduct Stock ({cart.reduce((sum, entry) => sum + entry.qty, 0)} items)
          </Button>
        </footer>
      </aside>
    </>
  );
}
