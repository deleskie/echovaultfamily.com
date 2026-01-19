import Head from "next/head";
import Link from "next/link";
import Layout from "@components/Layout";
import Hero from "@components/Hero";
import TierPreview from "@components/TierPreview";
import WaitlistCTA from "@components/WaitlistCTA";
import TrustBlock from "@components/TrustBlock";
import { useI18n } from "@components/I18nProvider";
import { getAlternateLinks, localizeHashLink, localizePath } from "@config/i18n";
import { SITE_URL } from "@config/site";

export default function HomePage() {
  const { locale, t } = useI18n();
  const alternateLinks = getAlternateLinks(SITE_URL, "/");
  const canonicalUrl =
    alternateLinks.find((alt) => alt.locale === locale)?.href || `${SITE_URL}/`;

  return (
    <>
      <Head>
        <title>{t.home.metaTitle}</title>
        <meta
          name="description"
          content={t.home.metaDescription}
        />
        <meta
          property="og:title"
          content={t.home.metaTitle}
        />
        <meta
          property="og:description"
          content={t.home.ogDescription}
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
        <link rel="alternate" hrefLang="x-default" href={`${SITE_URL}/`} />
      </Head>
      <Layout>
        <Hero />
        <section className="section" aria-labelledby="glance-heading">
          <div className="content">
            <h2 id="glance-heading" className="section-title">
              {t.home.glance.heading}
            </h2>
            <p className="lead">
              {t.home.glance.lead}
            </p>
            <div className="grid grid-3">
              {t.home.glance.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-muted" aria-labelledby="who-heading">
          <div className="content">
            <h2 id="who-heading" className="section-title">
              {t.home.who.heading}
            </h2>
            <div className="grid grid-3">
              {t.home.who.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.p1}</p>
                  <p>
                    <strong>{t.home.who.commonMomentLabel}</strong> {card.commonMoment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="what-heading">
          <div className="content">
            <h2 id="what-heading" className="section-title">
              {t.home.what.heading}
            </h2>
            <div className="grid">
              {t.home.what.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-muted" aria-labelledby="walkaway-heading">
          <div className="content">
            <h2 id="walkaway-heading" className="section-title">
              {t.home.walkaway.heading}
            </h2>
            <p className="lead">
              {t.home.walkaway.lead}
            </p>
            <div className="grid grid-3">
              {t.home.walkaway.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
            <p className="lead">
              {t.home.walkaway.timing}
            </p>
          </div>
        </section>
        <section className="section" aria-labelledby="examples-heading">
          <div className="content">
            <h2 id="examples-heading" className="section-title">
              {t.home.examples.heading}
            </h2>
            <p className="lead">
              {t.home.examples.lead}
            </p>
            <div className="grid grid-3">
              <div className="card">
                <h3>{t.home.examples.transcriptTitle}</h3>
                <div className="mock-ui" aria-label={t.home.examples.transcriptTitle}>
                  <div className="mock-ui-header">
                    <span className="mock-pill">{t.home.examples.transcriptPill}</span>
                    <span className="mock-meta">{t.home.examples.transcriptMeta}</span>
                  </div>
                  <div className="mock-ui-body">
                    {t.home.examples.transcriptLines.map((line) => (
                      <p key={`${line.speaker}-${line.line}`}>
                        <strong>{line.speaker}:</strong> {line.line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              <div className="card">
                <h3>{t.home.examples.chatTitle}</h3>
                <div className="mock-chat" aria-label={t.home.examples.chatTitle}>
                  {t.home.examples.chatBubbles.map((bubble, index) => (
                    <div
                      key={`${bubble.who}-${index}`}
                      className={`mock-bubble ${
                        bubble.who === "user" ? "mock-bubble-user" : "mock-bubble-echo"
                      }`}
                    >
                      {bubble.text}
                    </div>
                  ))}
                </div>
              </div>
              <div className="card">
                <h3>{t.home.examples.promptsTitle}</h3>
                <p>
                  {t.home.examples.promptsIntro}
                </p>
                <ul className="sample-prompts">
                  {t.home.examples.prompts.map((prompt) => (
                    <li key={prompt}>{prompt}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="story-heading">
          <div className="content">
            <h2 id="story-heading" className="section-title">
              {t.home.story.heading}
            </h2>
            <p className="lead">
              {t.home.story.lead}
            </p>
            <p>
              {t.home.story.p1}
            </p>
            <p>
              {t.home.story.p2}
            </p>
          </div>
        </section>
        <section className="section" aria-labelledby="voices-heading">
          <div className="content">
            <h2 id="voices-heading" className="section-title">
              {t.home.voices.heading}
            </h2>
            <div className="grid">
              {t.home.voices.quotes.map((quote) => (
                <div key={quote.meta} className="card">
                  <p className="quote">“{quote.quote}”</p>
                  <p className="quote-meta">— {quote.meta}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-accent" aria-labelledby="why-now-heading">
          <div className="content">
            <h2 id="why-now-heading" className="section-title">
              {t.home.whyNow.heading}
            </h2>
            <p className="lead">
              {t.home.whyNow.lead}
            </p>
            <div className="grid">
              {t.home.whyNow.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
            <div className="section-cta">
              <Link href={localizeHashLink(locale, "#waitlist")} className="button button-primary">
                {t.home.whyNow.cta}
              </Link>
            </div>
          </div>
        </section>
        <section className="section" aria-labelledby="care-heading">
          <div className="content">
            <h2 id="care-heading" className="section-title">
              {t.home.care.heading}
            </h2>
            <div className="grid grid-3">
              {t.home.care.cards.map((card) => (
                <div key={card.title} className="card">
                  <h3>{card.title}</h3>
                  <p>{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section section-muted" aria-labelledby="home-trust-heading">
          <div className="content">
            <TrustBlock headingId="home-trust-heading" />
          </div>
        </section>
        <section className="section" aria-labelledby="founder-heading">
          <div className="content">
            <h2 id="founder-heading" className="section-title">
              {t.home.founder.heading}
            </h2>
            <p className="lead">
              {t.home.founder.lead}
            </p>
            <p>
              {t.home.founder.p1}
            </p>
            <p>
              {t.home.founder.p2}
            </p>
            <p>
              <Link href={localizePath(locale, "/blog/echoes-in-the-grid")} className="button button-secondary">
                {t.home.founder.cta}
              </Link>
            </p>
          </div>
        </section>
        <TierPreview />
        <WaitlistCTA />
      </Layout>
    </>
  );
}
