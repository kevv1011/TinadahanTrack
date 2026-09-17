// Atom — smallest interactive element
// Props: variant ("primary" | "secondary"), onClick, children
export default function Button({ variant = 'primary', onClick, children, type = 'button' }) {
  return (
    <button className={`btn btn--${variant}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
}
