import Head from "next/head";
import Layout from "@components/Layout";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks } from "@config/i18n";
import { SITE_URL } from "@config/site";

export default function LegalPage() {
  const { locale, t } = useI18n();
  const alternateLinks = getAlternateLinks(SITE_URL, "/legal");
  const canonicalUrl =
    alternateLinks.find((alt) => alt.locale === locale)?.href || `${SITE_URL}/legal`;

  return (
    <>
      <Head>
        <title>{t.legalPage.metaTitle}</title>
        <meta
          name="description"
          content={t.legalPage.metaDescription}
        />
        <meta property="og:title" content={t.legalPage.metaTitle} />
        <meta
          property="og:description"
          content={t.legalPage.ogDescription}
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
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/legal`} />
      </Head>
      <Layout>
        <section className="section" aria-labelledby="legal-heading">
          <div className="content">
            <h1 id="legal-heading" className="page-title">
              {t.legalPage.title}
            </h1>
            <p className="lead">
              {t.legalPage.lead}
            </p>

            <h2 id="terms" className="section-title">
              {t.legalPage.terms.heading}
            </h2>
            <p>
              {t.legalPage.terms.body}
            </p>

            <h2 id="privacy" className="section-title">
              {t.legalPage.privacy.heading}
            </h2>
            <p>
              {t.legalPage.privacy.body}
            </p>

            <h2 className="section-title">{t.legalPage.thirdParty.heading}</h2>
            <p>
              {t.legalPage.thirdParty.p1}
            </p>
            <p>
              {t.legalPage.thirdParty.p2Prefix} <em>TRON</em> {t.legalPage.thirdParty.p2Middle}{" "}
              <em>TRON: Legacy</em> {t.legalPage.thirdParty.p2Suffix}
            </p>
          </div>
        </section>
      </Layout>
    </>
  );
}
