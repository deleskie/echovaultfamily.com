import { useI18n } from "./I18nProvider";

export default function Hero() {
  const { t } = useI18n();

  return (
    <section className="hero" aria-labelledby="hero-heading">
      <div className="content hero-inner">
        <div className="hero-copy">
          <h1 id="hero-heading" className="hero-title">
            {t.hero.title}
          </h1>
          <p className="hero-subtitle">
            {t.hero.subtitle}
          </p>
          <div className="hero-actions">
            <a href="#waitlist" className="button button-primary">{t.hero.primaryCta}</a>
            <a href="mailto:hello@echovault-ai.com" className="button button-secondary">
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
          <div className="hero-card">
            <div className="hero-avatar" />
            <div className="hero-lines">
              <span />
              <span />
              <span />
            </div>
            <p className="hero-caption">
              {t.hero.visualCaption}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
