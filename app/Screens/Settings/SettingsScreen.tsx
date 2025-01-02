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
import { auth } from "@/app/Services/config";
import * as SecureStore from "expo-secure-store";
import CustomHeader from "@/app/CustomViews/CustomHeader";
import { translations } from "../../locales/language";
import * as Updates from "expo-updates";

import lightStyles from "../../CommonStyles/lightStyles";
import darkStyles from "../../CommonStyles/darkStyles";

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation();
  const { theme, setTheme } = useContext(ThemeContext) || {};
  const { language, setLanguage } = useContext(LanguageContext) || {};
  const t = translations[language];

  const isDarkTheme = theme === "dark";
  const styles = isDarkTheme ? darkStyles : lightStyles;

  const handleThemeChange = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
  };
  const handleLanguageChange = async () => {

    const newLanguage = language === "en" ? "yi" : "en";
              setLanguage(newLanguage)
               await SecureStore.setItemAsync("language", newLanguage);

      // Alert.alert(
      //   t.appRestart,
      //   t.restartMessage,
      //   [
      //     {
      //       text: t.restartNow,
      //       onPress: async () => {
      //         const newLanguage = language === "en" ? "yi" : "en";
      //         setLanguage(newLanguage)
      //          await SecureStore.setItemAsync("language", newLanguage);
      //         await Updates.reloadAsync(); // Reload the app to apply RTL changes
      //       },
      //     },
      //     {
      //       text: t.cancel,
      //       style: "cancel",
      //     },
      //   ],
      //   { cancelable: false }
      // );
  };

  const confirmLogout = () => {
    Alert.alert(t.confirmLogout, t.logoutMessage, [
      {
        text: t.cancel,
        style: "cancel",
      },
      {
        text: t.ok,
        onPress: handleLogout,
      },
    ]);
  };

  const handleLogout = async () => {
    try {
      await SecureStore.deleteItemAsync("userToken");
      await auth.signOut();
      navigation.navigate("LoginScreen");
    } catch (error: any) {
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
        <Text style={styles.cardTitle}>{t.theme}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{t.selectTheme}</Text>
          <Switch value={isDarkTheme} onValueChange={handleThemeChange} />
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>{t.language}</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>{t.selectLanguage}</Text>
          <Button
            title={language === "en" ? t.changeToYiddish : t.changeToEnglish}
            onPress={handleLanguageChange}
            color={isDarkTheme ? "#1E90FF" : "#007BFF"}
          />
        </View>
      </View>

      <View style={styles.card}>
        <TouchableOpacity onPress={confirmLogout}>
          <Text style={[styles.cardText, styles.logoutText]}>{t.logout}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SettingsScreen;
