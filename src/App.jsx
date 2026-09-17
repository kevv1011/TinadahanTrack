// Root App component — owns global state (items, isLoading)
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashboardPage from './pages/DashboardPage';
import InventoryPage from './pages/InventoryPage';
import AddProductPage from './pages/AddProductPage';
import './styles.css';

const API_BASE = 'http://localhost:3001/api';

export default function App() {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch all items from the Express API on first load
  useEffect(() => {
    fetch(`${API_BASE}/items`)
      .then(res => res.json())
      .then(data => { setItems(data); setIsLoading(false); })
      .catch(() => setIsLoading(false));
  }, []);

  const handleUpdateStock = async (id, delta) => {
    // Optimistic UI update — then sync to server
    setItems(prev =>
      prev.map(item =>
        item.id === id
          ? { ...item, current_stock: Math.max(0, item.current_stock + delta) }
          : item
      )
    );
    // TODO: PATCH /api/items/:id/stock
  };

  const handleAddItem = async (fields) => {
    // TODO: POST /api/items — replace placeholder id with server-returned id
    const newItem = { ...fields, id: Date.now() };
    setItems(prev => [...prev, newItem]);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/"          element={<DashboardPage  items={items} isLoading={isLoading} />} />
        <Route path="/inventory" element={<InventoryPage  items={items} isLoading={isLoading} onUpdateStock={handleUpdateStock} />} />
        <Route path="/add-item"  element={<AddProductPage onAddItem={handleAddItem} />} />
      </Routes>
    </BrowserRouter>
  );
}
