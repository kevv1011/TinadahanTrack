// Page — Inventory route "/inventory"
// Props: items (array), isLoading (boolean), onUpdateStock (fn)
// FAB removed — "Add" is now a tab in BottomNav.
import Header from '../components/organisms/Header';
import BottomNav from '../components/organisms/BottomNav';
import ProductGrid from '../components/organisms/ProductGrid';
import CategoryPill from '../components/atoms/CategoryPill';
import SkeletonCard from '../components/atoms/SkeletonCard';
import { useState } from 'react';

export default function InventoryPage({ items = [], isLoading, onUpdateStock }) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Derive unique categories from live data
  const categories = ['All', ...new Set(items.map(i => i.category))];

  // Apply category filter first, then search filter
  const filtered = items
    .filter(i => activeCategory === 'All' || i.category === activeCategory)
    .filter(i => i.name.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="page">
      <Header />
      <main className="inventory" aria-label="Inventory">

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
            <span className="search-bar__icon" aria-hidden="true">🔍</span>
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
                ×
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
            <ProductGrid products={filtered} onUpdateStock={onUpdateStock} />
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
