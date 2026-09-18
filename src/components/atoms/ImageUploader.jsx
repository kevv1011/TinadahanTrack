// Atom — reusable image upload control
// Props: imageUrl (string|null), onUpload (fn(url)), isDemo (bool)
// In Live mode: uploads file to POST /api/upload and returns URL.
// In Demo mode: reads file as base64 and stores inline (no server needed).
import { useRef, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';
const IS_DEMO  = import.meta.env.VITE_USE_MOCK_API !== 'false';

export default function ImageUploader({ imageUrl, onUpload }) {
  const inputRef  = useRef(null);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setError(null);
    setLoading(true);

    try {
      if (IS_DEMO) {
        // Demo mode: convert to base64 so it shows without a server
        const reader = new FileReader();
        reader.onload = () => { onUpload(reader.result); setLoading(false); };
        reader.onerror = () => { setError('Could not read file.'); setLoading(false); };
        reader.readAsDataURL(file);
      } else {
        // Live mode: POST to /api/upload
        const formData = new FormData();
        formData.append('image', file);
        const res = await fetch(`${API_BASE}/api/upload`, { method: 'POST', body: formData });
        if (!res.ok) throw new Error(`Upload failed (${res.status})`);
        const { url } = await res.json();
        onUpload(`${API_BASE}${url}`);
        setLoading(false);
      }
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
    // Reset input so same file can be re-selected
    e.target.value = '';
  };

  return (
    <div className="img-uploader">
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        className="img-uploader__input"
        onChange={handleFileChange}
        aria-label="Upload product image"
      />

      <button
        type="button"
        className={`img-uploader__area${imageUrl ? ' img-uploader__area--filled' : ''}`}
        onClick={() => inputRef.current?.click()}
        disabled={loading}
        aria-label={imageUrl ? 'Change product image' : 'Add product image'}
      >
        {loading ? (
          <span className="img-uploader__label">Uploading…</span>
        ) : imageUrl ? (
          <>
            <img src={imageUrl} alt="Product" className="img-uploader__preview" />
            <span className="img-uploader__overlay">Change Photo</span>
          </>
        ) : (
          <>
            <span className="img-uploader__icon" aria-hidden="true">📷</span>
            <span className="img-uploader__label">Add Photo</span>
          </>
        )}
      </button>

      {error && <p className="img-uploader__error">{error}</p>}
    </div>
  );
}
