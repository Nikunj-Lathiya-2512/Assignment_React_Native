import React, { createContext, useState, ReactNode } from "react";

// Define the types for the theme context
interface ThemeContextType {
  theme: string;
  setTheme: (theme: string) => void;
}

// Create the context with a default value (you can set your default theme)
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Set up state for theme
  const [theme, setTheme] = useState<string>("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
