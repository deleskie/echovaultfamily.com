import Link from "next/link";
import { useI18n } from "./I18nProvider";
import { localizePath } from "@config/i18n";

export default function TierPreview() {
  const { locale, t } = useI18n();

  return (
    <section className="section section-muted" aria-labelledby="tiers-heading">
      <div className="content">
        <h2 id="tiers-heading" className="section-title">
          {t.tierPreview.heading}
        </h2>
        <p className="lead">
          {t.tierPreview.lead}
        </p>
        <div className="grid">
          {t.tierPreview.cards.map((card) => (
            <div key={card.title} className="card">
              <h3>{card.title}</h3>
              {card.extra && (
                <p>
                  <strong>{card.extra.label}</strong> {card.extra.text}
                </p>
              )}
              <p>{card.body}</p>
              <p>
                <strong>{card.bestForLabel}</strong> {card.bestFor}
              </p>
            </div>
          ))}
        </div>
        <div className="section-cta">
          <Link href={localizePath(locale, "/pricing")} className="button button-primary">
            {t.tierPreview.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
