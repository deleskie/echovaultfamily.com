import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import TrustBlock from "@components/TrustBlock";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizePath } from "@config/i18n";
import { contactMailto, SITE_URL } from "@config/site";

const STORAGE_PLANS = [
  {
    id: "10gb",
    size: "10 GB",
    payOnce: "$179.99",
    payOver24: "$8.99 / month",
    bestFor: "a small starter archive with selected photos, transcripts, and a few recordings"
  },
  {
    id: "25gb",
    size: "25 GB",
    payOnce: "$349.99",
    payOver24: "$16.99 / month",
    bestFor: "one storyteller with a practical mix of audio, photos, and family files"
  },
  {
    id: "50gb",
    size: "50 GB",
    payOnce: "$529.99",
    payOver24: "$25.99 / month",
    bestFor: "a larger single-family project with more scans, sessions, and working files"
  },
  {
    id: "100gb",
    size: "100 GB",
    payOnce: "$899.99",
    payOver24: "$44.99 / month",
    bestFor: "multi-person family archives or projects with heavier photo restoration work"
  },
  {
    id: "150gb",
    size: "150 GB",
    payOnce: "$1,299.99",
    payOver24: "$64.99 / month",
    bestFor: "families combining interviews, albums, scanned documents, and legacy media"
  },
  {
    id: "250gb",
    size: "250 GB",
    payOnce: "$1,999.99",
    payOver24: "$99.99 / month",
    bestFor: "a serious archive with several branches of family material and concierge help"
  },
  {
    id: "500gb",
    size: "500 GB",
    payOnce: "$3,499.99",
    payOver24: "$169.99 / month",
    bestFor: "large preservation projects with many originals, working copies, and exports"
  },
  {
    id: "1tb",
    size: "1 TB",
    payOnce: "$5,999.99",
    payOver24: "$299.99 / month",
    bestFor: "extended-family archive work with substantial media handling and stewardship"
  },
  {
    id: "2tb",
    size: "2 TB",
    payOnce: "$10,999.99",
    payOver24: "$549.99 / month",
    bestFor: "high-touch archival service for families bringing decades of photos and recordings"
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
        <title>EchoVault Archive Service Plans – Private family memory storage</title>
        <meta
          name="description"
          content="Archive service plans for keeping family photos, audio, transcripts, and legacy files organized with private access, stewardship, and clear support."
        />
        <meta property="og:title" content="EchoVault Archive Service Plans – Private family memory storage" />
        <meta
          property="og:description"
          content="Private archive service plans for families who need more than raw cloud storage."
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
                Archive service plans for family memories.
              </h1>
              <p className="lead">
                Keep photos, recordings, transcripts, and important family files together with
                private access, simple organization, and support from people who understand legacy
                projects.
              </p>
              <div className="section-cta">
                <a className="button button-primary" href={contactMailto("EchoVault Archive Service Plan")}>
                  Ask about archive service
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
                More than a folder of files
              </h2>
              <div className="grid grid-3">
                <div className="card">
                  <h3>Archive setup and stewardship</h3>
                  <p>
                    We help keep family materials organized around people, stories, sessions, and
                    outputs so the archive is useful later, not just uploaded somewhere.
                  </p>
                </div>
                <div className="card">
                  <h3>Private family access</h3>
                  <p>
                    Invite the people who should have access and keep the archive away from feeds,
                    public links, and ad-driven platforms.
                  </p>
                </div>
                <div className="card">
                  <h3>Pay once or over 24 months</h3>
                  <p>
                    Choose a single payment or spread the same archive service plan across 24 months
                    so it fits a real family budget.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section section-muted" aria-labelledby="storage-plans-heading">
            <div className="content">
              <h2 id="storage-plans-heading" className="section-title">
                Choose an archive service plan
              </h2>
              <p className="lead">
                Each plan includes the listed archive capacity plus organization, private access,
                export guidance, and human support. The larger plans are for families bringing
                substantial media collections, not just buying commodity cloud space.
              </p>
              <div className="grid grid-3" role="list" aria-label="Archive service plans">
                {STORAGE_PLANS.map((plan) => (
                  <article key={plan.id} className="card" role="listitem">
                    <h3>{plan.size} Archive Service Plan</h3>
                    <p>
                      <strong>Capacity included:</strong> {plan.size}
                      <br />
                      <strong>Pay once:</strong> {plan.payOnce} <span className="pricing-tag">USD</span>
                      <br />
                      <strong>Or over 24 months:</strong> {plan.payOver24}
                    </p>
                    <p>
                      <strong>Best for:</strong> {plan.bestFor}.
                    </p>
                    <a
                      className="button button-primary button-full"
                      href={contactMailto(`EchoVault Archive Service Plan - ${plan.size}`)}
                    >
                      Ask about this plan
                    </a>
                  </article>
                ))}
              </div>
              <p className="pricing-trust-note">
                Pricing shown in USD. Want help picking a plan? Tell us roughly how many photos,
                recordings, and documents you’re sitting on, and we’ll recommend a fit before you
                commit.
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
