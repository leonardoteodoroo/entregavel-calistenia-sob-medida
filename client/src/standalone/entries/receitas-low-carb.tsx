import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ensureGtm } from "@/lib/gtm";
import "@/index.css";
import ReceitasLowCarbApp from "../ReceitasLowCarbApp";
import StandaloneLayout from "../StandaloneLayout";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Elemento #root não encontrado na página de receitas.");
}

ensureGtm();

createRoot(root).render(
  <StrictMode>
    <StandaloneLayout currentPath="/receitas-low-carb">
      <ReceitasLowCarbApp />
    </StandaloneLayout>
  </StrictMode>
);
