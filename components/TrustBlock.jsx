import Link from "next/link";
import { useI18n } from "./I18nProvider";
import { localizePath } from "@config/i18n";

export default function TrustBlock({ headingId }) {
  const { locale, t } = useI18n();

  return (
    <div className="trust-block">
      <div className="trust-block-head">
        <h3 id={headingId} className="trust-block-title">
          {t.trustBlock.title}
        </h3>
        <p className="trust-block-intro">
          {t.trustBlock.intro}
        </p>
      </div>
      <div className="trust-block-columns">
        <div className="trust-block-column">
          <h4 className="trust-block-column-title">{t.trustBlock.plainTitle}</h4>
          <p>
            {t.trustBlock.plainBody}
          </p>
        </div>
        <div className="trust-block-column">
          <h4 className="trust-block-column-title">{t.trustBlock.specsTitle}</h4>
          <p>
            {t.trustBlock.specsBody}
          </p>
        </div>
      </div>
      <p className="trust-block-note">
        {t.trustBlock.note}{" "}
        <Link href={localizePath(locale, "/trust")}>{t.trustBlock.linkText}</Link>
      </p>
    </div>
  );
}
