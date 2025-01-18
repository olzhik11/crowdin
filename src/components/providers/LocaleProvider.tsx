import {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  useMemo,
} from "react";

export type Language = "en" | "ko";

type LocaleContextProps = {
  locale: Language;
  handleChange: (locale: Language) => void;
};

const LocaleContext = createContext<LocaleContextProps>({
  locale: "en",
  handleChange: () => {},
});

export const useLocaleContext = () => useContext(LocaleContext);

export const LocaleProvider = ({ children }: PropsWithChildren) => {
  const [locale, setLocale] = useState<Language>("en");

  const handleChange = (language: Language) => {
    setLocale(language);
  };

  const value = useMemo<LocaleContextProps>(
    () => ({
      locale,
      handleChange,
    }),
    [locale],
  );

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  );
};
