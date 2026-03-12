import { createRoot } from "react-dom/client";
import App from "./App";
import { ensureGtm } from "./lib/gtm";
import { redirectLegacyHashIfNeeded } from "./lib/legacyHashRedirect";
import "./index.css";

function trackPageView() {
  const hashPath = window.location.hash.replace(/^#/, "") || "/";
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: "virtual_page_view",
    page_title: document.title,
    page_path: hashPath,
    page_location: `${window.location.origin}${window.location.pathname}#${hashPath === "/" ? "/" : hashPath}`,
  });
}

ensureGtm();
redirectLegacyHashIfNeeded();
window.addEventListener("hashchange", redirectLegacyHashIfNeeded);
window.addEventListener("hashchange", trackPageView);

createRoot(document.getElementById("root")!).render(<App />);
trackPageView();
