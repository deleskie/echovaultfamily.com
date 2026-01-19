import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import TrustBlock from "@components/TrustBlock";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizePath } from "@config/i18n";
import { SITE_URL } from "@config/site";

const HEIRLOOM_CAL_URL = process.env.NEXT_PUBLIC_HEIRLOOM_CAL_URL;

export default function PricingPage() {
  const { locale, t } = useI18n();
  const alternateLinks = getAlternateLinks(SITE_URL, "/pricing");
  const canonicalUrl =
    alternateLinks.find((alt) => alt.locale === locale)?.href || `${SITE_URL}/pricing`;

  const iconByTierId = {
    gift: GiftIcon,
    legacy: BookIcon,
    heirloom: ArchiveIcon
  };

  const tiers = t.pricing.tiers.map((tier) => ({
    ...tier,
    Icon: iconByTierId[tier.id] || GiftIcon
  }));

  const comparison = t.pricing.compare.rows;
  const comparisonColumns = t.pricing.compare.columns.map((col, index) => ({
    ...col,
    index,
    Icon: iconByTierId[col.id] || GiftIcon
  }));

  const localized = (path) => localizePath(locale, path);

  return (
    <>
      <Head>
        <title>{t.pricing.metaTitle}</title>
        <meta
          name="description"
          content={t.pricing.metaDescription}
        />
        <meta property="og:title" content={t.pricing.metaTitle} />
        <meta
          property="og:description"
          content={t.pricing.ogDescription}
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
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/pricing`} />
      </Head>
      <Layout>
        <div className="pricing-page">
          <section className="section pricing-hero" aria-labelledby="pricing-heading">
            <div className="content pricing-hero-content">
              <span className="pricing-hero-glow" aria-hidden="true" />
              <div className="pricing-hero-copy">
                <h1 id="pricing-heading" className="page-title pricing-hero-title">
                  {t.pricing.hero.title}
                </h1>
                <p className="lead pricing-hero-sub">
                  {t.pricing.hero.subtitle}
                </p>
                <div className="pricing-hero-cta">
                  <Link href={`${localized("/pricing")}#tiers`} className="button button-primary">
                    {t.pricing.hero.ctaTiers}
                  </Link>
                  <Link href={localized("/how-it-works")} className="button button-secondary">
                    {t.pricing.hero.ctaHowItWorks}
                  </Link>
                </div>
              </div>
              <div className="pricing-hero-visual" aria-hidden="true">
                <PricingWaveform />
              </div>
            </div>
          </section>

          <section className="section pricing-section" id="tiers" aria-label={t.pricing.tiersAriaLabel}>
            <div className="content">
              <div className="pricing-grid">
                {tiers.map((tier) => (
                  <article key={tier.id} id={tier.id} className="pricing-card">
                    {tier.badge && (
                      <span className="pricing-badge" aria-label={t.pricing.badgeAriaLabel}>
                        {tier.badge}
                      </span>
                    )}
                    <div className="pricing-card-header">
                      <div className="pricing-icon" role="img" aria-label={`${tier.name} ${t.pricing.iconAriaSuffix}`}>
                        <tier.Icon />
                      </div>
                      <div>
                        <h2 className="pricing-name">{tier.name}</h2>
                        {tier.originalPrice ? (
                          <div className="pricing-price-group">
                            <span className="pricing-price-original">{tier.originalPrice}</span>
                            <p className="pricing-price">
                              {tier.price} {t.pricing.founderSpecialLabel}
                            </p>
                          </div>
                        ) : (
                          <p className="pricing-price">{tier.price}</p>
                        )}
                        <div className="pricing-divider" />
                      </div>
                    </div>
                    <p className="pricing-description">{tier.description}</p>
                    <p className="pricing-emotion">{tier.emotion}</p>
                    {tier.hosting && (
                      <p className="pricing-hosting">
                        {tier.hosting}
                      </p>
                    )}
                    <p className="pricing-features-heading">{t.pricing.featuresHeading}</p>
                    <ul className="pricing-features">
                      {tier.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <p className="pricing-highlight">{tier.highlight}</p>
                    <div className="pricing-card-cta">
                      {tier.id === "heirloom" && HEIRLOOM_CAL_URL ? (
                        <a href={HEIRLOOM_CAL_URL} className="button button-primary button-full">
                          {t.pricing.heirloomCalCta}
                        </a>
                      ) : (
                        <a
                          href={tier.mailtoHref}
                          className="button button-primary button-full"
                        >
                          {tier.mailtoLabel}
                        </a>
                      )}
                    </div>
                  </article>
                ))}
              </div>
              {t.pricing.trustNote ? (
                <p className="pricing-trust-note">
                  {t.pricing.trustNote}
                </p>
              ) : null}
            </div>
          </section>

          <section className="section pricing-cta-surface" aria-label="Need guidance">
            <div className="content pricing-cta pricing-cta--centered">
              <div className="pricing-cta-text">
                <h2 className="section-title">{t.pricing.guidance.title}</h2>
                <p className="lead">
                  {t.pricing.guidance.lead}
                </p>
              </div>
              <div className="pricing-cta-actions pricing-cta-actions--center">
                <a className="button button-primary" href="mailto:hello@echovault-ai.com">
                  {t.pricing.guidance.primaryCta}
                </a>
                <a className="button button-secondary" href="mailto:support@echovault-ai.com">
                  {t.pricing.guidance.secondaryCta}
                </a>
              </div>
            </div>
          </section>

          <section className="section pricing-section" aria-labelledby="compare-heading">
            <div className="content">
              <div className="pricing-compare-card">
                <div className="pricing-compare-head">
                  <h2 id="compare-heading" className="section-title">
                    {t.pricing.compare.title}
                  </h2>
                  <p className="pricing-compare-copy">
                    {t.pricing.compare.copy}
                  </p>
                </div>
                <div className="pricing-compare-columns">
                  {comparisonColumns.map((col) => (
                    <div key={col.name} className="pricing-compare-column">
                      <div className="pricing-compare-colhead">
                        <span className="pricing-compare-colicon" aria-hidden="true">
                          <col.Icon />
                        </span>
                        <h3 className="pricing-compare-title">{col.name}</h3>
                      </div>
                      <div className="pricing-compare-items" role="list">
                        {comparison.map((row, idx) => (
                          <div
                            key={`${row.label}-${col.name}`}
                            className={`pricing-compare-item ${idx % 2 === 0 ? "is-odd" : ""}`}
                            role="listitem"
                          >
                            <p className="pricing-compare-item-label">{row.label}</p>
                            <p className="pricing-compare-item-value">{row.values[col.index]}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="section pricing-section" aria-labelledby="paths-heading">
            <div className="content">
              <h2 id="paths-heading" className="section-title">
                {t.pricing.paths.title}
              </h2>
              <p className="lead">
                {t.pricing.paths.lead}
              </p>
              <div className="grid grid-3">
                {t.pricing.paths.cards.map((card) => (
                  <div key={card.title} className="card">
                    <h3>{card.title}</h3>
                    <p>{card.body}</p>
                    <p>
                      <strong>{t.pricing.paths.startWithLabel}</strong> {card.startWith}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="section pricing-section" aria-labelledby="pricing-faq-heading">
            <div className="content">
              <h2 id="pricing-faq-heading" className="section-title">
                {t.pricing.faq.title}
              </h2>
              <div className="grid">
                {t.pricing.faq.items.map((item) => (
                  <div key={item.question} className="card">
                    <h3>{item.question}</h3>
                    <p>{item.answer}</p>
                  </div>
                ))}
              </div>
              <p className="blog-back-link">
                <Link href={localized("/blog/echoes-in-the-grid")}>
                  {t.pricing.faq.blogLinkText}
                </Link>
              </p>
            </div>
          </section>

          <section className="section pricing-section" aria-label="More details">
            <div className="content">
              <h2 className="section-title">More ways we help families</h2>
              <p className="lead">
                If you’re organizing a bigger family archive, these pages explain our storage and photo
                care options in plain language.
              </p>
              <div className="grid grid-3">
                <div className="card">
                  <h3>Storage</h3>
                  <p>
                    Add a simple, private place for photos, audio, and family files. Pay once or spread
                    the same plan across 24 months.
                  </p>
                  <p>
                    <Link className="button button-secondary" href={localized("/storage")}>
                      View storage options
                    </Link>
                  </p>
                </div>
                <div className="card">
                  <h3>Photo care</h3>
                  <p>
                    Free everyday corrections, plus optional credit packs for deeper restorations when
                    an image needs more help.
                  </p>
                  <p>
                    <Link className="button button-secondary" href={localized("/photo-restoration")}>
                      View photo care
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="section pricing-section" aria-labelledby="pricing-trust-heading">
            <div className="content">
              <TrustBlock headingId="pricing-trust-heading" />
            </div>
          </section>

          <section className="section pricing-cta-surface pricing-cta-surface--base" aria-label="Next steps">
            <div className="content pricing-cta pricing-cta--centered">
              <div className="pricing-cta-text">
                <h2 className="section-title">{t.pricing.finalCta.title}</h2>
                <p className="lead">
                  {t.pricing.finalCta.lead}
                </p>
              </div>
              <div className="pricing-cta-actions pricing-cta-actions--center">
                <a
                  className="button button-primary"
                  href="mailto:hello@echovault-ai.com?subject=EchoVault%20Project%20Planning"
                >
                  {t.pricing.finalCta.primaryCta}
                </a>
                <a className="button button-secondary" href="mailto:hello@echovault-ai.com">
                  {t.pricing.finalCta.secondaryCta}
                </a>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

function GiftIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M8 10.5h16M16 10.5v15m-9-15v4.5a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-4.5H7Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M13.5 10.5c-.828 0-1.5-.895-1.5-2s.672-2 1.5-2c1.2 0 2.5 1 2.5 3m3.5 1c.828 0 1.5-.895 1.5-2s-.672-2-1.5-2c-1.2 0-2.5 1-2.5 3"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinecap="round"
      />
      <rect x="7" y="10.5" width="18" height="4.5" rx="1" fill="url(#giftGradient)" />
      <defs>
        <linearGradient id="giftGradient" x1="7" y1="10.5" x2="26" y2="15" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6f2ee5" />
          <stop offset="1" stopColor="#a98cf7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function BookIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path
        d="M7.5 6.5h7.5a3 3 0 0 1 3 3v15H10a2.5 2.5 0 0 0-2.5 2.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M24.5 6.5H17a3 3 0 0 0-3 3v15h8a2.5 2.5 0 0 1 2.5 2.5V6.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
        opacity="0.8"
      />
      <path d="M13.5 11h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13.5 14h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M13.5 17h5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
}

function ArchiveIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <rect x="6" y="7" width="20" height="4" rx="1.5" fill="url(#archiveGradient)" />
      <path
        d="M8 11h16v13.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 8 24.5V11Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path d="M13 16h6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      <defs>
        <linearGradient id="archiveGradient" x1="6" y1="7" x2="26" y2="11" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6f2ee5" />
          <stop offset="1" stopColor="#a98cf7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function PricingWaveform() {
  return (
    <svg className="pricing-waveform" viewBox="0 0 600 220" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id="pricingWave" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(111, 46, 229, 0.9)" />
          <stop offset="100%" stopColor="rgba(169, 140, 247, 0.5)" />
        </linearGradient>
      </defs>
      <path
        d="M20 140c40-40 80-40 120 0s80 40 120 0 80-40 120 0 80 40 120 0"
        stroke="url(#pricingWave)"
        strokeWidth="10"
        fill="none"
        strokeLinecap="round"
        opacity="0.6"
      />
      <path
        d="M60 170c30-30 60-30 90 0s60 30 90 0 60-30 90 0 60 30 90 0 60-30 90 0"
        stroke="url(#pricingWave)"
        strokeWidth="6"
        fill="none"
        strokeLinecap="round"
        opacity="0.35"
      />
      <circle cx="520" cy="70" r="26" fill="rgba(111,46,229,0.16)" />
      <circle cx="520" cy="70" r="8" fill="rgba(169,140,247,0.85)" />
    </svg>
  );
}
