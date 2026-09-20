// Organism — responsive grid of ProductCard items
// Props: products (array), onUpdateStock (fn)
import ProductCard from '../molecules/ProductCard';

export default function ProductGrid({ products = [], onUpdateStock, onEditItem, onDeleteItem, onAddToCart }) {
  if (products.length === 0) {
    return <p className="product-grid__empty">No products found.</p>;
  }
  return (
    <section className="product-grid" aria-label="Product inventory">
      {products.map(product => (
        <ProductCard
          key={product.id}
          product={product}
          onUpdateStock={onUpdateStock}
          onEditItem={onEditItem}
          onDeleteItem={onDeleteItem}
          onAddToCart={onAddToCart}
        />
      ))}
    </section>
  );
}
