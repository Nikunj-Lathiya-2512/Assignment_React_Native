import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "@/app/Context/ThemeContext";

import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firebaseConfig, firestore } from "../../Services/config";
import { doc, setDoc } from "firebase/firestore";
import Loader from "../../Constant/Loader";
import { LanguageContext } from "../../Context/LanguageConetext";
import { translations } from "../../locales/language";

// Import styles
import lightStyles from "../../CommonStyles/lightStyles";
import darkStyles from "../../CommonStyles/darkStyles";

// Initialize Firebase (ensure singleton)
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterScreen = () => {
  const { language } = useContext(LanguageContext) || {};
  const t = translations[language]; // Get translations for the current language

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (data: FormData) => {
    setLoading(true);

    const { name, email, password } = data;

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName: name });

      // Save user details in Firestore
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);
      await setDoc(userDocRef, {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      navigation.navigate("LoginScreen");
    } catch (error: any) {
      Alert.alert("", t.errorMessage || error.message);
    } finally {
      setLoading(false);
    }
  };

  // Dynamically use styles based on the theme
  const styles = theme === "light" ? lightStyles : darkStyles;

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>{t.register}</Text>

      {loading && <Loader />}

      <Controller
        control={control}
        name="name"
        rules={{ required: t.nameRequired }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
          placeholder={t.name}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[
              styles.input,
              { textAlign: language === "en" ? "left" : "right" },
            ]}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

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
            placeholder={t.email}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[
              styles.input,
              { textAlign: language === "en" ? "left" : "right" },
            ]}
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
            placeholder={t.password}
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={[
              styles.input,
              { textAlign: language === "en" ? "left" : "right" },
            ]}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      <Button title={t.register} onPress={handleSubmit(onSubmit)} />

      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>{t.alreadyHaveAccount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
