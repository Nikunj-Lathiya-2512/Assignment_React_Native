import React, { useContext } from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { LanguageContext } from "../Context/LanguageConetext";
import { ThemeContext } from "../Context/ThemeContext";

// Define props for the custom header component
interface CustomHeaderProps {
  title?: string; // Title to display on the header (optional)
  showBackButton?: boolean; // Flag to control the display of the back button (optional)
  showSettingIcon?: boolean; // Flag to control the display of the settings icon (optional)
  onSettingsPress?: () => void; // Callback function for settings button press (optional)
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = "", // Default title is an empty string if no title is passed
  showBackButton = true, // Default to showing the back button
  showSettingIcon = true, // Default to showing the settings icon
  onSettingsPress,
}) => {
  // Get the navigation prop from React Navigation
  const navigation = useNavigation();

  // Access the language and theme from the context
  const { language } = useContext(LanguageContext) || {};
  const { theme } = useContext(ThemeContext) || { theme: "light" };

  // Function to handle the back button press (go back in navigation stack)
  const handleBackPress = () => {
    navigation.goBack();
  };

  // Define colors based on the current theme
  const backgroundColor = theme === "light" ? "white" : "#333"; // Light theme uses white, dark uses #333
  const textColor = theme === "light" ? "black" : "white"; // Light theme uses black text, dark uses white

  return (
    <View
      style={[
        styles.container, // Apply container styles
        {
          flexDirection: language === "en" ? "row" : "row-reverse", // Adjust layout direction based on language
          backgroundColor, // Set background color based on theme
        },
      ]}
    >
      {/* Back Button: Only show if the 'showBackButton' prop is true */}
      {showBackButton && (
        <TouchableOpacity
          onPress={handleBackPress} // Trigger the back press handler
          style={styles.iconContainer}
        >
          {/* Change the icon based on the language direction */}
          <Ionicons
            name={language === "en" ? "arrow-back" : "arrow-forward"}
            size={24}
            color={textColor} // Text color based on theme
          />
        </TouchableOpacity>
      )}

      {/* Title: Display the title passed as a prop */}
      <Text style={[styles.title, { color: textColor }]}>{title}</Text>

      {/* Settings Button: Only show if the 'showSettingIcon' prop is true */}
      {showSettingIcon ? (
        <TouchableOpacity
          onPress={onSettingsPress} // Trigger the settings button press handler
          style={styles.iconContainer}
        >
          <Ionicons name="settings" size={24} color={textColor} />
        </TouchableOpacity>
      ) : (
        <View style={{ width: "10%" }} /> // Placeholder if settings button is not shown
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between", 
    alignItems: "center", 
    paddingHorizontal: 0, 
    height: 60, 
    elevation: 5, 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.8, // iOS shadow opacity
    shadowRadius: 2, // iOS shadow radius
  },
  iconContainer: {
    padding: 10, // Padding around the icon for clickable area
  },
  title: {
    flex: 1, 
    textAlign: "center", 
    fontSize: 18, 
    fontWeight: "bold", 
  },
});

export default CustomHeader;
