import React, { PropsWithChildren } from "react";
import { IntlProvider, ResolvedIntlConfig } from "react-intl";
import {
  Language,
  useLocaleContext,
} from "@/components/providers/LocaleProvider";

const TranslationsProvider = ({
  translations,
  children,
}: PropsWithChildren<{
  translations: Record<Language, ResolvedIntlConfig["messages"]>;
}>) => {
  const { locale } = useLocaleContext();
  return (
    <IntlProvider
      messages={translations[locale]}
      locale={locale}
      defaultLocale={locale}
    >
      {children}
    </IntlProvider>
  );
};

export default TranslationsProvider;
