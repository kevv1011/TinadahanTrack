// Organism — bottom navigation bar pinned to the bottom on mobile
// Uses useLocation to automatically highlight the active route —
// no activeTab prop needed from the parent.
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, PlusSquare } from 'lucide-react';

const TABS = [
  { path: '/',          label: 'Home',      icon: <LayoutDashboard size={20} /> },
  { path: '/inventory', label: 'Inventory', icon: <Package size={20} /> },
  { path: '/add-item',  label: 'Add',       icon: <PlusSquare size={20} /> },
];

export default function BottomNav() {
  const { pathname } = useLocation();

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      {TABS.map(tab => {
        const isActive = pathname === tab.path;
        return (
          <Link
            key={tab.path}
            to={tab.path}
            className={`bottom-nav__item${isActive ? ' bottom-nav__item--active' : ''}`}
            aria-current={isActive ? 'page' : undefined}
          >
            <span className="nav-icon" aria-hidden="true">{tab.icon}</span>
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
