import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  TouchableOpacity,
  Alert,
  I18nManager,
} from "react-native";
import { ThemeContext } from "../../Context/ThemeContext";
import { LanguageContext } from "../../Context/LanguageConetext";
import { useNavigation } from "@react-navigation/native";
import { auth, firestore } from "@/app/Services/config";
import * as SecureStore from "expo-secure-store";
import CustomHeader from "@/app/CustomViews/CustomHeader";
import { translations } from "../../locales/language";
import * as Updates from "expo-updates";

import lightStyles from "../../CommonStyles/lightStyles";
import darkStyles from "../../CommonStyles/darkStyles";
import { useDispatch } from "react-redux";
import { logout } from "@/app/Redux/slices/authSlice";
import { doc, updateDoc } from "firebase/firestore";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, setTheme } = useContext(ThemeContext) || {};
  const { language, setLanguage } = useContext(LanguageContext) || {};
  const t = translations[language];

  const isDarkTheme = theme === "dark"; // Check if the current theme is dark
  const styles = isDarkTheme ? darkStyles : lightStyles; // Dynamically switch styles based on theme
  const dispatch = useDispatch();

  const handleThemeChange = async () => {
    const newTheme = theme === "light" ? "dark" : "light"; // Toggle between light and dark themes
    setTheme(newTheme);
    await SecureStore.setItemAsync("theme", newTheme); // Store theme preference in SecureStore
  };

  useEffect(() => {
    // Empty useEffect hook for future potential side effects or cleanup
  }, []);

  useEffect(() => {}, []);

  const updateUserStatus = async (status: string) => {
    try {
      const currentUser = auth.currentUser;
      if (currentUser) {
        const userDocRef = doc(firestore, "users", currentUser.uid);
        await updateDoc(userDocRef, { status }); // Update the status field in Firestore
      }
    } catch (error) {
      console.error("Error updating user status:", error);
    }
  };
  // Set the current user's status to "online" when the component mounts

  const handleLanguageChange = async () => {
    const newLanguage = language === "en" ? "yi" : "en"; // Toggle between English and Yiddish
    setLanguage(newLanguage);
    await SecureStore.setItemAsync("language", newLanguage); // Store language preference in SecureStore
  };

  const confirmLogout = () => {
    Alert.alert(t.confirmLogout, t.logoutMessage, [
      {
        text: t.cancel,
        style: "cancel",
      },
      {
        text: t.ok,
        onPress: handleLogout, // Logout action when OK is pressed
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      updateUserStatus("offline");

      // Remove token from SecureStorage and dispatch logout action
      await SecureStore.deleteItemAsync("userToken");
      dispatch(logout());

      // Navigate to LoginScreen after successful logout
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error during logout:", error); // Log any errors during logout
    }
  };

  return (
    <View style={styles.container}>
      <CustomHeader
        title={t.settings}
        showBackButton={true}
        showSettingIcon={false}
      />

      <View style={styles.card}>
        <Text
          style={[
            styles.cardTitle,
            { textAlign: language === "en" ? "left" : "right" },
          ]}
        >
          {t.theme}
        </Text>
        <View
          style={[
            styles.cardContent,
            { flexDirection: language === "en" ? "row" : "row-reverse" },
          ]}
        >
          <Text style={styles.cardText}>{t.selectTheme}</Text>
          <Switch value={isDarkTheme} onValueChange={handleThemeChange} />
        </View>
      </View>

      <View style={[styles.card]}>
        <Text
          style={[
            styles.cardTitle,
            { textAlign: language === "en" ? "left" : "right" },
          ]}
        >
          {t.language}
        </Text>
        <View
          style={[
            styles.cardContent,
            { flexDirection: language === "en" ? "row" : "row-reverse" },
          ]}
        >
          <Text style={styles.cardText}>{t.selectLanguage}</Text>
          <Button
            title={language === "en" ? t.changeToYiddish : t.changeToEnglish}
            onPress={handleLanguageChange} // Trigger language change when button is pressed
            color={isDarkTheme ? "#1E90FF" : "#007BFF"} // Use different color for button based on theme
          />
        </View>
      </View>

      <View
        style={[
          styles.card,
          { flexDirection: language === "en" ? "row" : "row-reverse" },
        ]}
      >
        <TouchableOpacity onPress={confirmLogout}>
          <Text style={[styles.cardText, styles.logoutText]}>{t.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
