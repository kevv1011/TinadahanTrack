// Page — Dashboard route "/"
// Props: items (array), isLoading (boolean)
import Header from '../components/organisms/Header';
import BottomNav from '../components/organisms/BottomNav';
import SummaryCard from '../components/molecules/SummaryCard';
import StatsPanel from '../components/organisms/StatsPanel';
import AlertList from '../components/organisms/AlertList';
import RecentTransactions from '../components/organisms/RecentTransactions';
import ApiStatusNotice from '../components/atoms/ApiStatusNotice';
import SalesAnalytics from '../components/organisms/SalesAnalytics';
import { Link } from 'react-router-dom';

export default function DashboardPage({ items = [], transactions = [], isLoading, apiError, onRetry, theme, toggleTheme }) {
  const lowStockItems = items.filter(i => i.current_stock <= i.min_threshold);

  return (
    <div className="page">
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main className="dashboard" aria-label="Dashboard">
        <ApiStatusNotice message={apiError} onRetry={onRetry} />
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <section className="summary-cards">
              <SummaryCard label="Total Items Tracked" value={items.length} />
              <SummaryCard label="Low Stock Items" value={lowStockItems.length} accent />
              <SummaryCard
                label="Total Inventory Value"
                value={`₱${items.reduce((total, item) => total + Number(item.price) * Number(item.current_stock), 0).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
              />
            </section>
            <StatsPanel items={items} />
            <SalesAnalytics transactions={transactions} />
            <AlertList items={lowStockItems} />
            <RecentTransactions transactions={transactions} />
            <Link to="/inventory" className="btn btn--primary">View Full Inventory →</Link>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
