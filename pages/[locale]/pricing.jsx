import PricingPage from "../pricing";
import { NON_DEFAULT_LOCALES, normalizeLocale } from "@config/i18n";

export default PricingPage;

export function getStaticPaths() {
  return {
    paths: NON_DEFAULT_LOCALES.map((locale) => ({ params: { locale } })),
    fallback: false
  };
}

export function getStaticProps({ params }) {
  return {
    props: {
      locale: normalizeLocale(params?.locale)
    }
  };
}

