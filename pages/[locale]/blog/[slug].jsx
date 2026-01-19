import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import { useI18n } from "@components/I18nProvider";
import {
  getAlternateLinks,
  localizePath,
  NON_DEFAULT_LOCALES,
  normalizeLocale
} from "@config/i18n";
import { SITE_URL } from "@config/site";
import { BLOG_SLUGS, getBlogIndexCopy, getBlogPost } from "../../../lib/blog";

export default function LocalizedBlogPostPage({ post, indexCopy, alternateLinks }) {
  const { locale } = useI18n();
  const localized = (path) => localizePath(locale, path);

  const canonicalPath = localized(`/blog/${post.slug}`);
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <>
      <Head>
        <title>{post.title}</title>
        <meta name="description" content={post.description} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.description} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <link rel="canonical" href={canonicalUrl} />
        {alternateLinks.map((alt) => (
          <link
            key={alt.hrefLang}
            rel="alternate"
            hrefLang={alt.hrefLang}
            href={`${alt.href}/${post.slug}`}
          />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/blog/${post.slug}`} />
      </Head>
      <Layout>
        <article className="blog-article">
          <header className={`blog-hero blog-hero--${post.heroVariant}`}>
            <div className="content blog-hero-inner">
              <p className="blog-hero-kicker">{post.kicker}</p>
              <h1 className="blog-hero-title">{post.title}</h1>
              <p className="blog-hero-tagline">{post.tagline}</p>
              <p className="blog-article-meta">{post.meta}</p>
            </div>
          </header>
          <div
            className="content blog-article-body"
            lang={post.contentLang}
            dangerouslySetInnerHTML={{ __html: post.bodyHtml }}
          />
          <div className="content">
            <p className="blog-back-link">
              <Link href={localized("/blog")}>{indexCopy.backToAll}</Link>
            </p>
          </div>
        </article>
      </Layout>
    </>
  );
}

export async function getStaticPaths() {
  return {
    paths: NON_DEFAULT_LOCALES.flatMap((locale) =>
      BLOG_SLUGS.map((slug) => ({
        params: { locale, slug }
      }))
    ),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const locale = normalizeLocale(params?.locale);
  const slug = params?.slug;

  const [post, indexCopy] = await Promise.all([getBlogPost(locale, slug), getBlogIndexCopy(locale)]);

  return {
    props: {
      locale,
      post,
      indexCopy,
      alternateLinks: getAlternateLinks(SITE_URL, "/blog")
    }
  };
}
