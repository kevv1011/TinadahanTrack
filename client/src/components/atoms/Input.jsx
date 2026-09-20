// Atom — single-line text input
// Props: id, type, value, onChange, placeholder
export default function Input({ id, type = 'text', value, onChange, placeholder }) {
  return (
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className="input"
    />
  );
}
