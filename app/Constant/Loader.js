import React from "react";
import { View, StyleSheet } from "react-native";
import LottieView from "lottie-react-native";

const Loader = () => {
  return (
    <View style={styles.overlay}>
      <LottieView
        source={require("../Assests/loader.json")} // Path to your Lottie file
        autoPlay
        loop
        style={styles.animation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject, // Makes the loader fill the entire screen
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background for the blur effect
    justifyContent: "center",
    alignItems: "center",
    zIndex: 100, // Ensure it appears above all other components
  },
  animation: {
    width: 150,
    height: 150,
  },
});

export default Loader;
