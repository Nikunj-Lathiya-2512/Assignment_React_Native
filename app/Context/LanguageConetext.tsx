import React, { createContext, useState, ReactNode, useEffect } from "react";
import { I18nManager } from "react-native";
import * as SecureStore from "expo-secure-store";

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const [language, setLanguage] = useState<string>("en"); 

  useEffect(() => {
    const loadLanguage = async () => {
      // Load the saved language from SecureStore
      const savedLanguage = await SecureStore.getItemAsync("language");
      if (savedLanguage) {
        setLanguage(savedLanguage); 

        if (savedLanguage == "yi") {
          I18nManager.allowRTL(true);
          I18nManager.forceRTL(true);
        } else {
          I18nManager.allowRTL(false);
          I18nManager.forceRTL(false);
        }
      }
    };

    loadLanguage();
  }, []); 

  useEffect(() => {
    const isRTL = language === "yi";
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL);
      I18nManager.forceRTL(isRTL);
    }
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
