// Organism — top navigation bar, appears on every screen
// Props: title (string), showBackButton (boolean)
// NOTE: No burger menu — mobile routing is handled by BottomNav.
//       Desktop nav links are shown via CSS (hidden below 768px).
import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Key, LogOut } from 'lucide-react';
import { IS_DEMO, isForcedDemo } from '../../lib/api';
import ChangePasswordModal from '../molecules/ChangePasswordModal';

export default function Header({ title = 'TindahanTrack', showBackButton = false, theme, toggleTheme }) {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);

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
        {IS_DEMO && (
          <span 
            className="demo-badge"
            onClick={() => {
              if (isForcedDemo) {
                window.localStorage.removeItem('force_demo_mode');
                window.location.reload();
              }
            }}
            style={isForcedDemo ? { cursor: 'pointer' } : {}}
            title={isForcedDemo ? "Click to exit Demo Mode" : ""}
          >
            Demo
          </span>
        )}
      </h1>

      {/* Desktop-only nav — hidden on mobile via CSS */}
      <nav className="header__nav" aria-label="Main navigation">
        <Link to="/"          className={pathname === '/'          ? 'active' : ''}>Dashboard</Link>
        <Link to="/inventory" className={pathname === '/inventory' ? 'active' : ''}>Inventory</Link>
        <Link to="/add-item"  className={pathname === '/add-item'  ? 'active' : ''}>+ Add Item</Link>
      </nav>

      {/* Actions container for Password, Sign Out, and Theme */}
      <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
        {/* User-friendly Change Password button */}
        <button
          type="button"
          className="header__pwd-btn"
          onClick={() => setIsPasswordModalOpen(true)}
          title="Change Owner Password"
          aria-label="Change Owner Password"
        >
          <Key size={14} />
          <span className="header__pwd-text">Password</span>
        </button>

        {!IS_DEMO && (
          <button
            type="button"
            className="header__signout-btn"
            onClick={() => window.dispatchEvent(new Event('tindahan-auth-required'))}
            title="Sign out of TindahanTrack"
            aria-label="Sign out"
          >
            <LogOut size={15} />
            <span className="header__signout-text">Sign out</span>
          </button>
        )}

        {/* Theme toggle */}
        {toggleTheme && (
          <button
            className="header__theme-toggle"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#fff', display: 'flex', alignItems: 'center', padding: '4px', opacity: 0.9 }}
          >
            {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
          </button>
        )}
      </div>

      {/* Change Password Modal */}
      <ChangePasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </header>
  );
}
