import "../styles/globals.css";
import Script from "next/script";
import { useEffect } from "react";
import { useRouter } from "next/router";
import { I18nProvider } from "@components/I18nProvider";
import { getLocaleFromPath } from "@config/i18n";
import { GA_LINKER_DOMAINS, GA_MEASUREMENT_ID, pageview } from "@lib/gtag";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const queryLocale = Array.isArray(router.query?.locale)
    ? router.query.locale[0]
    : router.query?.locale;
  const locale = pageProps?.locale || queryLocale || getLocaleFromPath(router.asPath);

  useEffect(() => {
    const handleRouteChange = (url) => {
      pageview(url);
    };

    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            linker: {
              domains: ${JSON.stringify(GA_LINKER_DOMAINS)}
            }
          });
        `}
      </Script>
      <I18nProvider locale={locale}>
        <Component {...pageProps} />
      </I18nProvider>
    </>
  );
}
