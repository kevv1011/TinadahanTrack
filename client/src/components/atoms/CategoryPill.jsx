// Atom — filter pill for a product category
// Props: label (string), isActive (boolean), onClick
export default function CategoryPill({ label, isActive = false, onClick }) {
  return (
    <button
      className={`category-pill ${isActive ? 'category-pill--active' : ''}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
