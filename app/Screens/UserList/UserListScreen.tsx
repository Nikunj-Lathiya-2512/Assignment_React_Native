import React, { useEffect, useState, useContext } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { firestore, auth } from "../../Services/config";
import { collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import CustomHeader from "@/app/CustomViews/CustomHeader";
import Loader from "@/app/Constant/Loader";
import { ThemeContext } from "../../Context/ThemeContext";
import { translations } from "../../locales/language";
import { LanguageContext } from "@/app/Context/LanguageConetext";

import lightStyles from "../../CommonStyles/lightStyles";
import darkStyles from "../../CommonStyles/darkStyles";

interface User {
  id: string;
  name: string;
  email: string;
  status: string; // Add a status field to track user online/offline status
}

const UserListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext) || {};
  const { language } = useContext(LanguageContext) || {};
  const t = translations[language];

  const styles = theme === "dark" ? darkStyles : lightStyles; // Apply dynamic styles based on the current theme

  useEffect(() => {
    const updateUserStatus = async (status: string) => {
      try {
        const currentUser = auth.currentUser;
        if (currentUser) {
          const userDocRef = doc(firestore, "users", currentUser.uid);
          await updateDoc(userDocRef, { status }); // Update the status field in Firestore
        }
      } catch (error) {
        console.error("Error updating user status:", error);
      }
    };

    // Set the current user's status to "online" when the component mounts
    updateUserStatus("online");

    // Cleanup function to set the user's status to "offline" when the component unmounts
    return () => {
      // Wait for the status to be set to "offline" before the component unmounts
      updateUserStatus("offline");
    };
  }, []);

  useEffect(() => {
    // Listen for changes in the "users" collection in real-time
    const usersCollectionRef = collection(firestore, "users");
    const unsubscribe = onSnapshot(
      usersCollectionRef,
      (snapshot) => {
        const loggedInUserEmail = auth.currentUser?.email;

        const userList = snapshot.docs
          .map((doc) => ({
            id: doc.id,
            name: doc.data().name || "Name", // Fallback in case name is not provided
            email: doc.data().email || "Email", // Fallback in case email is not provided
            status: doc.data().status || "offline", // Default to offline if status is not provided
          }))
          .filter((user) => user.email !== loggedInUserEmail); // Exclude the logged-in user from the list

        setUsers(userList); // Update the user list in state
      },
      (error) => {
        console.error("Error listening to user status updates:", error);
      }
    );

    // Cleanup the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("ConversationHistoryScreen", {
          userName: item.name,
          userEmail: item.email, // Pass user details to the next screen
        })
      }
    >
      <Card style={styles.listCard}>
        <Card.Content>
          <Text
            style={[
              styles.listCardTitle,
              { textAlign: language === "en" ? "left" : "right" },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.cardSubtitle,
              { textAlign: language === "en" ? "left" : "right" },
            ]}
          >
            {item.email}
          </Text>
          <Text
            style={[
              styles.statusText,
              {
                color: item.status === "online" ? "green" : "red",
                textAlign: language === "en" ? "left" : "right",
              },
            ]}
          >
            {item.status === "online" ? "Online" : "Offline"}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.listContainer}>
      <CustomHeader
        title={t.userListTitle}
        showBackButton={false}
        onSettingsPress={() => {
          navigation.navigate("SettingsScreen");
        }}
      />
      {loading && <Loader />}
      {!loading && !users.length && (
        <Text style={styles.emptyMessage}>{t.noUsersFound}</Text>
      )}
      <FlatList
        data={users || []}
        style={{ paddingTop: 20 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

export default UserListScreen;
