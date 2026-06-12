import { useEffect, useState } from "react";
import { apiGet } from "../services/api";
import type { Product } from "../types";

export function useProducts(search: string) {
  const [products, setProducts] = useState<Product[]>([]);
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let url = "/products?page=1&limit=10";
    if (search) url = `/products/search?q=${encodeURIComponent(search)}`;

    setStatus("loading");
    apiGet<Product[]>(url)
      .then((data) => {
        console.log("datos: ", data)
        setProducts(data);
        setStatus("success");
      })
      .catch((err) => {
        console.error("error: ", err)
        setStatus("error")
      });
  }, [search]);

  return { products, status };
}
