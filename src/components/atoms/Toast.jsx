// Atom — temporary notification bubble
// Props: message (string), visible (boolean)
// The parent controls visibility; the component handles its own CSS animation.
export default function Toast({ message, visible }) {
  return (
    <div
      className={`toast${visible ? ' toast--visible' : ''}`}
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <span className="toast__icon">✓</span>
      {message}
    </div>
  );
}
