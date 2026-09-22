import { useEffect, useMemo, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import SummaryCard from '../molecules/SummaryCard';
import { IS_DEMO, apiFetch } from '../../lib/api';

function buildDemoAnalytics(transactions) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - index));
    return { date, label: date.toLocaleDateString(undefined, { weekday: 'short' }), revenue: 0 };
  });
  const movers = new Map();
  let todayRevenue = 0;
  let weekRevenue = 0;
  let weekItemsSold = 0;

  transactions.forEach((transaction) => {
    const date = new Date(transaction.created_at);
    const value = Number(transaction.total_price) || 0;
    const qty = Number(transaction.qty) || 0;
    const dayIndex = days.findIndex(({ date: day }) => day.toDateString() === date.toDateString());
    if (dayIndex >= 0) {
      days[dayIndex].revenue += value;
      weekRevenue += value;
      weekItemsSold += qty;
      const current = movers.get(transaction.item_id) || { item_id: transaction.item_id, item_name: transaction.item_name, quantity_sold: 0, revenue: 0 };
      current.quantity_sold += qty;
      current.revenue += value;
      movers.set(transaction.item_id, current);
    }
    if (date >= today) todayRevenue += value;
  });

  return { today_revenue: todayRevenue, week_revenue: weekRevenue, week_items_sold: weekItemsSold, revenue_trend: days, fast_movers: [...movers.values()].sort((a, b) => b.quantity_sold - a.quantity_sold || b.revenue - a.revenue).slice(0, 5) };
}

export default function SalesAnalytics({ transactions }) {
  const demoAnalytics = useMemo(() => buildDemoAnalytics(transactions), [transactions]);
  const [analytics, setAnalytics] = useState(demoAnalytics);
  const [isLoading, setIsLoading] = useState(!IS_DEMO);

  useEffect(() => {
    if (IS_DEMO) {
      setAnalytics(demoAnalytics);
      setIsLoading(false);
      return;
    }
    apiFetch('/api/analytics')
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((data) => setAnalytics({
        ...data,
        today_revenue: Number(data.today_revenue),
        week_revenue: Number(data.week_revenue),
        week_items_sold: Number(data.week_items_sold),
        revenue_trend: data.revenue_trend.map((day) => ({ ...day, revenue: Number(day.revenue) })),
        fast_movers: data.fast_movers.map((item) => ({ ...item, quantity_sold: Number(item.quantity_sold), revenue: Number(item.revenue) })),
      }))
      .catch((error) => console.error('Failed to load sales analytics:', error.message))
      .finally(() => setIsLoading(false));
  }, [demoAnalytics]);

  if (isLoading) return <section className="sales-analytics loading">Loading sales analytics...</section>;

  return (
    <section className="sales-analytics" aria-label="Sales analytics">
      <div className="sales-analytics__cards">
        <SummaryCard label="Today's Revenue" value={`₱${analytics.today_revenue.toFixed(2)}`} />
        <SummaryCard label="7-Day Revenue" value={`₱${analytics.week_revenue.toFixed(2)}`} />
        <SummaryCard label="Items Sold This Week" value={analytics.week_items_sold} />
      </div>
      <div className="sales-analytics__content">
        <div className="sales-analytics__chart">
          <h3>Revenue — Last 7 Days</h3>
          <ResponsiveContainer width="100%" height={190}>
            <BarChart data={analytics.revenue_trend} margin={{ top: 8, right: 4, left: -24, bottom: 0 }}>
              <XAxis dataKey="label" tickLine={false} axisLine={false} fontSize={12} />
              <YAxis tickLine={false} axisLine={false} fontSize={11} width={40} />
              <Tooltip formatter={(value) => [`₱${Number(value).toFixed(2)}`, 'Revenue']} />
              <Bar dataKey="revenue" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="sales-analytics__movers">
          <h3>Fast-Moving Products</h3>
          {analytics.fast_movers.length === 0 ? <p className="empty-text">Complete sales to see product movement.</p> : <ol>{analytics.fast_movers.map((item, index) => <li key={`${item.item_id}-${item.item_name}`}><span className="sales-analytics__rank">{index + 1}</span><span>{item.item_name}</span><strong className="mono-num">{item.quantity_sold} sold</strong></li>)}</ol>}
        </div>
      </div>
    </section>
  );
}
