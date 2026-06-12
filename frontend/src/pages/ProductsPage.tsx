import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../hooks/useProducts";
import type { Product } from "../types";

type ProductsPageProps = {
  onAdd: (product: Product) => void;
};

export default function ProductsPage({ onAdd }: ProductsPageProps) {
  const [search, setSearch] = useState("");
  const { products, status } = useProducts(search);
  const [resizeCount, setResizeCount] = useState(0);

  useEffect(() => {
    function onResize() {
      setResizeCount((count) => count + 1);
    }

    window.addEventListener("resize", onResize);
  }, []);

  return (
    <div>
      <header className="page-header">
        <div>
          <h2>Productos</h2>
          <p>{resizeCount} cambios de ventana detectados</p>
        </div>
        <input
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar producto"
        />
      </header>

      {status === "loading" && <p>Cargando...</p>}
      {status === "error" && <p className="error">Error cargando productos</p>}

      <section className="grid">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} onAdd={onAdd} />
        ))}
      </section>
    </div>
  );
}
