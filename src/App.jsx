// Root App component — owns global state (items, isLoading)
// Demo Mode: when VITE_USE_MOCK_API !== 'false', all data lives in localStorage.
// Live Mode: when VITE_USE_MOCK_API === 'false', data is fetched from the Express API.
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import AddProductPage from './pages/AddProductPage';
import seedItems from './data/seed';
import './styles.css';

// ── Config ──────────────────────────────────────────────────────
const IS_DEMO = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const LS_KEY = 'tindahan_items';

// ── localStorage helpers ────────────────────────────────────────
function loadFromStorage() {
  try {
    const raw = window.localStorage.getItem(LS_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* corrupted data — fall through to seed */ }
  return null;
}

function saveToStorage(items) {
  try {
    window.localStorage.setItem(LS_KEY, JSON.stringify(items));
  } catch { /* storage full — silently fail */ }
}

// ════════════════════════════════════════════════════════════════
export default function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // ── Theme State ───────────────────────────────────────────────
  const [theme, setTheme] = useState(() => {
    return window.localStorage.getItem('tindahan_theme') || 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem('tindahan_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  // ── Initial load ──────────────────────────────────────────────
  useEffect(() => {
    if (IS_DEMO) {
      // Demo Mode: localStorage → seed fallback
      const stored = loadFromStorage();
      if (stored) {
        setItems(stored);
      } else {
        setItems(seedItems);
        saveToStorage(seedItems);
      }
      setIsLoading(false);
    } else {
      // Live Mode: fetch from Express API
      fetch(`${API_BASE}/api/items`)
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => { setItems(data); setIsLoading(false); })
        .catch(err => {
          console.error('Failed to load items from API:', err.message);
          setIsLoading(false);
        });
    }
  }, []);

  // ── Stock update ([-] / [+] buttons) ──────────────────────────
  const handleUpdateStock = async (id, delta) => {
    setItems(prev => {
      const updated = prev.map(item =>
        item.id === id
          ? { ...item, current_stock: Math.max(0, Number(item.current_stock) + delta) }
          : item
      );
      if (IS_DEMO) saveToStorage(updated);
      return updated;
    });

    if (!IS_DEMO) {
      // Best-effort server sync — UI already updated optimistically above
      fetch(`${API_BASE}/api/items/${id}/stock`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta }),
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(updated => {
          // Reconcile UI with authoritative DB value
          setItems(prev => prev.map(item => item.id === id ? updated : item));
        })
        .catch(err => console.error('Stock sync failed:', err.message));
    }
  };

  // ── Add new product ───────────────────────────────────────────
  const handleAddItem = async (fields) => {
    if (IS_DEMO) {
      const newItem = {
        ...fields,
        id: Date.now(),
        price: Number(fields.price),
        current_stock: Number(fields.current_stock),
        min_threshold: Number(fields.min_threshold),
      };
      setItems(prev => {
        const updated = [...prev, newItem];
        saveToStorage(updated);
        return updated;
      });
    } else {
      // Live Mode: POST to API and use the DB-generated id
      try {
        const res = await fetch(`${API_BASE}/api/items`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...fields,
            price: Number(fields.price),
            current_stock: Number(fields.current_stock),
            min_threshold: Number(fields.min_threshold),
          }),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const newItem = await res.json();
        setItems(prev => [...prev, newItem]);
      } catch (err) {
        console.error('Failed to add item:', err.message);
      }
    }
  };

  // ── Edit existing product ─────────────────────────────────────
  const handleEditItem = async (id, fields) => {
    if (IS_DEMO) {
      setItems(prev => {
        const updated = prev.map(item => item.id === id ? { ...item, ...fields } : item);
        saveToStorage(updated);
        return updated;
      });
    } else {
      try {
        const res = await fetch(`${API_BASE}/api/items/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(fields),
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const updated = await res.json();
        setItems(prev => prev.map(item => item.id === id ? updated : item));
      } catch (err) {
        console.error('Failed to edit item:', err.message);
      }
    }
  };

  // ── Delete product ────────────────────────────────────────────
  const handleDeleteItem = async (id) => {
    if (IS_DEMO) {
      setItems(prev => {
        const updated = prev.filter(item => item.id !== id);
        saveToStorage(updated);
        return updated;
      });
    } else {
      try {
        const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        setItems(prev => prev.filter(item => item.id !== id));
      } catch (err) {
        console.error('Failed to delete item:', err.message);
      }
    }
  };

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/"          element={<DashboardPage  items={items} isLoading={isLoading} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/inventory" element={<InventoryPage  items={items} isLoading={isLoading} onUpdateStock={handleUpdateStock} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/add-item"  element={<AddProductPage onAddItem={handleAddItem} theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}
