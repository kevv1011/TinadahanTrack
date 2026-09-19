import { Clock, TrendingUp } from 'lucide-react';

export default function RecentTransactions({ transactions = [] }) {
  if (!transactions || transactions.length === 0) {
    return (
      <section className="recent-transactions">
        <h3 className="recent-transactions__title">Recent Sales</h3>
        <p className="empty-text">No recent transactions to display.</p>
      </section>
    );
  }

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.round(diffMs / 60000);
    const diffHrs = Math.round(diffMins / 60);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return date.toLocaleDateString();
  };

  return (
    <section className="recent-transactions">
      <header className="recent-transactions__header">
        <h3 className="recent-transactions__title">
          <TrendingUp size={18} />
          Recent Sales
        </h3>
      </header>
      <ul className="recent-transactions__list">
        {transactions.map(tx => (
          <li key={tx.id} className="tx-item">
            <div className="tx-item__details">
              <span className="tx-item__name">{tx.item_name}</span>
              <span className="tx-item__qty">Qty: {tx.qty}</span>
            </div>
            <div className="tx-item__meta">
              <span className="tx-item__price mono-num">₱{Number(tx.total_price).toFixed(2)}</span>
              <span className="tx-item__time">
                <Clock size={12} /> {formatTime(tx.created_at)}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
