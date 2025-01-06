import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { login } from "../../Redux/slices/authSlice"; // Redux action
import * as SecureStore from "expo-secure-store";
import Loader from "../../Constant/Loader";
import { ThemeContext } from "@/app/Context/ThemeContext";
import { LanguageContext } from "../../Context/LanguageConetext";
import { translations } from "../../locales/language";

// Import styles
import lightStyles from "../../CommonStyles/lightStyles";
import darkStyles from "../../CommonStyles/darkStyles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/app/Services/config";

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
  const { language } = useContext(LanguageContext) || {};
  const t = translations[language]; // Fetch the translations based on current language
  const { theme } = useContext(ThemeContext); // Get current theme from context
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch(); // Initialize Redux dispatcher

  // Dynamically set styles based on theme
  const styles = theme === "light" ? lightStyles : darkStyles;

  // Handle form submission for login
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const { email, password } = data;

    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      const token = await userCredential.user.getIdToken();

      // Store token in SecureStore and Redux state
      await SecureStore.setItemAsync("userToken", token);
      dispatch(login({ email, token })); // Dispatch Redux action to store user state

      navigation.navigate("UserListScreen"); // Navigate to the next screen after successful login
    } catch (error: any) {
      Alert.alert("", t.errorMessage || error.message); // Show error alert if login fails
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
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            placeholder={t.email}
            style={[
              styles.input,
              { textAlign: language === "en" ? "left" : "right" },
            ]}
            error={!!errors.email} 
            keyboardType="email-address"
          />
        )}
      />
      {errors.email && (
        <Text
          style={[
            styles.error,
            { textAlign: language === "en" ? "left" : "right" },
          ]}
        >
          {errors.email.message}
        </Text>
      )}
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
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[
              styles.input,
              {
                textAlign: language === "en" ? "left" : "right",
              },
            ]}
            secureTextEntry
            placeholder={t.password}
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
