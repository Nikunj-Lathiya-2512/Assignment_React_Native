import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "@/app/Context/ThemeContext";

// Import necessary functions from Firebase v9+
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig, firestore } from "../../Services/config";
import { doc, setDoc } from "firebase/firestore";

import Loader from '../../Constant/Loader';

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize app only once
const auth = getAuth(app); // Get the auth instance

type FormData = {
  name: string;
  email: string;
  password: string;
};

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  // Get the current theme from the context
  const { theme } = useContext(ThemeContext);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    console.log("Form Data Submitted:", data);

    const { name, email, password } = data; // Destructure form data

    console.log('Data--->',JSON.stringify(data))

    try {
      // Create user with email and password using Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log("User Registered Successfully:", userCredential.user);

      // Get the user ID from the created user
      const userId = userCredential.user.uid;

      // Reference to the Firestore 'users' collection and save user data
      const userDocRef = doc(firestore, "users", userId); // Use Firestore's 'doc' to create a new document

      await setDoc(userDocRef, {
        name: name, // Store the name
        email: email, // Store the email
        password: password, // WARNING: Storing passwords as plain text is a security risk! Encrypt this in a real app.
        createdAt: new Date().toISOString(), // Timestamp for user creation
      });

      console.log("User details successfully stored in Firestore!");

      // Navigate to LoginScreen after successful registration
      navigation.navigate("LoginScreen");

      setLoading(false); // Stop the loading indicator
    } catch (error: any) {
      console.error("Error during registration:", error.message);
      setLoading(false); // Stop the loading indicator
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
      {errors.password && (
        <Text style={styles.error}>{errors.password.message}</Text>
      )}

      {/* Submit Button */}
      <Button title="Register" onPress={handleSubmit(onSubmit)} />

      {/* Navigation to Login screen */}
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={styles.loginText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
};

// Light theme styles
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

export default RegisterScreen;
