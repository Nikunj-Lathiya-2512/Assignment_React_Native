import React, { useContext } from "react";
import {
  View,
  Text,
  Button,
  Switch,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { ThemeContext } from "../../Context/ThemeContext";
import { LanguageContext } from "../../Context/LanguageConetext";
import { useNavigation } from "@react-navigation/native";
import { auth } from "@/app/Services/config";
import * as SecureStore from "expo-secure-store";
import CustomHeader from "@/app/CustomViews/CustomHeader";
import i18n from "@/app/i18n";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, setTheme } = useContext(ThemeContext) || {};
  const { language, setLanguage } = useContext(LanguageContext) || {};

  // Change theme
  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };

  // Change language
  const handleLanguageChange = () => {
    const newLanguage = language === "en" ? "yi" : "en";
    setLanguage(newLanguage);
    i18n.locale = newLanguage; // Update i18n locale
  };

  // Confirm logout
  const confirmLogout = () => {
    Alert.alert(i18n.t("confirm_logout"), i18n.t("logout_message"), [
      {
        text: i18n.t("cancel"),
        onPress: () => console.log("Logout cancelled"),
        style: "cancel",
      },
      {
        text: i18n.t("ok"),
        onPress: handleLogout,
      },
    ]);
  };

  // Handle logout
  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await auth.signOut();
      navigation.navigate("LoginScreen");
    } catch (error: any) {
      console.error("Logout Error:", error.message);
    }
  };

  // Determine if the theme is dark
  const isDarkTheme = theme === "dark";

  const themedStyles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "flex-start",
      alignItems: "center",
      padding: 0,
      backgroundColor: isDarkTheme ? "#121212" : "#F5F5F5",
    },
    title: {
      fontSize: 30,
      fontWeight: "bold",
      marginBottom: 30,
      color: isDarkTheme ? "#FFFFFF" : "#000000",
    },
    card: {
      marginTop: 20,
      width: "95%",
      backgroundColor: isDarkTheme ? "#1E1E1E" : "#FFFFFF",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 8,
      elevation: 5,
    },
    cardTitle: {
      fontSize: 20,
      fontWeight: "600",
      marginBottom: 10,
      color: isDarkTheme ? "#FFFFFF" : "#000000",
    },
    cardContent: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    cardText: {
      fontSize: 16,
      color: isDarkTheme ? "#B0B0B0" : "#000000",
    },
    logoutText: {
      color: "red",
      fontWeight: "bold",
    },
  });

  return (
    <View style={themedStyles.container}>
      <CustomHeader
        title={i18n.t("settings")}
        showBackButton={true}
        showSettingIcon={false}
      />

      {/* Theme Setting Card */}
      <View style={themedStyles.card}>
        <Text style={themedStyles.cardTitle}>{i18n.t("theme")}</Text>
        <View style={themedStyles.cardContent}>
          <Text style={themedStyles.cardText}>{i18n.t("select_theme")}</Text>
          <Switch value={isDarkTheme} onValueChange={handleThemeChange} />
        </View>
      </View>

      {/* Language Setting Card */}
      <View style={themedStyles.card}>
        <Text style={themedStyles.cardTitle}>{i18n.t("language")}</Text>
        <View style={themedStyles.cardContent}>
          <Text style={themedStyles.cardText}>{i18n.t("select_language")}</Text>
          <Button
            title={
              language === "en"
                ? i18n.t("change_to_yiddish")
                : i18n.t("change_to_english")
            }
            onPress={handleLanguageChange}
            color={isDarkTheme ? "#1E90FF" : "#007BFF"}
          />
        </View>
      </View>

      {/* Logout Card */}
      <View style={themedStyles.card}>
        <TouchableOpacity onPress={confirmLogout}>
          <Text style={[themedStyles.cardText, themedStyles.logoutText]}>
            {i18n.t("logout")}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;