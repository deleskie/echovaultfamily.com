import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import TrustBlock from "@components/TrustBlock";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizePath } from "@config/i18n";
import { SITE_URL } from "@config/site";

const INCLUDED_BASIC_PHOTOS = "Included on all photos";

const CREDIT_PACKS = [
  { id: "trial", name: "Starter credits", credits: "5 credits", price: "Included (Gift + Legacy trial)" },
  { id: "pack-100", name: "Pack A", credits: "100 credits", price: "$29.99 (valid 12 months)" },
  { id: "pack-200", name: "Pack B", credits: "200 credits", price: "$39.99 (no expiration)" }
];

export default function PhotoRestorationPage() {
  const { locale } = useI18n();
  const alternateLinks = getAlternateLinks(SITE_URL, "/photo-restoration");
  const canonicalUrl =
    alternateLinks.find((alt) => alt.locale === locale)?.href || `${SITE_URL}/photo-restoration`;

  const localized = (path) => localizePath(locale, path);

  return (
    <>
      <Head>
        <title>EchoVault Photo Care – Corrections, restoration, and color help</title>
        <meta
          name="description"
          content="Gentle photo corrections are included at no cost, with optional credit packs for deeper restorations. Every Pro Restoration image is reviewed by a human."
        />
        <meta property="og:title" content="EchoVault Photo Care – Corrections, restoration, and color help" />
        <meta
          property="og:description"
          content="From quick fixes to deep restorations, photo care that’s warm, transparent, and checked by a human."
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
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/photo-restoration`} />
      </Head>
      <Layout>
        <div className="photo-restoration-page">
          <section className="section section-accent" aria-labelledby="photo-heading">
            <div className="content">
              <h1 id="photo-heading" className="page-title">
                Photo care that respects the original.
              </h1>
              <p className="lead">
                We help families clean up scans, brighten faded prints, and gently restore images
                that matter—without making them look plastic or “filtered.”
              </p>
              <div className="section-cta">
                <a className="button button-primary" href="mailto:hello@echovault-ai.com?subject=Photo%20Care">
                  Ask about photo care
                </a>
                <Link className="button button-secondary" href={localized("/storage")}>
                  See storage options
                </Link>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="photo-basic-heading">
            <div className="content">
              <h2 id="photo-basic-heading" className="section-title">
                Included: everyday corrections (free)
              </h2>
              <p className="lead">
                Everyone gets a starter set of complimentary corrections—perfect for “this scan is a
                little crooked” or “Grandma’s photo looks a bit faded.” Included photos:{" "}
                <strong>{INCLUDED_BASIC_PHOTOS}</strong>.
              </p>
              <div className="grid grid-3">
                <div className="card">
                  <h3>Clarity and color</h3>
                  <p>Light exposure fixes, gentle color balancing, and bringing back a natural look.</p>
                </div>
                <div className="card">
                  <h3>Clean-up</h3>
                  <p>Dust and small specks, mild scratches, and simple background tidy-ups.</p>
                </div>
                <div className="card">
                  <h3>Framing</h3>
                  <p>Crop, straighten, rotate, and help with washed-out scans or uneven edges.</p>
                </div>
              </div>
              <p className="pricing-trust-note">
                These are small, respectful edits. If a photo needs major rebuilding, we’ll suggest a
                deeper restoration option instead of trying to “fake it.”
              </p>
            </div>
          </section>

          <section className="section section-muted" aria-labelledby="photo-studio-heading">
            <div className="content">
              <h2 id="photo-studio-heading" className="section-title">
                Optional: Pro Restoration (credit-based)
              </h2>
              <p className="lead">
                Some photos need more than a quick touch-up: tears, heavy damage, missing corners, or
                a face that’s gone soft over time. For those, we offer deep restorations billed in
                simple credits.
              </p>
              <div className="grid grid-3">
                <div className="card">
                  <h3>Repair and rebuild</h3>
                  <p>Torn edges, creases, missing sections, heavy scratch damage, and stains.</p>
                </div>
                <div className="card">
                  <h3>Portrait help</h3>
                  <p>Gentle face clarity, glare reduction, and careful fixes that keep people looking like themselves.</p>
                </div>
                <div className="card">
                  <h3>Color help</h3>
                  <p>Natural-looking color work when it’s appropriate—and honest restraint when it’s not.</p>
                </div>
              </div>

              <div className="pricing-compare-card" aria-label="How credits work">
                <div className="pricing-compare-head">
                  <h3 className="section-title">How credits work</h3>
                  <p className="pricing-compare-copy">
                    One credit covers one photo. We use modern restoration tools to speed up the careful
                    work, and a human reviews every Pro Restoration image before it’s delivered.
                  </p>
                </div>
                <div className="pricing-compare-columns">
                  {CREDIT_PACKS.map((pack) => (
                    <div key={pack.id} className="pricing-compare-column">
                      <div className="pricing-compare-colhead">
                        <h4 className="pricing-compare-title">{pack.name}</h4>
                      </div>
                      <div className="pricing-compare-items" role="list">
                        <div className="pricing-compare-item is-odd" role="listitem">
                          <p className="pricing-compare-item-label">Credits</p>
                          <p className="pricing-compare-item-value">{pack.credits}</p>
                        </div>
                        <div className="pricing-compare-item" role="listitem">
                          <p className="pricing-compare-item-label">Price</p>
                          <p className="pricing-compare-item-value">{pack.price}</p>
                        </div>
                        <div className="pricing-compare-item is-odd" role="listitem">
                          <p className="pricing-compare-item-label">Use</p>
                          <p className="pricing-compare-item-value">1 credit = 1 photo</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="pricing-card-cta">
                  <a className="button button-primary" href="mailto:hello@echovault-ai.com?subject=Photo%20Care%20Credits">
                    Ask about credit packs
                  </a>
                  <Link className="button button-secondary" href={localized("/pricing")}>
                    Back to pricing
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="section" aria-labelledby="photo-trust-heading">
            <div className="content">
              <TrustBlock headingId="photo-trust-heading" />
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}
