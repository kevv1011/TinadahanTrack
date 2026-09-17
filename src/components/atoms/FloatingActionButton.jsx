// Atom — circular floating action button, fixed bottom-right
// Props: onClick
export default function FloatingActionButton({ onClick }) {
  return (
    <button
      className="fab"
      onClick={onClick}
      aria-label="Add new product"
    >
      +
    </button>
  );
}
