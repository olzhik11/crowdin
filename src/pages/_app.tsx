import "@/styles/globals.css";
import type { AppProps } from "next/app";
import translations from "../locale/home";
import { LocaleProvider } from "@/components/providers/LocaleProvider";
import TranslationsProvider from "@/components/providers/TranslationsProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <LocaleProvider>
      <TranslationsProvider translations={translations}>
        <Component {...pageProps} />
      </TranslationsProvider>
    </LocaleProvider>
  );
}
