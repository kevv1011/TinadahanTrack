import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import SummaryCard from '../molecules/SummaryCard';

const IS_DEMO = import.meta.env.VITE_USE_MOCK_API !== 'false';
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const NGROK_HEADERS = { 'ngrok-skip-browser-warning': '69420' };

export default function StatsPanel({ items }) {
  const [stats, setStats] = useState({
    total_value: 0,
    healthy_count: 0,
    low_stock_count: 0,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (IS_DEMO) {
      // Compute from items prop
      let total = 0;
      let healthy = 0;
      let low = 0;
      
      items.forEach(item => {
        total += Number(item.price) * Number(item.current_stock);
        if (Number(item.current_stock) > Number(item.min_threshold)) {
          healthy++;
        } else {
          low++;
        }
      });
      
      setStats({
        total_value: total,
        healthy_count: healthy,
        low_stock_count: low
      });
      setIsLoading(false);
    } else {
      // Fetch from API
      fetch(`${API_BASE}/api/stats`, { headers: NGROK_HEADERS })
        .then(res => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then(data => {
          setStats({
            total_value: Number(data.total_value),
            healthy_count: Number(data.healthy_count),
            low_stock_count: Number(data.low_stock_count)
          });
          setIsLoading(false);
        })
        .catch(err => {
          console.error('Failed to load stats:', err.message);
          setIsLoading(false);
        });
    }
  }, [items]); // Re-run if items change (useful for demo mode)

  if (isLoading) {
    return <div className="stats-panel loading">Loading stats...</div>;
  }

  const chartData = [
    { name: 'Healthy', value: stats.healthy_count },
    { name: 'Low Stock', value: stats.low_stock_count }
  ];
  
  // Using variables matching our CSS theme colors
  const COLORS = ['#2ECC71', '#E74C3C']; // Green and Red-ish matching var(--color-success) / var(--color-accent)

  return (
    <section className="stats-panel">
      <div className="stats-panel__summary">
        <SummaryCard 
          label="Total Inventory Value" 
          value={`₱${stats.total_value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} 
        />
      </div>
      
      <div className="stats-panel__chart">
        <h3 className="stats-panel__chart-title">Stock Health</h3>
        {stats.healthy_count === 0 && stats.low_stock_count === 0 ? (
          <p className="empty-text">No items tracked</p>
        ) : (
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
                stroke="none"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => [value, 'Items']}
                contentStyle={{ backgroundColor: 'var(--color-surface)', border: 'none', borderRadius: '8px', color: 'var(--color-text-main)' }}
                itemStyle={{ color: 'var(--color-text-main)' }}
              />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        )}
      </div>
    </section>
  );
}
