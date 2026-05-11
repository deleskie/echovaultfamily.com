const DEFAULT_SITE_URL = "https://www.echovaultfamily.com";
const DEFAULT_CONTACT_EMAIL = "hello@echovaultfamily.com";

function normalizeSiteUrl(value) {
  if (!value) return DEFAULT_SITE_URL;
  return String(value).trim().replace(/\/+$/, "");
}

export const SITE_URL = normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL);
export const CONTACT_EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_CONTACT_EMAIL;
export const contactMailto = (subject, body) => {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ""}`;
};
