import { createRoot } from "react-dom/client";
import { type InstitutionalSlug } from "@/content/siteConfig";
import { institutionalPages } from "@/content/institutionalPages";
import { ensureGtm } from "@/lib/gtm";
import "@/index.css";
import InstitutionalLayout from "./InstitutionalLayout";
import InstitutionalPageView from "./InstitutionalPageView";

export function bootstrapInstitutionalPage(slug: InstitutionalSlug): void {
  const root = document.getElementById("root");
  if (!root) {
    throw new Error("Elemento #root não encontrado na página institucional.");
  }

  ensureGtm();

  createRoot(root).render(
    <InstitutionalLayout currentSlug={slug}>
      <InstitutionalPageView page={institutionalPages[slug]} />
    </InstitutionalLayout>
  );
}
