import localFont from "next/font/local";
import { useIntl } from "react-intl";
import {
  Language,
  useLocaleContext,
} from "@/components/providers/LocaleProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

const languages: Language[] = ["en", "ko"];

export default function Home() {
  const { formatMessage } = useIntl();
  const { handleChange } = useLocaleContext();
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1>{formatMessage({ id: "title" })}</h1>
        <h5>{formatMessage({ id: "description" })}</h5>
        <select
          className="bg-background"
          onChange={(e) => handleChange(e.target.value as Language)}
        >
          {languages.map((language) => (
            <option className="cursor-pointer" key={language} value={language}>
              {language}
            </option>
          ))}
        </select>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center"></footer>
    </div>
  );
}
