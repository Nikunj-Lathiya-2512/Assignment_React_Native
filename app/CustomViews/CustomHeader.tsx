// CustomHeader.tsx
import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "react-native-vector-icons";

interface CustomHeaderProps {
  title?: string; // Title of the header
  showBackButton?: boolean; // Whether to show the back button
  showSettingIcon?:boolean; // Wheather to show the Setting Icon
  onSettingsPress?: () => void; // Settings button press handler
}

const CustomHeader: React.FC<CustomHeaderProps> = ({
  title = "",
  showBackButton = true,
  showSettingIcon=true,
  onSettingsPress,
}) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {showBackButton && (
        <TouchableOpacity
          onPress={handleBackPress}
          style={styles.iconContainer}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
      )}

      {/* Title */}
      <Text style={styles.title}>{title}</Text>

      {/* Settings Button */}
      {showSettingIcon ? (
        <TouchableOpacity
          onPress={onSettingsPress}
          style={styles.iconContainer}
        >
          <Ionicons name="settings" size={24} color="black" />
        </TouchableOpacity>
      ):
      <View style={{width:'10%'}} />
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 0,
    height: 60, // Set the height of the header
    backgroundColor: "white",
    elevation: 5, // Adds shadow for Android
    shadowOffset: { width: 0, height: 2 }, // iOS shadow
    shadowOpacity: 0.8, // iOS shadow opacity
    shadowRadius: 2, // iOS shadow radius
  },
  iconContainer: {
    padding: 10,
  },
  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default CustomHeader;
