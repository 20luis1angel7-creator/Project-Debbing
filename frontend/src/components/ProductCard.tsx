import type { Product } from "../types";

type ProductCardProps = {
  product: Product;
  onAdd: (product: Product) => void;
};

export default function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div>
        <h3>{product.name}</h3>
        <p>{product.category}</p>
      </div>
      <strong>${product.price}</strong>
      <span>Stock: {product.stock}</span>
      <button onClick={() => onAdd(product)}>Agregar</button>
    </article>
  );
}
