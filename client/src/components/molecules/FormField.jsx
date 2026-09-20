// Molecule — labelled form field pairing a <label> with an <input>
// Props: label (string), id (string), type, value, onChange, placeholder
import Input from '../atoms/Input';

export default function FormField({ label, id, type = 'text', value, onChange, placeholder }) {
  return (
    <div className="form-field">
      <label htmlFor={id} className="form-field__label">{label}</label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
}
