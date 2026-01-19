import StoragePage from "../storage";
import { NON_DEFAULT_LOCALES, normalizeLocale } from "@config/i18n";

export default StoragePage;

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

