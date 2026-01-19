import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizePath } from "@config/i18n";
import { SITE_URL } from "@config/site";

export default function TrustPage() {
  const { locale, t } = useI18n();
  const alternateLinks = getAlternateLinks(SITE_URL, "/trust");
  const canonicalUrl =
    alternateLinks.find((alt) => alt.locale === locale)?.href || `${SITE_URL}/trust`;

  const localized = (path) => localizePath(locale, path);

  return (
    <>
      <Head>
        <title>{t.trustPage.metaTitle}</title>
        <meta
          name="description"
          content={t.trustPage.metaDescription}
        />
        <meta property="og:title" content={t.trustPage.metaTitle} />
        <meta
          property="og:description"
          content={t.trustPage.ogDescription}
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content={`${SITE_URL}/social/og-link-card.svg`} />
        <link rel="canonical" href={canonicalUrl} />
        {alternateLinks.map((alt) => (
          <link key={alt.hrefLang} rel="alternate" hrefLang={alt.hrefLang} href={alt.href} />
        ))}
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/trust`} />
      </Head>
      <Layout>
        <section className="section trust-hero" aria-labelledby="trust-page-heading">
          <div className="content">
            <h1 id="trust-page-heading" className="page-title">
              {t.trustPage.title}
            </h1>
            <p className="lead">
              {t.trustPage.lead}
            </p>

            <h2 className="section-title">{t.trustPage.optimize.heading}</h2>
            <div className="grid">
              {t.trustPage.optimize.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>

            <h2 className="section-title">{t.trustPage.access.heading}</h2>
            <p>
              {t.trustPage.access.body}
            </p>

            <h2 className="section-title">{t.trustPage.security.heading}</h2>
            <p>
              {t.trustPage.security.body}
            </p>

            <h2 className="section-title">{t.trustPage.retention.heading}</h2>
            <p>
              {t.trustPage.retention.body}
            </p>

            <h2 className="section-title">{t.trustPage.wont.heading}</h2>
            <div className="grid">
              {t.trustPage.wont.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>

            <div className="section-cta">
              <a className="button button-primary" href="mailto:hello@echovault-ai.com?subject=EchoVault%20Trust%20Question">
                {t.trustPage.cta.primaryCta}
              </a>
              <Link className="button button-secondary" href={localized("/pricing")}>
                {t.trustPage.cta.secondaryCta}
              </Link>
            </div>
          </div>
        </section>
      </Layout>
    </>
  );
}
