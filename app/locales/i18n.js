import * as Localization from "expo-localization";
import i18n from "i18n-js";

// Import translations
import en from "./en.json";
import yi from "./yi.json";

// Set up translations
i18n.translations = {
  en,
  yi,
};

// Set the default language (fallback) and detect device language
i18n.fallbacks = true;
i18n.locale = Localization.locale;

export default i18n;
