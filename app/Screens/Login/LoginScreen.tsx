import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { Controller, useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { ThemeContext } from "@/app/Context/ThemeContext";

// Import necessary Firebase functions
import { getAuth, signInWithEmailAndPassword } from "firebase/auth"; // Firebase v9+ modular import
import { firebaseConfig,firestore} from "../../Services/config"; // Assuming firebaseConfig is exported from your config file
import { initializeApp } from "firebase/app";
import * as SecureStore from "expo-secure-store";
import Loader from "../../Constant/Loader";

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize Firebase app
const auth = getAuth(app); // Get Firebase Auth instance

type FormData = {
  email: string;
  password: string;
};

const LoginScreen = () => {
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
    console.log(data);

    const { email, password } = data;

    try {
      // Use Firebase sign-in method
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setLoading(false);
      const token = await userCredential.user.getIdToken(); // Get the Firebase access token
      await SecureStore.setItemAsync("userToken", token);

      // Store user details in Firestore
      const user = userCredential.user;
      navigation.navigate("UserListScreen");
    } catch (error: any) {
      console.error("Error signing in: ", error.message);
      setLoading(false);
      // Show an error message or handle error accordingly
    }
  };
   
  // Define dynamic styles based on the selected theme
  const styles = theme === "light" ? lightStyles : darkStyles;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>

      {loading && <Loader />}
      
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
      <Button
        title="Login"
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />

      {/* Navigation to Register screen */}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("RegisterScreen");
        }}
      >
        <Text style={styles.registerText}>Don't have an account? Register</Text>
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
    color:'#000'
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  registerText: {
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
    color: "#ffffff", // Dark input text color
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  registerText: {
    marginTop: 10,
    textAlign: "center",
    color: "#1e90ff", // Blue text for the register link
  },
});

export default LoginScreen;
