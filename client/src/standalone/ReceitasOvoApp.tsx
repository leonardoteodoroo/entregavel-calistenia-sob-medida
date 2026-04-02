import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import BonusRecipeBookApp from "@/components/bonus/BonusRecipeBookApp";
import { receitasOvoBook } from "@/content/bonus/receitasOvoData";
import "@/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BonusRecipeBookApp book={receitasOvoBook} />
  </StrictMode>
);
