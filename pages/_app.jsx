import "../styles/globals.css";
import { useRouter } from "next/router";
import { I18nProvider } from "@components/I18nProvider";
import { getLocaleFromPath } from "@config/i18n";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const queryLocale = Array.isArray(router.query?.locale)
    ? router.query.locale[0]
    : router.query?.locale;
  const locale = pageProps?.locale || queryLocale || getLocaleFromPath(router.asPath);

  return (
    <I18nProvider locale={locale}>
      <Component {...pageProps} />
    </I18nProvider>
  );
}
