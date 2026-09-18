// Organism — top navigation bar, appears on every screen
// Props: title (string), showBackButton (boolean)
// NOTE: No burger menu — mobile routing is handled by BottomNav.
//       Desktop nav links are shown via CSS (hidden below 768px).
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sun, Moon } from 'lucide-react';

export default function Header({ title = 'TindahanTrack', showBackButton = false, theme, toggleTheme }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <header className="header">
      {showBackButton && (
        <button className="header__back" onClick={() => navigate(-1)} aria-label="Go back">
          <ArrowLeft size={20} />
        </button>
      )}
      <h1 className="header__title">
        <img className="header__logo" src={`${import.meta.env.BASE_URL}logo.png`} alt="TindahanTrack logo" />
        {title}
      </h1>

      {/* Desktop-only nav — hidden on mobile via CSS */}
      <nav className="header__nav" aria-label="Main navigation">
        <Link to="/"          className={pathname === '/'          ? 'active' : ''}>Dashboard</Link>
        <Link to="/inventory" className={pathname === '/inventory' ? 'active' : ''}>Inventory</Link>
        <Link to="/add-item"  className={pathname === '/add-item'  ? 'active' : ''}>+ Add Item</Link>
      </nav>

      {/* Theme toggle */}
      {toggleTheme && (
        <button
          className="header__theme-toggle"
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: 'inherit', marginLeft: 'auto', display: 'flex', alignItems: 'center' }}
        >
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      )}
    </header>
  );
}
