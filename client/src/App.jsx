// Root App component — owns global state (items, isLoading)
// Demo Mode: when VITE_USE_MOCK_API !== 'false', all data lives in localStorage.
// Live Mode: when VITE_USE_MOCK_API === 'false', data is fetched from the Express API.
import { useState, useEffect, useCallback } from 'react';
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
const NGROK_HEADERS = { 'ngrok-skip-browser-warning': '69420' };

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
  const [transactions, setTransactions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState('');
  
  // ── Quick Cart State ──────────────────────────────────────────
  const [cart, setCart] = useState([]);

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

  const loadLiveData = useCallback(async () => {
    setIsLoading(true);
    setApiError('');
    try {
      const [itemsResponse, transactionsResponse] = await Promise.all([
        fetch(`${API_BASE}/api/items`, { headers: NGROK_HEADERS }),
        fetch(`${API_BASE}/api/transactions/recent`, { headers: NGROK_HEADERS }),
      ]);
      if (!itemsResponse.ok) throw new Error(`Items request failed (${itemsResponse.status})`);

      const itemsData = await itemsResponse.json();
      const txData = transactionsResponse.ok ? await transactionsResponse.json() : [];
      setItems(itemsData);
      setTransactions(Array.isArray(txData) ? txData : []);
    } catch (err) {
      console.error('Failed to load data from API:', err.message);
      setApiError('Unable to reach the live API. Check the ngrok tunnel, then try again.');
    } finally {
      setIsLoading(false);
    }
  }, []);

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
      
      try {
        const storedTx = window.localStorage.getItem('tindahan_tx');
        if (storedTx) setTransactions(JSON.parse(storedTx));
      } catch (e) {}
      
      setIsLoading(false);
    } else {
      loadLiveData();
    }
  }, [loadLiveData]);

  // ── Stock update ([-] / [+] buttons) ──────────────────────────
  const handleUpdateStock = async (id, delta) => {
    let transactionToLog = null;
    
    setItems(prev => {
      const updated = prev.map(item => {
        if (item.id === id) {
          const newStock = Math.max(0, Number(item.current_stock) + delta);
          if (delta < 0) {
            transactionToLog = {
              id: Date.now(),
              item_id: item.id,
              item_name: item.name,
              qty: Math.abs(delta),
              total_price: Math.abs(delta) * Number(item.price),
              created_at: new Date().toISOString()
            };
          }
          return { ...item, current_stock: newStock };
        }
        return item;
      });
      if (IS_DEMO) saveToStorage(updated);
      return updated;
    });

    if (IS_DEMO && transactionToLog) {
      setTransactions(prev => {
        const newTx = [transactionToLog, ...prev].slice(0, 15);
        window.localStorage.setItem('tindahan_tx', JSON.stringify(newTx));
        return newTx;
      });
    }

    if (!IS_DEMO) {
      // Best-effort server sync — UI already updated optimistically above
      fetch(`${API_BASE}/api/items/${id}/stock`, {
        method: 'PATCH',
        headers: { ...NGROK_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta }),
      })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(updated => {
          // Reconcile UI with authoritative DB value
          setItems(prev => prev.map(item => item.id === id ? updated : item));
          if (delta < 0) {
            // Refetch transactions to stay in sync
            fetch(`${API_BASE}/api/transactions/recent`, { headers: NGROK_HEADERS })
              .then(r => r.json())
              .then(data => setTransactions(data))
              .catch(e => console.error(e));
          }
        })
        .catch(err => console.error('Stock sync failed:', err.message));
    }
  };

  // ── Batch Stock Deduction ───────────────────────────────────────
  const handleBatchDeduct = async (cartEntries, payment = {}) => {
    // Format payload
    const operations = cartEntries.map(entry => ({ id: entry.item.id, qty: entry.qty }));
    const previousItems = items;
    const total = Number(payment.total) || cartEntries.reduce((sum, entry) => sum + Number(entry.item.price) * entry.qty, 0);
    const receipt = {
      items: cartEntries.map(({ item, qty }) => ({ name: item.name, qty, price: Number(item.price) })),
      total,
      cashTendered: Number(payment.cashTendered) || total,
      change: Number(payment.change) || 0,
      createdAt: new Date().toISOString(),
    };

    // Optimistic UI update
    setItems(prev => {
      let updated = [...prev];
      cartEntries.forEach(entry => {
        updated = updated.map(item => 
          item.id === entry.item.id 
            ? { ...item, current_stock: Math.max(0, Number(item.current_stock) - entry.qty) }
            : item
        );
      });
      if (IS_DEMO) saveToStorage(updated);
      return updated;
    });

    if (IS_DEMO) {
      const newTransactions = cartEntries.map((entry, idx) => ({
        id: Date.now() + idx,
        item_id: entry.item.id,
        item_name: entry.item.name,
        qty: entry.qty,
        total_price: entry.qty * Number(entry.item.price),
        created_at: new Date().toISOString()
      }));
      setTransactions(prev => {
        const newTx = [...newTransactions.reverse(), ...prev].slice(0, 15);
        window.localStorage.setItem('tindahan_tx', JSON.stringify(newTx));
        return newTx;
      });
      setCart([]);
      return { ok: true, receipt };
    }

    if (!IS_DEMO) {
      try {
        const res = await fetch(`${API_BASE}/api/items/batch-deduct`, {
          method: 'PATCH',
          headers: { ...NGROK_HEADERS, 'Content-Type': 'application/json' },
          body: JSON.stringify(operations),
        });
        
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const updatedItems = await res.json();
        
        // Reconcile with authoritative DB values
        setItems(prev => {
          let reconciled = [...prev];
          updatedItems.forEach(updated => {
            reconciled = reconciled.map(item => item.id === updated.id ? updated : item);
          });
          return reconciled;
        });
        
        // Refetch transactions to stay in sync
        fetch(`${API_BASE}/api/transactions/recent`, { headers: NGROK_HEADERS })
          .then(r => r.json())
          .then(data => setTransactions(data))
          .catch(e => console.error(e));
        setCart([]);
        return { ok: true, receipt };
      } catch (err) {
        console.error('Batch stock sync failed:', err.message);
        setItems(previousItems);
        return { ok: false, error: 'Checkout could not be completed. Your cart has been kept so you can try again.' };
      }
    }

    return { ok: false, error: 'Checkout could not be completed.' };
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
          headers: { ...NGROK_HEADERS, 'Content-Type': 'application/json' },
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
          headers: { ...NGROK_HEADERS, 'Content-Type': 'application/json' },
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
        const res = await fetch(`${API_BASE}/api/items/${id}`, { method: 'DELETE', headers: NGROK_HEADERS });
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
        <Route path="/"          element={<DashboardPage  items={items} transactions={transactions} isLoading={isLoading} apiError={apiError} onRetry={loadLiveData} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/inventory" element={<InventoryPage  items={items} isLoading={isLoading} apiError={apiError} onRetry={loadLiveData} onUpdateStock={handleUpdateStock} onEditItem={handleEditItem} onDeleteItem={handleDeleteItem} cart={cart} setCart={setCart} onBatchDeduct={handleBatchDeduct} theme={theme} toggleTheme={toggleTheme} />} />
        <Route path="/add-item"  element={<AddProductPage onAddItem={handleAddItem} theme={theme} toggleTheme={toggleTheme} />} />
      </Routes>
    </BrowserRouter>
  );
}
