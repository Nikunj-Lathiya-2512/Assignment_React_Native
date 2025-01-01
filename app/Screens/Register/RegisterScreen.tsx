import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "@/app/Context/ThemeContext";

import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { firebaseConfig, firestore } from "../../Services/config";
import { doc, setDoc } from "firebase/firestore";

import Loader from '../../Constant/Loader';

// Initialize Firebase (ensure singleton)
const app = initializeApp(firebaseConfig); 
const auth = getAuth(app);

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterScreen = () => {
  const { control, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log("Form Data Submitted:", data);

    const { name, email, password } = data;

    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Update the user's display name
      await updateProfile(user, { displayName: name });

      console.log("User registered successfully:", user);

      // Save user details in Firestore
      const userId = user.uid;
      const userDocRef = doc(firestore, "users", userId);
      await setDoc(userDocRef, {
        name,
        email,
        createdAt: new Date().toISOString(),
      });

      console.log("User details successfully stored in Firestore!");
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error registering user:", error);
    } finally {
      setLoading(false);
    }
  };

  const styles = theme === "light" ? lightStyles : darkStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>

      {loading && <Loader />}

      {/* Name Input */}
      <Controller
        control={control}
        name="name"
        rules={{ required: "Name is required" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Name"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.input}
            error={!!errors.name}
          />
        )}
      />
      {errors.name && <Text style={styles.error}>{errors.name.message}</Text>}

      {/* Email Input */}
      <Controller
        control={control}
        name="email"
        rules={{
          required: "Email is required",
          pattern: {
            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
            message: "Invalid email format",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Email"
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

      {/* Password Input */}
      <Controller
        control={control}
        name="password"
        rules={{
          required: "Password is required",
          minLength: {
            value: 6,
            message: "Password should be at least 6 characters long",
          },
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            label="Password"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            style={styles.input}
            secureTextEntry
            error={!!errors.password}
          />
        )}
      />
      {errors.password && <Text style={styles.error}>{errors.password.message}</Text>}

      {/* Submit Button */}
      <Button title="Register" onPress={handleSubmit(onSubmit)} />

      {/* Navigation to Login screen */}
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};
export default RegisterScreen;

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff", // Light background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000", // Light text color
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9", // Light input background
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "blue",
  },
});

// Dark theme styles
const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#121212", // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // Dark text color
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#333", // Dark input background
    color: "#fff", // Dark input text color
  },
  button: {
    marginTop: 16,
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "#1e90ff", // Blue text for the login link
  },
});