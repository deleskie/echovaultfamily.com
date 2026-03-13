export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || "G-0LTRJ9BM3C";
export const GA_LINKER_DOMAINS = (
  process.env.NEXT_PUBLIC_GA_LINKER_DOMAINS ||
  "www.echovaultfamily.com,app.echovaultfamily.com"
)
  .split(",")
  .map((value) => value.trim())
  .filter(Boolean);

export function config(path) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: path,
    linker: {
      domains: GA_LINKER_DOMAINS
    }
  });
}

export function pageview(url) {
  config(url);
}

export function event(action, params = {}) {
  if (!GA_MEASUREMENT_ID || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", action, params);
}
