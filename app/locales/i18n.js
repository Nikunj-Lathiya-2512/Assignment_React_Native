import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

// Initialize i18n
i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: "en", // Default language
    debug: true, // Enable debug mode
    resources: {
      en: require("./en.json"),
      yi: require("./yi.json"),
    },
  });

export default i18n;
