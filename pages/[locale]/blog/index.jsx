import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizePath, NON_DEFAULT_LOCALES, normalizeLocale } from "@config/i18n";
import { SITE_URL } from "@config/site";
import { getBlogIndexCopy, getBlogIndexPosts } from "../../../lib/blog";

export default function LocalizedBlogIndexPage({ posts, indexCopy, alternateLinks }) {
  const { locale } = useI18n();
  const localized = (path) => localizePath(locale, path);

  const canonicalPath = localized("/blog");
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;

  return (
    <>
      <Head>
        <title>{indexCopy.metaTitle}</title>
        <meta name="description" content={indexCopy.metaDescription} />
        <meta property="og:title" content={indexCopy.ogTitle} />
        <meta property="og:description" content={indexCopy.ogDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <link rel="canonical" href={canonicalUrl} />
        {alternateLinks.map((alt) => (
          <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/blog`} />
      </Head>
      <Layout>
        <section className="section" aria-labelledby="blog-heading">
          <div className="content">
            <h1 id="blog-heading" className="page-title">
              {indexCopy.heading}
            </h1>
            <p className="lead">{indexCopy.lead}</p>
            <div className="grid blog-list">
              {posts.map((post) => (
                <article key={post.slug} className="card blog-card">
                  <Link
                    href={localized(`/blog/${post.slug}`)}
                    className="blog-card-link"
                    aria-label={post.title}
                  >
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <p className="blog-meta">{post.meta}</p>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}

export function getStaticPaths() {
  return {
    paths: NON_DEFAULT_LOCALES.map((locale) => ({ params: { locale } })),
    fallback: false
  };
}

export async function getStaticProps({ params }) {
  const locale = normalizeLocale(params?.locale);
  const [posts, indexCopy] = await Promise.all([getBlogIndexPosts(locale), getBlogIndexCopy(locale)]);

  return {
    props: {
      locale,
      posts,
      indexCopy,
      alternateLinks: getAlternateLinks(SITE_URL, "/blog")
    }
  };
}

