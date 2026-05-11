import { useI18n } from "./I18nProvider";
import { event } from "@lib/gtag";
import { contactMailto } from "@config/site";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="content hero-inner">
        <div className="hero-copy">
          <p className="hero-eyebrow">{t.layout.logoTagline}</p>
          <h1 id="hero-heading" className="hero-title">
            {t.hero.title}
          </h1>
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>
          <div className="hero-actions">
            <a
              href="#waitlist"
              className="button button-primary"
              onClick={() => event("cta_click", { cta_name: "hero_waitlist", cta_location: "hero" })}
            >
              {t.hero.primaryCta}
            </a>
            <a
              href={contactMailto()}
              className="button button-secondary"
              onClick={() => event("contact_click", { contact_type: "email", cta_location: "hero" })}
            >
              {t.hero.secondaryCta}
            </a>
          </div>
          <p className="hero-meta">
            {t.hero.meta}
          </p>
          <div className="hero-offer" aria-label="What you get with EchoVault">
            <p className="hero-offer-label">{t.hero.offerLabel}</p>
            <div className="hero-offer-items">
              {t.hero.offerItems.map((item) => (
                <div key={item.title} className="hero-offer-item">
                  <span className="hero-offer-dot" />
                  <div>
                    <p className="hero-offer-title">{item.title}</p>
                    <p className="hero-offer-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="hero-visual" aria-hidden="true">
          <div className="hero-visual-shell">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />
            <div className="hero-card hero-card-primary">
              <div className="hero-card-header">
                <div className="hero-avatar" />
                <div className="hero-card-meta">
                  <span className="hero-card-kicker">{t.hero.offerLabel}</span>
                  <strong>{t.hero.offerItems[1].title}</strong>
                </div>
              </div>
              <div className="hero-lines">
                <span />
                <span />
                <span />
              </div>
              <p className="hero-caption">
                {t.hero.visualCaption}
              </p>
            </div>
            <div className="hero-card hero-card-secondary">
              {t.hero.offerItems.map((item) => (
                <div key={item.title} className="hero-signal">
                  <span className="hero-signal-dot" />
                  <div>
                    <p className="hero-signal-title">{item.title}</p>
                    <p className="hero-signal-text">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="hero-floating-note">
              <span className="hero-floating-label">{t.home.walkaway.heading}</span>
              <p>{t.home.walkaway.cards[0].title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
