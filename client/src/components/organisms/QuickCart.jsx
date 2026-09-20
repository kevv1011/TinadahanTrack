import { X, ShoppingCart } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '../atoms/Button';

export default function QuickCart({ cart, setCart, onBatchDeduct, isOpen, onClose }) {
  const [cashTendered, setCashTendered] = useState('');
  const [checkoutError, setCheckoutError] = useState('');
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const total = useMemo(
    () => cart.reduce((sum, entry) => sum + Number(entry.item.price) * entry.qty, 0),
    [cart]
  );
  const tendered = Number(cashTendered) || 0;
  const change = tendered - total;
  const hasSufficientCash = tendered >= total && total > 0;

  useEffect(() => {
    if (!isOpen) {
      setCashTendered('');
      setCheckoutError('');
    }
  }, [isOpen]);

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
    if (!hasSufficientCash) {
      setCheckoutError('Enter cash tendered that covers the sale total.');
      return;
    }

    setCheckoutError('');
    setIsCheckingOut(true);
    const result = await onBatchDeduct(cart);
    setIsCheckingOut(false);

    if (result?.ok) {
      onClose();
    } else {
      setCheckoutError(result?.error || 'Checkout could not be completed. Please try again.');
    }
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
          <div className="quick-cart__totals" aria-live="polite">
            <div><span>Sale total</span><strong className="mono-num">₱{total.toFixed(2)}</strong></div>
            <label className="quick-cart__cash-label" htmlFor="cash-tendered">
              Cash tendered
              <input
                id="cash-tendered"
                className="quick-cart__cash-input mono-num"
                type="number"
                min="0"
                step="0.01"
                inputMode="decimal"
                placeholder="0.00"
                value={cashTendered}
                onChange={(event) => setCashTendered(event.target.value)}
              />
            </label>
            <div><span>Change</span><strong className={`mono-num${change < 0 ? ' quick-cart__amount--due' : ''}`}>₱{Math.max(change, 0).toFixed(2)}</strong></div>
          </div>
          {checkoutError && <p className="quick-cart__error" role="alert">{checkoutError}</p>}
          <Button 
            variant="primary" 
            onClick={handleDeduct} 
            disabled={cart.length === 0 || isCheckingOut}
            style={{ width: '100%', padding: '12px' }}
          >
            {isCheckingOut ? 'Completing Sale…' : `Complete Sale (${cart.reduce((sum, entry) => sum + entry.qty, 0)} items)`}
          </Button>
        </footer>
      </aside>
    </>
  );
}
