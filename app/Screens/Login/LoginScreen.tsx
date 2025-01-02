import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "@/app/Context/ThemeContext";

// Firebase imports
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "../../Services/config";
import { initializeApp } from "firebase/app";
import * as SecureStore from "expo-secure-store";
import Loader from "../../Constant/Loader";
import { LanguageContext } from "../../Context/LanguageConetext";
import { translations } from "../../locales/language";

// Import styles
import lightStyles from "../../CommonStyles/lightStyles";
import darkStyles from "../../CommonStyles/darkStyles";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { language } = useContext(LanguageContext) || {};
  const t = translations[language];
  const { theme } = useContext(ThemeContext); // Get current theme from context
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Dynamically set styles based on theme
  const styles = theme === "light" ? lightStyles : darkStyles;

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { email, password } = data;

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      const token = await userCredential.user.getIdToken();
      await SecureStore.setItemAsync("userToken", token);

      navigation.navigate("UserListScreen");
    } catch (error: any) {
      Alert.alert("", t.errorMessage || error.message);
      setLoading(false);
    }
  };

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>{t.login}</Text>
      {loading && <Loader />}
      <Controller
        control={control}
        name="email"
        rules={{
          required: t.emailRequired,
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: t.invalidEmailFormat,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={t.email}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.input}
            error={!!errors.email}
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && <Text style={styles.error}>{errors.email.message}</Text>}
      <Controller
        control={control}
        name="password"
        rules={{
          required: t.passwordRequired,
          minLength: {
            value: 6,
            message: t.passwordMinLength,
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label={t.password}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.input}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}
      <Button
        title={t.login}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
      >
        <Text style={styles.registerText}>{t.dontHaveAccount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
