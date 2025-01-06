import React, { createContext, useState, ReactNode, useEffect } from "react";
import { I18nManager } from "react-native"; // For handling RTL (Right-to-Left) language settings
import * as SecureStore from "expo-secure-store"; // For securely storing the language setting across app restarts

// Define the type of context for the language settings
interface LanguageContextType {
  language: string; // Current language in use
  setLanguage: (language: string) => void; // Function to update the language
}

// Create a context with an initial undefined state (will be provided later)
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

// Props type for the LanguageProvider component, which wraps the entire app
interface LanguageProviderProps {
  children: ReactNode; // Children components that will use the LanguageContext
}

// The LanguageProvider component, which wraps its children and provides language settings
export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  // State to hold the current language, default is 'en' (English)
  const [language, setLanguage] = useState<string>("en");

  useEffect(() => {
    // Effect to load the saved language from SecureStore on initial render
    const loadLanguage = async () => {
      // Retrieve the saved language from SecureStore (it persists across app restarts)
      const savedLanguage = await SecureStore.getItemAsync("language");

      // If there's a saved language, set it to the state
      if (savedLanguage) {
        setLanguage(savedLanguage);

        // If the language is "yi" (Yiddish), enforce RTL layout
        if (savedLanguage == "yi") {
          I18nManager.allowRTL(true); // Allow RTL support
          I18nManager.forceRTL(true); // Force RTL layout for the entire app
        } else {
          I18nManager.allowRTL(false); // Disable RTL for non-"yi" languages
          I18nManager.forceRTL(false); // Set app to default LTR (Left-to-Right) layout
        }
      }
    };

    loadLanguage(); // Load saved language when component mounts
  }, []); // Empty dependency array ensures this runs only once, when the component first mounts

  useEffect(() => {
    // Effect that runs every time the language changes
    const isRTL = language === "yi"; // Check if the language is "yi" (Yiddish)

    // If the current language is different from the RTL setting, update I18nManager
    if (I18nManager.isRTL !== isRTL) {
      I18nManager.allowRTL(isRTL); // Allow RTL if language is "yi"
      I18nManager.forceRTL(isRTL); // Force RTL if language is "yi"
    }
  }, [language]); // Run this effect whenever the 'language' state changes

  return (
    // Provide the current language and setLanguage function to the context for usage in other components
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children} 
    </LanguageContext.Provider>
  );
};
