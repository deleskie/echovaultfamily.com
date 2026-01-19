import fs from "node:fs/promises";
import path from "node:path";
import { DEFAULT_LOCALE, getLocaleConfig, localizePath, normalizeLocale } from "@config/i18n";

const CONTENT_ROOT = path.join(process.cwd(), "content", "blog");

export const BLOG_SLUGS = [
  "the-drummer-walking-home",
  "small-town-snow",
  "echoes-in-the-grid",
  "we-should-have-recorded-this",
  "designing-ai-for-grief-not-growth",
  "what-families-want-from-a-digital-twin"
];

let metaCache;
let indexCopyCache;

async function readJson(filePath) {
  const raw = await fs.readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function localeToContentLang(locale) {
  const normalized = normalizeLocale(locale);
  return getLocaleConfig(normalized).hrefLang || DEFAULT_LOCALE;
}

async function loadMeta() {
  if (metaCache) return metaCache;
  metaCache = await readJson(path.join(CONTENT_ROOT, "meta.json"));
  return metaCache;
}

async function loadIndexCopy() {
  if (indexCopyCache) return indexCopyCache;
  indexCopyCache = await readJson(path.join(CONTENT_ROOT, "index.json"));
  return indexCopyCache;
}

async function readHtmlWithFallback(slug, lang) {
  const preferred = path.join(CONTENT_ROOT, slug, `${lang}.html`);
  try {
    return await fs.readFile(preferred, "utf8");
  } catch (error) {
    if (lang === DEFAULT_LOCALE) throw error;
    const fallback = path.join(CONTENT_ROOT, slug, `${DEFAULT_LOCALE}.html`);
    return await fs.readFile(fallback, "utf8");
  }
}

function localizeBlogHtmlLinks(locale, html) {
  const normalized = normalizeLocale(locale);
  if (normalized === DEFAULT_LOCALE) return html;

  return String(html).replace(/href="([^"]+)"/g, (match, href) => {
    if (href === "/") return `href="${localizePath(normalized, "/")}"`;

    const localizeIfMatch = ["/pricing", "/how-it-works", "/trust", "/legal", "/blog"];
    for (const basePath of localizeIfMatch) {
      if (href === basePath || href.startsWith(`${basePath}/`)) {
        return `href="${localizePath(normalized, href)}"`;
      }
    }

    return match;
  });
}

export async function getBlogIndexCopy(locale) {
  const lang = localeToContentLang(locale);
  const indexCopy = await loadIndexCopy();
  return indexCopy[lang] || indexCopy[DEFAULT_LOCALE];
}

export async function getBlogIndexPosts(locale) {
  const lang = localeToContentLang(locale);
  const meta = await loadMeta();
  return BLOG_SLUGS.map((slug) => {
    const post = meta[slug];
    const localized = post?.[lang] || post?.[DEFAULT_LOCALE];
    if (!localized) {
      throw new Error(`Missing blog metadata for slug "${slug}"`);
    }

    return {
      slug,
      title: localized.title,
      description: localized.indexDescription || localized.description,
      meta: localized.indexMeta || localized.meta
    };
  });
}

export async function getBlogPost(locale, slug) {
  const lang = localeToContentLang(locale);
  const meta = await loadMeta();
  const post = meta?.[slug];
  if (!post) throw new Error(`Unknown blog slug "${slug}"`);

  const localized = post[lang] || post[DEFAULT_LOCALE];
  if (!localized) throw new Error(`Missing metadata for slug "${slug}" (lang "${lang}")`);

  const rawBodyHtml = await readHtmlWithFallback(slug, lang);
  const bodyHtml = localizeBlogHtmlLinks(locale, rawBodyHtml);
  return {
    slug,
    heroVariant: post.heroVariant,
    ...localized,
    bodyHtml,
    contentLang: lang
  };
}
