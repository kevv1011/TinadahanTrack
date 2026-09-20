import { CheckCircle2, X } from 'lucide-react';

export default function ReceiptModal({ receipt, onClose }) {
  if (!receipt) return null;

  return (
    <div className="receipt-modal__overlay" role="presentation">
      <section className="receipt-modal" role="dialog" aria-modal="true" aria-labelledby="receipt-title">
        <button className="receipt-modal__close" onClick={onClose} aria-label="Close receipt"><X size={20} /></button>
        <CheckCircle2 className="receipt-modal__icon" size={42} aria-hidden="true" />
        <p className="receipt-modal__eyebrow">Sale completed</p>
        <h2 id="receipt-title">Thank you!</h2>
        <p className="receipt-modal__time">{new Date(receipt.createdAt).toLocaleString()}</p>

        <ul className="receipt-modal__items">
          {receipt.items.map((item, index) => (
            <li key={`${item.name}-${index}`}>
              <span>{item.name} <small>× {item.qty}</small></span>
              <strong className="mono-num">₱{(item.price * item.qty).toFixed(2)}</strong>
            </li>
          ))}
        </ul>

        <dl className="receipt-modal__summary">
          <div><dt>Total</dt><dd className="mono-num">₱{receipt.total.toFixed(2)}</dd></div>
          <div><dt>Cash</dt><dd className="mono-num">₱{receipt.cashTendered.toFixed(2)}</dd></div>
          <div className="receipt-modal__change"><dt>Change</dt><dd className="mono-num">₱{receipt.change.toFixed(2)}</dd></div>
        </dl>
        <button className="btn btn--primary receipt-modal__done" onClick={onClose}>Done</button>
      </section>
    </div>
  );
}
