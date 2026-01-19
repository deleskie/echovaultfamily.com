import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { useI18n } from "./I18nProvider";
import {
  getLocaleConfig,
  isLocalizedPath,
  localizeHashLink,
  localizePath,
  stripLocaleFromPath,
  SUPPORTED_LOCALES,
  swapLocaleInPath
} from "@config/i18n";

export default function Layout({ children }) {
  const router = useRouter();
  const { locale, t } = useI18n();
  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);

  const localized = (path) => localizePath(locale, path);

  const basePath = stripLocaleFromPath(router.asPath).split(/[?#]/)[0] || "/";
  const canTranslateThisRoute = isLocalizedPath(basePath);

  const languageLinks = SUPPORTED_LOCALES.map((targetLocale) => {
    const href = canTranslateThisRoute
      ? swapLocaleInPath(router.asPath, targetLocale)
      : localizePath(targetLocale, "/");
    return {
      locale: targetLocale,
      label: getLocaleConfig(targetLocale).label,
      href,
      active: targetLocale === locale
    };
  });

  useEffect(() => {
    const closeMenus = () => {
      setLanguageMenuOpen(false);
    };

    router.events.on("routeChangeStart", closeMenus);
    return () => {
      router.events.off("routeChangeStart", closeMenus);
    };
  }, [router.events]);

  return (
    <div className="site">
      <header className="site-header">
        <div className="content header-inner">
          <Link href={localized("/")} className="logo-group" aria-label="EchoVault">
            <div className="logo-mark" aria-hidden="true">
              <Image src="/echovault-mark.svg" alt="" width={24} height={24} priority />
            </div>
            <div>
              <div className="logo">EchoVault</div>
              <span className="logo-tagline">{t.layout.logoTagline}</span>
            </div>
          </Link>
          <nav className="nav" aria-label="Primary">
            <Link href={localized("/pricing")}>{t.layout.nav.pricing}</Link>
            <Link href={localized("/storage")}>{t.layout.nav.storage}</Link>
            <Link href={localized("/photo-restoration")}>{t.layout.nav.photoCare}</Link>
            <Link href={localized("/how-it-works")}>{t.layout.nav.howItWorks}</Link>
            <Link href={localized("/blog")}>{t.layout.nav.blog}</Link>
          </nav>
          <div className="header-actions">
            <ThemeToggle />
            <details
              className="lang-menu"
              open={languageMenuOpen}
              onToggle={(event) => setLanguageMenuOpen(event.currentTarget.open)}
            >
              <summary className="lang-menu-trigger" aria-label="Language">
                <span className="lang-menu-icon" aria-hidden="true">
                  🌐
                </span>
                <span className="lang-menu-current">{getLocaleConfig(locale).label}</span>
                <span className="lang-menu-caret" aria-hidden="true">
                  ▾
                </span>
              </summary>
              <div className="lang-menu-panel">
                {languageLinks.map((link) =>
                  link.active ? (
                    <span
                      key={link.locale}
                      className="lang-menu-item is-active"
                      aria-current="true"
                    >
                      {link.label}
                    </span>
                  ) : (
                    <Link
                      key={link.locale}
                      href={link.href}
                      className="lang-menu-item"
                      onClick={() => setLanguageMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )
                )}
              </div>
            </details>
            <a
              href="mailto:hello@echovault-ai.com"
              className="header-talk-link"
            >
              {t.layout.actions.talkHuman}
            </a>
            <Link
              href={localizeHashLink(locale, "#waitlist")}
              className="button button-primary header-cta-button"
            >
              {t.layout.actions.joinWaitlist}
            </Link>
          </div>
        </div>
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="content footer-inner footer-grid">
          <div className="footer-column">
            <div className="footer-brand">EchoVault</div>
            <p className="footer-note">
              {t.layout.footer.note}
            </p>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">{t.layout.footer.navigate}</h4>
            <ul className="footer-nav">
              <li>
                <Link href={localized("/")}>{t.layout.nav.home}</Link>
              </li>
              <li>
                <Link href={localized("/how-it-works")}>{t.layout.nav.howItWorks}</Link>
              </li>
              <li>
                <Link href={localized("/pricing")}>{t.layout.nav.pricing}</Link>
              </li>
              <li>
                <Link href={localized("/storage")}>{t.layout.nav.storage}</Link>
              </li>
              <li>
                <Link href={localized("/photo-restoration")}>{t.layout.nav.photoCare}</Link>
              </li>
              <li>
                <Link href={localized("/blog")}>{t.layout.nav.blog}</Link>
              </li>
            </ul>
          </div>
          <div className="footer-column">
            <h4 className="footer-heading">{t.layout.footer.legal}</h4>
            <ul className="footer-nav">
              <li>
                <Link href={`${localized("/legal")}#terms`}>{t.layout.footer.terms}</Link>
              </li>
              <li>
                <Link href={`${localized("/legal")}#privacy`}>{t.layout.footer.privacy}</Link>
              </li>
              <li>
                <Link href={localized("/trust")}>{t.layout.footer.trust}</Link>
              </li>
              <li>
                <a href="mailto:hello@echovault-ai.com">{t.layout.footer.contact}</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
