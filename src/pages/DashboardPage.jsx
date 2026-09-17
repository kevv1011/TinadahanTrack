// Page — Dashboard route "/"
// Props: items (array), isLoading (boolean)
import Header from '../components/organisms/Header';
import BottomNav from '../components/organisms/BottomNav';
import SummaryCard from '../components/molecules/SummaryCard';
import AlertList from '../components/organisms/AlertList';
import { Link } from 'react-router-dom';

export default function DashboardPage({ items = [], isLoading }) {
  const lowStockItems = items.filter(i => i.current_stock <= i.min_threshold);

  return (
    <div className="page">
      <Header />
      <main className="dashboard" aria-label="Dashboard">
        {isLoading ? (
          <p className="loading">Loading...</p>
        ) : (
          <>
            <section className="summary-cards">
              <SummaryCard label="Total Items Tracked" value={items.length} />
              <SummaryCard label="Low Stock Items" value={lowStockItems.length} accent />
            </section>
            <AlertList items={lowStockItems} />
            <Link to="/inventory" className="btn btn--primary">View Full Inventory →</Link>
          </>
        )}
      </main>
      <BottomNav />
    </div>
  );
}
