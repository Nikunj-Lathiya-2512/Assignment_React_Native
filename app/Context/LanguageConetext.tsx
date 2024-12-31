import React, { createContext, useState, ReactNode } from "react";
// import i18next from "i18next";

interface LanguageContextType {
  language: string;
  setLanguage: (language: string) => void;
}


// const switchLanguage = (language: string) => {
  //   i18next.changeLanguage(language);
  //   // setLanguage(language)
  // };
  
  export const LanguageContext = createContext<LanguageContextType | undefined>(
    undefined
  );
  
  interface LanguageProviderProps {
    children: ReactNode;
  }
  
  export const LanguageProvider: React.FC<LanguageProviderProps> = ({
    children,
  }) => {
  const [language, setLanguage] = useState<string>("en"); // default language

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
