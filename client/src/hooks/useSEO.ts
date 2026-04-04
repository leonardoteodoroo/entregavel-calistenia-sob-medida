import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  preventIndex?: boolean;
}

export function useSEO({ title, description, preventIndex = false }: SEOProps) {
  useEffect(() => {
    // 1. Atualizar Título
    document.title = title;

    // 2. Atualizar ou Criar Meta Description
    if (description) {
      let metaDescription = document.querySelector('meta[name="description"]');
      if (metaDescription) {
        metaDescription.setAttribute("content", description);
      } else {
        metaDescription = document.createElement("meta");
        metaDescription.setAttribute("name", "description");
        metaDescription.setAttribute("content", description);
        document.head.appendChild(metaDescription);
      }
    }

    // 3. Atualizar Meta Robots (Para indexação ou ocultar páginas como o 404/Apoio se não quiserem indexação pesada)
    if (preventIndex) {
      let metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots) {
        metaRobots.setAttribute("content", "noindex, nofollow");
      } else {
        metaRobots = document.createElement("meta");
        metaRobots.setAttribute("name", "robots");
        metaRobots.setAttribute("content", "noindex, nofollow");
        document.head.appendChild(metaRobots);
      }
    }

    // O retorno (cleanup function) restaura defaults (opicional, geralmente ideal para SPAs)
    return () => {
      document.title = "Calistenia Feminina Sob Medida — Desafio de 28 Dias";

      const metaRobots = document.querySelector('meta[name="robots"]');
      if (metaRobots && preventIndex) {
        metaRobots.remove(); // Remove o noindex upon route out
      }
    };
  }, [title, description, preventIndex]);
}
