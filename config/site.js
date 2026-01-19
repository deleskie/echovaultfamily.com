const DEFAULT_SITE_URL = "http://www.echovault-ai.com";

function normalizeSiteUrl(value) {
  if (!value) return DEFAULT_SITE_URL;
  return String(value).trim().replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
