import i18n from "i18next"; 
import { initReactI18next } from "react-i18next"; 
import LanguageDetector from "i18next-browser-languagedetector"; 

// Initialize i18n
i18n
  .use(LanguageDetector) // Use the language detector plugin to detect the user's language
  .use(initReactI18next) // Use the React integration for i18n
  .init({
    fallbackLng: "en", // Default language in case the detected language is not supported
    debug: true, // Enable debug mode for logging language-related information to the console
    resources: {
      en: require("./en.json"), 
      yi: require("./yi.json"), 
    },
  });

export default i18n; 
