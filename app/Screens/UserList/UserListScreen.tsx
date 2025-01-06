import React, { useEffect, useState, useContext } from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { firestore, auth } from "../../Services/config";
import { collection, getDocs } from "firebase/firestore";
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
    // Fetch users from Firestore when component mounts
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const loggedInUserEmail = auth.currentUser?.email;
        const usersCollection = collection(firestore, "users");
        const userSnapshot = await getDocs(usersCollection);

        if (userSnapshot) {
          const userList = userSnapshot.docs
            .map((doc) => ({
              id: doc.id,
              name: doc.data().name || "Name", // Fallback in case name is not provided
              email: doc.data().email || "Email", // Fallback in case email is not provided
            }))
            .filter((user) => user.email !== loggedInUserEmail); // Exclude the current logged-in user from the list
          setUsers(userList);
        } else {
          setUsers([]); // Set an empty list if no users are found
        }
      } catch (error) {
        setUsers([]); // In case of error, set an empty list of users
      } finally {
        setLoading(false); // Stop loading indicator after fetching users
      }
    };

    fetchUsers(); // Fetch the users when the component is mounted
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
