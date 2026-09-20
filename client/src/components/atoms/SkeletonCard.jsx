// Atom — skeleton placeholder that mimics ProductCard shape during loading
// No props required — renders empty shimmer divs.
export default function SkeletonCard() {
  return (
    <article className="product-card skeleton-card" aria-hidden="true">
      <div className="skeleton-card__line skeleton-card__line--short" />
      <div className="skeleton-card__line skeleton-card__line--medium" />
      <div className="skeleton-card__line skeleton-card__line--short" />
      <div className="skeleton-card__badge" />
      <div className="skeleton-card__controls">
        <div className="skeleton-card__btn" />
        <div className="skeleton-card__btn" />
      </div>
    </article>
  );
}
