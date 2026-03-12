import { siteConfig } from "@/content/siteConfig";

declare global {
  interface Window {
    __cfsmGtmInitialized?: boolean;
    dataLayer?: Array<Record<string, string | number>>;
  }
}

export function ensureGtm(): void {
  if (typeof window === "undefined") return;

  const gtmId = siteConfig.gtmId.trim();
  if (!gtmId || window.__cfsmGtmInitialized) return;

  window.__cfsmGtmInitialized = true;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });

  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${gtmId}`;
  document.head.appendChild(script);

  const noscript = document.createElement("noscript");
  const iframe = document.createElement("iframe");
  iframe.src = `https://www.googletagmanager.com/ns.html?id=${gtmId}`;
  iframe.height = "0";
  iframe.width = "0";
  iframe.style.display = "none";
  iframe.style.visibility = "hidden";

  noscript.appendChild(iframe);
  document.body.prepend(noscript);
}
