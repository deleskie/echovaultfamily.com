import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import TrustBlock from "@components/TrustBlock";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizePath } from "@config/i18n";
import { SITE_URL } from "@config/site";

const STORAGE_PLANS = [
  {
    id: "10gb",
    size: "10 GB",
    payOnce: "$179.99",
    payOver24: "$8.99 / month"
  },
  {
    id: "25gb",
    size: "25 GB",
    payOnce: "$349.99",
    payOver24: "$16.99 / month"
  },
  {
    id: "50gb",
    size: "50 GB",
    payOnce: "$529.99",
    payOver24: "$25.99 / month"
  },
  {
    id: "100gb",
    size: "100 GB",
    payOnce: "$899.99",
    payOver24: "$44.99 / month"
  },
  {
    id: "150gb",
    size: "150 GB",
    payOnce: "$1,299.99",
    payOver24: "$64.99 / month"
  },
  {
    id: "250gb",
    size: "250 GB",
    payOnce: "$1,999.99",
    payOver24: "$99.99 / month"
  },
  {
    id: "500gb",
    size: "500 GB",
    payOnce: "$3,499.99",
    payOver24: "$169.99 / month"
  },
  {
    id: "1tb",
    size: "1 TB",
    payOnce: "$5,999.99",
    payOver24: "$299.99 / month"
  },
  {
    id: "2tb",
    size: "2 TB",
    payOnce: "$10,999.99",
    payOver24: "$549.99 / month"
  }
];

export default function StoragePage() {
  const { locale } = useI18n();
  const alternateLinks = getAlternateLinks(SITE_URL, "/storage");
  const canonicalUrl =
    alternateLinks.find((alt) => alt.locale === locale)?.href || `${SITE_URL}/storage`;

  const localized = (path) => localizePath(locale, path);

  return (
    <>
      <Head>
        <title>EchoVault Storage – Simple, private space for family memories</title>
        <meta
          name="description"
          content="Add storage to keep photos, audio, and family files organized in one calm place. Pay once or spread the same plan across 24 months."
        />
        <meta property="og:title" content="EchoVault Storage – Simple, private space for family memories" />
        <meta
          property="og:description"
          content="Storage that’s designed for families: simple, private, and priced with a pay-once or 24-month option."
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
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/storage`} />
      </Head>
      <Layout>
        <div className="storage-page">
          <section className="section section-accent" aria-labelledby="storage-heading">
            <div className="content">
              <h1 id="storage-heading" className="page-title">
                Storage that feels calm, not complicated.
              </h1>
              <p className="lead">
                A gentle place to keep family photos, audio, and important files together—organized,
                private, and easy to hand down.
              </p>
              <div className="section-cta">
                <a className="button button-primary" href="mailto:hello@echovault-ai.com?subject=EchoVault%20Storage">
                  Ask about storage
                </a>
                <Link className="button button-secondary" href={localized("/pricing")}>
                  See EchoVault tiers
                </Link>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="storage-how-heading">
            <div className="content">
              <h2 id="storage-how-heading" className="section-title">
                Two simple ways to pay
              </h2>
              <div className="grid grid-3">
                <div className="card">
                  <h3>Pay once</h3>
                  <p>
                    If you prefer to be done with it, you can cover your storage in one purchase and
                    keep moving.
                  </p>
                </div>
                <div className="card">
                  <h3>Spread it over 24 months</h3>
                  <p>
                    Same idea, gentler pacing: split the plan into 24 monthly payments so it fits
                    real family budgets.
                  </p>
                </div>
                <div className="card">
                  <h3>Built for memories</h3>
                  <p>
                    We’re not trying to be a social network. This is a private place for the people
                    you trust, with simple sharing controls.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-muted" aria-labelledby="storage-plans-heading">
            <div className="content">
              <h2 id="storage-plans-heading" className="section-title">
                Choose a storage size
              </h2>
              <p className="lead">
                Pick the amount of space that matches your family’s photos and recordings today. If
                you’re unsure, we’ll help you pick a comfortable starting point.
              </p>
              <div className="grid grid-3" role="list" aria-label="Storage plans">
                {STORAGE_PLANS.map((plan) => (
                  <article key={plan.id} className="card" role="listitem">
                    <h3>{plan.size}</h3>
                    <p>
                      <strong>Pay once:</strong> {plan.payOnce} <span className="pricing-tag">USD</span>
                      <br />
                      <strong>Or over 24 months:</strong> {plan.payOver24}
                    </p>
                    <a
                      className="button button-primary button-full"
                      href={`mailto:hello@echovault-ai.com?subject=${encodeURIComponent(
                        `EchoVault Storage – ${plan.size}`
                      )}`}
                    >
                      Choose this size
                    </a>
                  </article>
                ))}
              </div>
              <p className="pricing-trust-note">
                Pricing shown in USD. Want help picking a size? Tell us roughly how many photos and
                recordings you’re sitting on, and we’ll recommend a fit.
              </p>
            </div>
          </section>

          <section className="section" aria-labelledby="storage-trust-heading">
            <div className="content">
              <TrustBlock headingId="storage-trust-heading" />
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
