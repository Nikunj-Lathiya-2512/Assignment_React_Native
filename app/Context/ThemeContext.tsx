import React, { createContext, useState, ReactNode, useEffect } from "react";
import * as SecureStore from "expo-secure-store"; // For securely storing the theme setting across app restarts

// Define the types for the theme context
interface ThemeContextType {
  theme: string; // The current theme (e.g., "light" or "dark")
  setTheme: (theme: string) => void; // Function to update the theme
}

// Create the context with a default value (you can set your default theme, "light" in this case)
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

interface ThemeProviderProps {
  children: ReactNode; // Children components that will consume the ThemeContext
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Set up state for theme with a default value of "light"
  const [theme, setTheme] = useState<string>("light");

  useEffect(() => {
    // Effect to load the saved theme from SecureStore when the component mounts
    const loadTheme = async () => {
      // Retrieve the saved theme from SecureStore (it persists across app restarts)
      const savedTheme = await SecureStore.getItemAsync("theme");
      // If a theme is found in storage, update the state with the saved theme
      if (savedTheme) {
        setTheme(savedTheme);
      }
    };

    loadTheme(); // Run the theme loading function when the component mounts
  }, []); // Empty dependency array ensures this runs only once, when the component first mounts

  return (
    // Provide the current theme and setTheme function to the context for usage in other components
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children} 
    </ThemeContext.Provider>
  );
};
