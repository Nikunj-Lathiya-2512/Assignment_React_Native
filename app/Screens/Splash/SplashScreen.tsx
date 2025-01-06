import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { firebaseConfig } from "@/app/Services/config";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import * as SecureStore from "expo-secure-store";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";

// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize app only once
const auth = getAuth(app); // Get the auth instance

const SplashScreen: React.FC = () => {
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);
  const navigation = useNavigation();

  useEffect(() => {
    // Navigate based on authentication status after a 2-second delay
    const timeout = setTimeout(() => {
      if (isAuthenticated) {
        navigation.navigate("UserListScreen"); // Navigate to UserList if authenticated
      } else {
        navigation.navigate("LoginScreen"); // Navigate to Login if not authenticated
      }
    }, 2000); // 2-second delay

    return () => clearTimeout(timeout); // Clean up timeout on component unmount
  }, [isAuthenticated, navigation]);

  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: "red", flex: 1 }}></View>
      {/* Background view for splash screen */}
      <Image
        source={require("../../Assests/splash.png")}
        style={styles.image}
      />
      {/* Display splash image */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "contain",
  },
});

export default SplashScreen;
