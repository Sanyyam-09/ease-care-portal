import { useLanguage } from "@/contexts/LanguageContext";
import { t, TranslationKey } from "@/lib/translations";

export const useTranslation = () => {
  const { language } = useLanguage();
  return (key: TranslationKey) => t(key, language.code);
};
