import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import TrustBlock from "@components/TrustBlock";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizePath } from "@config/i18n";
import { SITE_URL } from "@config/site";

export default function HowItWorksPage() {
  const { locale, t } = useI18n();
  const alternateLinks = getAlternateLinks(SITE_URL, "/how-it-works");
  const canonicalUrl =
    alternateLinks.find((alt) => alt.locale === locale)?.href || `${SITE_URL}/how-it-works`;

  const localized = (path) => localizePath(locale, path);

  const stepIcons = [MicrophoneIcon, NeuralIcon, ChatIcon];
  const steps = t.howItWorksPage.steps.map((step, index) => ({
    ...step,
    icon: stepIcons[index] || MicrophoneIcon
  }));

  const faqs = t.howItWorksPage.faq.items;

  return (
    <>
      <Head>
        <title>{t.howItWorksPage.metaTitle}</title>
        <meta
          name="description"
          content={t.howItWorksPage.metaDescription}
        />
        <meta property="og:title" content={t.howItWorksPage.metaTitle} />
        <meta
          property="og:description"
          content={t.howItWorksPage.ogDescription}
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
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/how-it-works`} />
      </Head>
      <Layout>
        <div className="hiw-page">
          <section className="section hiw-surface-base" aria-labelledby="how-heading">
            <div className="content">
              <div className="hiw-hero-block">
                <div className="hiw-hero-mark" aria-hidden="true">
                  EV
                </div>
                <h1 id="how-heading" className="hiw-hero-title">
                  {t.howItWorksPage.hero.title}
                </h1>
                <p className="hiw-hero-subtitle">
                  {t.howItWorksPage.hero.subtitle}
                </p>
                <p className="hiw-hero-support">
                  {t.howItWorksPage.hero.support}
                </p>
                <div className="hiw-hero-actions" aria-label="Primary actions">
                  <Link href={localized("/pricing")} className="button button-primary">
                    {t.howItWorksPage.hero.primaryCta}
                  </Link>
                  <Link href={`${localized("/how-it-works")}#faq`} className="button button-secondary">
                    {t.howItWorksPage.hero.secondaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </section>

          <section className="section hiw-surface-alt" aria-labelledby="steps-heading">
            <div className="content">
              <div className="hiw-steps-header">
                <p className="hiw-intro">{t.howItWorksPage.journey.intro}</p>
                <h2 id="steps-heading" className="hiw-section-title">
                  {t.howItWorksPage.journey.heading}
                </h2>
              </div>
              <div className="hiw-steps-grid">
                {steps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <article key={step.title} className="hiw-step-card">
                      <Icon />
                      <p className="hiw-step-label">
                        {t.howItWorksPage.journey.stepLabel} {index + 1}
                      </p>
                      <h3 className="hiw-step-title">{step.title}</h3>
                      <p className="hiw-step-body">{step.description}</p>
                      <p className="hiw-step-note">{step.note}</p>
                    </article>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="section hiw-surface-base" aria-labelledby="roles-heading">
            <div className="content">
              <div className="hiw-trust">
                <h2 id="roles-heading" className="hiw-trust-title">
                  {t.howItWorksPage.roles.heading}
                </h2>
                <p className="hiw-trust-copy">
                  {t.howItWorksPage.roles.copy}
                </p>
              </div>
              <div className="hiw-steps-grid">
                {t.howItWorksPage.roles.cards.map((card) => (
                  <article key={card.title} className="hiw-step-card">
                    <p className="hiw-step-label">{card.label}</p>
                    <h3 className="hiw-step-title">{card.title}</h3>
                    <p className="hiw-step-body">{card.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>

          <section className="section hiw-cta-section" aria-label="Start recording">
            <div className="content">
              <div className="hiw-cta-block">
                <h3 className="hiw-cta-title">{t.howItWorksPage.cta.title}</h3>
                <p className="hiw-cta-text">
                  {t.howItWorksPage.cta.text}
                </p>
                <div className="hiw-cta-actions">
                  <Link href={localized("/pricing")} className="button button-primary">
                    {t.howItWorksPage.cta.primaryCta}
                  </Link>
                  <a href="mailto:hello@echovault-ai.com" className="button button-secondary">
                    {t.howItWorksPage.cta.secondaryCta}
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="section hiw-surface-base" aria-labelledby="trust-heading">
            <div className="content">
              <div className="hiw-trust">
                <h2 id="trust-heading" className="hiw-trust-title">
                  {t.howItWorksPage.trust.heading}
                </h2>
                <p className="hiw-trust-copy">
                  {t.howItWorksPage.trust.copy}
                </p>
              </div>
              <TrustBlock headingId="hiw-trust-block-heading" />
            </div>
          </section>

          <section className="section hiw-surface-alt" id="faq" aria-labelledby="faq-heading">
            <div className="content">
              <div className="hiw-faq-card">
                <h2 id="faq-heading" className="hiw-section-title">
                  {t.howItWorksPage.faq.heading}
                </h2>
                <div className="hiw-faq-accordions">
                  {faqs.map((faq) => (
                    <details key={faq.question} className="hiw-accordion">
                      <summary className="hiw-accordion-summary">
                        <span>{faq.question}</span>
                        <span className="hiw-accordion-icon" aria-hidden="true">
                          +
                        </span>
                      </summary>
                      <div className="hiw-accordion-panel">
                        <p>{faq.answer}</p>
                      </div>
                    </details>
                  ))}
                </div>
                <div className="hiw-cta-actions hiw-cta-actions--center">
                  <a className="button button-secondary" href="mailto:hello@echovault-ai.com">
                    {t.howItWorksPage.faq.secondaryCta}
                  </a>
                  <Link href={localized("/pricing")} className="button button-primary">
                    {t.howItWorksPage.faq.primaryCta}
                  </Link>
                </div>
                <p className="blog-back-link">
                  <Link href={localized("/blog/echoes-in-the-grid")}>
                    {t.howItWorksPage.faq.blogLinkText}
                  </Link>
                </p>
              </div>
            </div>
          </section>

          <section className="section hiw-footer-cta" aria-label="Final call to action">
            <div className="content">
              <div className="hiw-footer-cta-inner">
                <h3 className="hiw-footer-cta-title">{t.howItWorksPage.footer.title}</h3>
                <p className="hiw-footer-cta-text">
                  {t.howItWorksPage.footer.text}
                </p>
                <div className="hiw-cta-actions hiw-cta-actions--center">
                  <Link href={localized("/pricing")} className="button button-primary">
                    {t.howItWorksPage.footer.primaryCta}
                  </Link>
                  <Link href={localized("/pricing")} className="button button-secondary">
                    {t.howItWorksPage.footer.secondaryCta}
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    </>
  );
}

function MicrophoneIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 28 28"
      fill="none"
      role="img"
      aria-hidden="true"
      className="hiw-card-icon"
    >
      <rect x="10" y="4" width="8" height="14" rx="4" fill="url(#micGradient)" />
      <path
        d="M6.5 12.5V14c0 4.143 3.357 7.5 7.5 7.5s7.5-3.357 7.5-7.5v-1.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path d="M14 21.5V24" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <path d="M10.5 24h7" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <defs>
        <linearGradient id="micGradient" x1="10" y1="4" x2="19" y2="18" gradientUnits="userSpaceOnUse">
          <stop stopColor="#6f2ee5" />
          <stop offset="1" stopColor="#a98cf7" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function NeuralIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-hidden="true"
      className="hiw-card-icon"
    >
      <path
        d="M9 8.5c0-1.38 1.12-2.5 2.5-2.5h9c1.38 0 2.5 1.12 2.5 2.5V11c0 1.66-1.34 3-3 3h-8a2 2 0 0 0-2 2v4.5c0 1.38-1.12 2.5-2.5 2.5S5 21.88 5 20.5v-9C5 10.57 6.57 9 8.5 9 8.78 9 9 8.78 9 8.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <path
        d="M23 12.5c0-1.38 1.12-2.5 2.5-2.5S28 11.12 28 12.5v9c0 1.93-1.57 3.5-3.5 3.5-.28 0-.5.22-.5.5 0 1.38-1.12 2.5-2.5 2.5H13c-1.38 0-2.5-1.12-2.5-2.5V21c0-1.66 1.34-3 3-3h7a2 2 0 0 0 2-2v-3.5Z"
        stroke="currentColor"
        strokeWidth="1.3"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
      <circle cx="20" cy="10" r="1" fill="currentColor" />
      <circle cx="20" cy="18" r="1" fill="currentColor" />
      <circle cx="24" cy="24" r="1" fill="currentColor" />
    </svg>
  );
}

function ChatIcon() {
  return (
    <svg
      width="40"
      height="40"
      viewBox="0 0 32 32"
      fill="none"
      role="img"
      aria-hidden="true"
      className="hiw-card-icon"
    >
      <path
        d="M6 9.5C6 8.12 7.12 7 8.5 7h12c1.38 0 2.5 1.12 2.5 2.5v9c0 1.38-1.12 2.5-2.5 2.5H12l-4 3v-3.5C7 20.12 6 19 6 17.5v-8Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path
        d="M12.5 11h7m-7 4h4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <path
        d="M19 6c0-1.66-1.34-3-3-3H7C5.34 3 4 4.34 4 6v9c0 1.38 1.12 2.5 2.5 2.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
        opacity="0.55"
      />
    </svg>
  );
}
