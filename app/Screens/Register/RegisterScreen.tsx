import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Button, Alert } from "react-native";
import { useForm } from "react-hook-form";
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

import lightStyles from "../../CommonStyles/lightStyles";
import darkStyles from "../../CommonStyles/darkStyles";
import CustomTextInput from "@/app/CustomViews/CustomTextInput";
import {
  DEFAULT_USER_STATUS,
  FIREBASE_DATA_NAME,
  LIGHT_THEME,
} from "@/app/Constant/Cosntant";

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
      const userDocRef = doc(firestore, FIREBASE_DATA_NAME, userId);
      await setDoc(userDocRef, {
        name,
        email,
        status: DEFAULT_USER_STATUS, // Set a default value, e.g., "offline"
        createdAt: new Date().toISOString(),
      });

      navigation.navigate("LoginScreen"); // Navigate to login screen after registration
    } catch (error: any) {
      Alert.alert("", t.errorMessage || error.message); // Show error message if registration fails
    } finally {
      setLoading(false);
    }
  };

  // Dynamically use styles based on the theme
  const styles = theme === LIGHT_THEME ? lightStyles : darkStyles;

  return (
    <View style={styles.loginContainer}>
      <Text style={styles.title}>{t.register}</Text>
      {loading && <Loader />}

      {/* Name Input */}
      <CustomTextInput
        control={control}
        name="name"
        placeholder={t.name}
        rules={{ required: t.nameRequired }} // Validation rules for name
        errors={errors}
        styles={styles}
        language={language === "en" ? "en" : "yi"}
      />

      {/* Email Input */}
      <CustomTextInput
        control={control}
        name="email"
        placeholder={t.email}
        rules={{
          required: t.emailRequired, // Validation rules for email
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: t.invalidEmailFormat,
          },
        }}
        errors={errors}
        styles={styles}
        language={language === "en" ? "en" : "yi"}
        keyboardType="email-address"
      />

      {/* Password Input */}
      <CustomTextInput
        control={control}
        name="password"
        placeholder={t.password}
        rules={{
          required: t.passwordRequired, // Validation rules for password
          minLength: {
            value: 6,
            message: t.passwordMinLength,
          },
        }}
        errors={errors}
        styles={styles}
        language={language === "en" ? "en" : "yi"}
        secureTextEntry={true}
      />

      {/* Submit Button */}
      <Button title={t.register} onPress={handleSubmit(onSubmit)} />
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>{t.alreadyHaveAccount}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterScreen;
