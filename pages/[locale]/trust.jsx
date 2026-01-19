import TrustPage from "../trust";
import { NON_DEFAULT_LOCALES, normalizeLocale } from "@config/i18n";

export default TrustPage;

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

