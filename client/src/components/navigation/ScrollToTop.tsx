import { useEffect } from "react";
import { useLocation } from "wouter";

/**
 * Componente que força o reset do scroll para o topo (0,0)
 * sempre que a rota (URL) do aplicativo muda.
 * Resolve o problema de 'carregar no meio' em SPAs.
 */
export default function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    // Timeout zero para garantir que a renderização da nova página
    // começou antes de forçar o scroll.
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}
