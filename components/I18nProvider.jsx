import { createContext, useContext, useMemo } from "react";
import { getLocaleConfig, getTranslations, normalizeLocale } from "@config/i18n";

const I18nContext = createContext({
  locale: "en",
  localeConfig: getLocaleConfig("en"),
  t: getTranslations("en")
});

export function I18nProvider({ locale, children }) {
  const safeLocale = normalizeLocale(locale);
  const localeConfig = getLocaleConfig(safeLocale);
  const t = getTranslations(safeLocale);

  const value = useMemo(
    () => ({
      locale: safeLocale,
      localeConfig,
      t
    }),
    [safeLocale, localeConfig, t]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  return useContext(I18nContext);
}

