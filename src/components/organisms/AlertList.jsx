// Organism — highlighted panel listing all low-stock items
// Props: items (array of product objects filtered to low-stock)
import AlertRow from '../molecules/AlertRow';

export default function AlertList({ items = [] }) {
  return (
    <section className="alert-list" aria-label="Low stock alerts">
      <h2 className="alert-list__heading">⚠ Low Stock Alerts</h2>
      {items.length === 0 ? (
        <p className="alert-list__empty">All items are well-stocked. 🎉</p>
      ) : (
        <ul className="alert-list__items">
          {items.map(item => (
            <AlertRow key={item.id} product={item} />
          ))}
        </ul>
      )}
    </section>
  );
}
