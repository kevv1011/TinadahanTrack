// Organism — top navigation bar, appears on every screen
// Props: title (string), showBackButton (boolean)
// NOTE: No burger menu — mobile routing is handled by BottomNav.
//       Desktop nav links are shown via CSS (hidden below 768px).
import { Link, useNavigate, useLocation } from 'react-router-dom';

export default function Header({ title = 'TindahanTrack', showBackButton = false }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="header">
      {showBackButton && (
        <button className="header__back" onClick={() => navigate(-1)} aria-label="Go back">
          ←
        </button>
      )}
      <h1 className="header__title">{title}</h1>

      {/* Desktop-only nav — hidden on mobile via CSS */}
      <nav className="header__nav" aria-label="Main navigation">
        <Link to="/"          className={pathname === '/'          ? 'active' : ''}>Dashboard</Link>
        <Link to="/inventory" className={pathname === '/inventory' ? 'active' : ''}>Inventory</Link>
        <Link to="/add-item"  className={pathname === '/add-item'  ? 'active' : ''}>+ Add Item</Link>
      </nav>
    </header>
  );
}
