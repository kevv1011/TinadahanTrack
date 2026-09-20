// Page — Inventory route "/inventory"
// Props: items (array), isLoading (boolean), onUpdateStock (fn)
// FAB removed — "Add" is now a tab in BottomNav.
import Header from '../components/organisms/Header';
import BottomNav from '../components/organisms/BottomNav';
import ProductGrid from '../components/organisms/ProductGrid';
import CategoryPill from '../components/atoms/CategoryPill';
import SkeletonCard from '../components/atoms/SkeletonCard';
import QuickCart from '../components/organisms/QuickCart';
import ApiStatusNotice from '../components/atoms/ApiStatusNotice';
import { useState } from 'react';
import { Search, X, ShoppingCart } from 'lucide-react';

export default function InventoryPage({ items = [], isLoading, apiError, onRetry, onUpdateStock, onEditItem, onDeleteItem, cart, setCart, onBatchDeduct, theme, toggleTheme }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [showCartHint, setShowCartHint] = useState(() => window.localStorage.getItem('tindahan_cart_hint_dismissed') !== 'true');

  const cartItemCount = cart ? cart.reduce((sum, entry) => sum + entry.qty, 0) : 0;
  const cartTotal = cart ? cart.reduce((sum, entry) => sum + Number(entry.item.price) * entry.qty, 0) : 0;

  // Derive unique categories from live data
  const categories = ['All', ...new Set(items.map(i => i.category))];

  // Apply category filter first, then search filter
  const filtered = items
    .filter(i => activeCategory === 'All' || i.category === activeCategory)
    .filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="page">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="inventory" aria-label="Inventory">
        <ApiStatusNotice message={apiError} onRetry={onRetry} />

        {showCartHint && (
          <aside className="inventory__cart-hint">
            <span>Tip: tap a product's cart icon to begin a sale.</span>
            <button onClick={() => {
              window.localStorage.setItem('tindahan_cart_hint_dismissed', 'true');
              setShowCartHint(false);
            }} aria-label="Dismiss cart tip">Got it</button>
          </aside>
        )}

        {/* ── Sticky toolbar: category pills + search ── */}
        <div className="inventory__toolbar">
          <div className="category-pills">
            {categories.map(cat => (
              <CategoryPill
                key={cat}
                label={cat}
                isActive={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              />
            ))}
          </div>

          <div className="search-bar">
            <span className="search-bar__icon" aria-hidden="true"><Search size={16} /></span>
            <input
              id="inventory-search"
              className="search-bar__input"
              type="text"
              placeholder="Search products…"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              aria-label="Search products"
            />
            {searchQuery && (
              <button
                className="search-bar__clear"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* ── Product grid or skeleton loaders ── */}
        {isLoading ? (
          <div className="product-grid" aria-busy="true" aria-label="Loading products">
            {Array.from({ length: 6 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <>
            {filtered.length === 0 && !isLoading && (
              <p className="product-grid__empty">
                {searchQuery
                  ? `No products match "${searchQuery}"`
                  : 'No products in this category.'}
              </p>
            )}
            <ProductGrid 
              products={filtered} 
              onUpdateStock={onUpdateStock} 
              onEditItem={onEditItem} 
              onDeleteItem={onDeleteItem} 
              onAddToCart={(product) => {
                setCart(prev => {
                  const existing = prev.find(entry => entry.item.id === product.id);
                  if (existing) {
                    if (existing.qty >= product.current_stock) return prev; // Don't add more than stock
                    return prev.map(entry => entry.item.id === product.id ? { ...entry, qty: entry.qty + 1 } : entry);
                  }
                  return [...prev, { item: product, qty: 1 }];
                });
                setIsCartOpen(true); // Open the cart when adding an item
              }}
            />
          </>
        )}
      </main>

      <button 
        className="fab fab--cart" 
        onClick={() => setIsCartOpen(true)}
        aria-label="Open Quick Cart"
      >
        <ShoppingCart size={24} />
        {cartItemCount > 0 && <span className="cart-badge mono-num">{cartItemCount}</span>}
        {cartItemCount > 0 && <span className="fab--cart__total mono-num">₱{cartTotal.toFixed(0)}</span>}
      </button>

      <QuickCart 
        cart={cart || []} 
        setCart={setCart} 
        onBatchDeduct={onBatchDeduct} 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
      />

      <BottomNav />
    </div>
  );
}
