import { Translations } from "@crowdin/ota-client/out/model";
import { Language } from "@/components/providers/LocaleProvider";
import { merge } from "lodash";
import OtaClient from "@crowdin/ota-client";

const languages: Language[] = ["ko"];

export const parseTsFileContent = (
  tsContent: string,
): Record<string, string> => {
  // remove "export default"
  const rawObjectString = tsContent.replace(/export\s+default\s+/, "").trim();
  const sanitizedString = rawObjectString.replace(/;$/, "").trim();

  // Step 3: Safely parse the object
  let parsedObject;
  try {
    parsedObject = eval(`(${sanitizedString})`); // Wrap in parentheses for eval
  } catch (error) {
    console.error("Failed to parse TypeScript content:", error);
    return {};
  }

  return parsedObject;
};

export const mergeTranslations = (
  translations: Translations,
  localTranslations: Record<Language, Record<string, string>>,
): Record<Language, Record<string, string>> => {
  return languages.reduce<Record<Language, Record<string, string>>>(
    (acc, curr) => {
      const language = translations[curr];
      const rawString: string = language[0].content;
      const parsed = parseTsFileContent(rawString);
      return { ...acc, [curr]: merge(localTranslations[curr], parsed) };
    },
    {
      ko: {},
      en: {},
    },
  );
};

export const getTranslations = async (
  client: OtaClient,
  localTranslations: Record<Language, Record<string, string>>,
) => {
  const translations = await client.getTranslations();

  return mergeTranslations(translations, localTranslations);
};
