import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { ensureGtm } from "@/lib/gtm";
import "@/index.css";
import MealPlanPage from "@/pages/MealPlanPage";
import StandaloneLayout from "../StandaloneLayout";

const root = document.getElementById("root");
if (!root) {
  throw new Error("Elemento #root nao encontrado na pagina de plano alimentar.");
}

ensureGtm();

createRoot(root).render(
  <StrictMode>
    <StandaloneLayout currentPath="/plano-alimentar">
      <MealPlanPage standalone />
    </StandaloneLayout>
  </StrictMode>
);
