import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from './Screens/Splash/SplashScreen'
import LoginScreen from './Screens/Login/LoginScreen'
import RegisterScreen from "./Screens/Register/RegisterScreen";

import UserListScreen from './Screens/UserList/UserListScreen';
import ConversationHistoryScreen from './Screens/ConversasionHistory/ConversationHistoryScreen'
import SettingsScreen from './Screens/Settings/SettingsScreen'
import { ThemeContext, ThemeProvider } from "./Context/ThemeContext";
import { LanguageProvider } from "./Context/LanguageConetext";

import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import { UserProvider } from "./Context/UserContext";

import NotificationHandler from '././Handler/NotificationHandler'


const Stack = createStackNavigator();

function App() {
  return (
    
    // <I18nextProvider i18n={i18next}>
    <LanguageProvider>
    <UserProvider>
    <ThemeProvider>
      <LanguageProvider>
      <NotificationHandler/>
        <Stack.Navigator
          initialRouteName="SplashScreen"
          options={{ headerShown: false }}
        >
          <Stack.Screen
            name="SplashScreen"
            component={SplashScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />

          <Stack.Screen
            name="UserListScreen"
            component={UserListScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ConversationHistoryScreen"
            component={ConversationHistoryScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SettingsScreen"
            component={SettingsScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </LanguageProvider>
    </ThemeProvider>
    </UserProvider>
    </LanguageProvider>
    // </I18nextProvider>
  );
}

export default App;
