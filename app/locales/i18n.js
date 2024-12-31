import * as Localization from "expo-localization";

import i18next from "i18next";
// Import translations
import en from "./en.json";
import yi from "./yi.json";

// Set up translations
i18next.translations = {
  en,
  yi,
};

// Set the default language (fallback) and detect device language
i18next.fallbacks = true;
i18next.Locales = Localization.getLocales();

export default i18next;
