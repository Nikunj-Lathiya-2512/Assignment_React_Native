import React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import SplashScreen from './Screens/Splash/SplashScreen'
import LoginScreen from './Screens/Login/LoginScreen'
import RegisterScreen from "./Screens/Register/RegisterScreen";

import UserListScreen from './Screens/UserList/UserListScreen';
import ConversationHistoryScreen from './Screens/ConversasionHistory/ConversationHistoryScreen'
import SettingsScreen from './Screens/Settings/SettingsScreen'
import { ThemeProvider } from "./Context/ThemeContext";
import { LanguageProvider } from "./Context/LanguageConetext";
import { I18nextProvider } from "react-i18next";
import { UserProvider } from "./Context/UserContext";
import i18n from "././locales/i18n";
import NotificationHandler from '././Handler/NotificationHandler'
import { Provider } from "react-redux";
import {store} from '../app/Redux/store'
import { persistor } from "../app/Redux/store";
import { PersistGate } from "redux-persist/integration/react";

const Stack = createStackNavigator();

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <I18nextProvider i18n={i18n}>
          <LanguageProvider>
            <UserProvider>
              <ThemeProvider>
                <LanguageProvider>
                  <NotificationHandler />
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
        </I18nextProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
