// Molecule — user-friendly modal for changing the store owner password
// Props: isOpen (boolean), onClose (fn)
import { useState } from 'react';
import { Key, Eye, EyeOff, Check, AlertCircle, ShieldCheck } from 'lucide-react';
import { changeOwnerPassword, IS_DEMO } from '../../lib/api';

export default function ChangePasswordModal({ isOpen, onClose }) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setShowCurrent(false);
    setShowNew(false);
    setShowConfirm(false);
    setErrorMessage('');
    setIsSuccess(false);
    setIsSubmitting(false);
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!currentPassword) {
      setErrorMessage('Please enter your current password.');
      return;
    }
    if (!newPassword || newPassword.length < 4) {
      setErrorMessage('Your new password should be at least 4 characters long.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage('The two new passwords do not match. Please re-check.');
      return;
    }
    if (newPassword === currentPassword) {
      setErrorMessage('Your new password is the same as your current password. Please choose a different one.');
      return;
    }

    setIsSubmitting(true);
    try {
      await changeOwnerPassword(currentPassword, newPassword);
      setIsSuccess(true);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to update password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const passwordsMatch = newPassword.length >= 4 && confirmPassword.length > 0 && newPassword === confirmPassword;
  const passwordsMismatch = confirmPassword.length > 0 && newPassword !== confirmPassword;

  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label="Change Owner Password" onClick={handleClose}>
      <div className="modal change-password-modal" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal__header">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div className="change-password-icon-badge">
              <Key size={18} />
            </div>
            <h2 className="modal__title">Change Owner Password</h2>
          </div>
          <button className="modal__close" onClick={handleClose} aria-label="Close modal">×</button>
        </div>

        {isSuccess ? (
          /* Friendly Success View */
          <div className="change-password-success">
            <div className="change-password-success__icon">
              <ShieldCheck size={48} />
            </div>
            <h3 className="change-password-success__title">Password Updated!</h3>
            <p className="change-password-success__text">
              Your new password is now active. Please remember it next time you sign in to your store.
            </p>
            {IS_DEMO && (
              <p className="change-password-success__demo-note">
                (Saved in Demo Mode for testing)
              </p>
            )}
            <button className="btn btn--primary change-password-success__btn" onClick={handleClose}>
              Done / Naintindihan
            </button>
          </div>
        ) : (
          /* Password Form */
          <form className="modal__form" onSubmit={handleSubmit}>
            <p className="change-password-hint-box">
              💡 <strong>Tip for store owners:</strong> Choose a simple password you won't forget — like your favorite nickname or number (at least 4 characters).
            </p>

            {errorMessage && (
              <div className="change-password-alert change-password-alert--error" role="alert">
                <AlertCircle size={18} style={{ flexShrink: 0 }} />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Current Password Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="current-password">
                Current Password <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Dating password)</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  id="current-password"
                  className="form-input password-input"
                  type={showCurrent ? 'text' : 'password'}
                  placeholder="Enter your current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowCurrent(prev => !prev)}
                  title={showCurrent ? 'Hide password' : 'Show password'}
                  aria-label={showCurrent ? 'Hide password' : 'Show password'}
                >
                  {showCurrent ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* New Password Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="new-password">
                New Password <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Bagong password)</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  id="new-password"
                  className="form-input password-input"
                  type={showNew ? 'text' : 'password'}
                  placeholder="Create your new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  minLength={4}
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowNew(prev => !prev)}
                  title={showNew ? 'Hide password' : 'Show password'}
                  aria-label={showNew ? 'Hide password' : 'Show password'}
                >
                  {showNew ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              <span className="password-field-subtext">Must be at least 4 letters or numbers</span>
            </div>

            {/* Confirm New Password Field */}
            <div className="form-group">
              <label className="form-label" htmlFor="confirm-password">
                Confirm New Password <span style={{ color: 'var(--color-text-muted)', fontWeight: 'normal' }}>(Ulitin ang bagong password)</span>
              </label>
              <div className="password-input-wrapper">
                <input
                  id="confirm-password"
                  className="form-input password-input"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Type new password once more"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={isSubmitting}
                  autoComplete="new-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle-btn"
                  onClick={() => setShowConfirm(prev => !prev)}
                  title={showConfirm ? 'Hide password' : 'Show password'}
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              
              {/* Dynamic match helper */}
              {passwordsMatch && (
                <div className="password-match-indicator password-match-indicator--match">
                  <Check size={14} /> Passwords match!
                </div>
              )}
              {passwordsMismatch && (
                <div className="password-match-indicator password-match-indicator--mismatch">
                  Passwords do not match yet
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="modal__footer" style={{ margin: 'var(--space-2) -14px -14px -14px' }}>
              <button
                type="button"
                className="btn btn--secondary"
                onClick={handleClose}
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn--primary"
                disabled={isSubmitting || !currentPassword || !newPassword || newPassword.length < 4 || newPassword !== confirmPassword}
              >
                {isSubmitting ? 'Saving...' : 'Save New Password'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
