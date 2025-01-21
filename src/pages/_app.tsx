import "@/styles/globals.css";
import type { AppProps } from "next/app";
import translations from "../locale/home";
import {
  Language,
  LocaleProvider,
} from "@/components/providers/LocaleProvider";
import TranslationsProvider from "@/components/providers/TranslationsProvider";
import OtaClient from "@crowdin/ota-client";
import { getTranslations } from "@/utils";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }: AppProps) {
  const client = new OtaClient(process.env.NEXT_PUBLIC_DISTRIBUTION_HASH!);

  const [strings, setStrings] = useState<
    Record<Language, Record<string, string>>
  >({
    ko: {},
    en: {},
  });

  useEffect(() => {
    getTranslations(client, translations).then((translations) => {
      setStrings({ ...translations, en: translations.en });
    });
  }, []);

  return (
    <LocaleProvider>
      <TranslationsProvider translations={strings}>
        <Component {...pageProps} />
      </TranslationsProvider>
    </LocaleProvider>
  );
}
