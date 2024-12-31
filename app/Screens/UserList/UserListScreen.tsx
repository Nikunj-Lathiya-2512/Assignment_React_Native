import React, { useEffect, useState, useContext } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Card } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { firestore, auth } from "../../Services/config"; // Include auth for the logged-in user
import { collection, getDocs } from "firebase/firestore";
import CustomHeader from "@/app/CustomViews/CustomHeader";
import Loader from "@/app/Constant/Loader";
import { ThemeContext } from "../../Context/ThemeContext"; // Theme context import

interface User {
  id: string;
  name: string;
  email: string;
}

const UserListScreen: React.FC = () => {
  const navigation = useNavigation();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext) || {}; // Get the current theme from context
  const isDarkTheme = theme === "dark"; // Determine if the theme is dark

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const loggedInUserEmail = auth.currentUser?.email; // Get the logged-in user's email
        const usersCollection = collection(firestore, "users");
        const userSnapshot = await getDocs(usersCollection);

        if (userSnapshot) {
          const userList = userSnapshot.docs
            .map((doc) => ({
              id: doc.id,
              name: doc.data().name || "Name",
              email: doc.data().email || "Email",
            }))
            .filter((user) => user.email !== loggedInUserEmail); // Exclude the logged-in user

          console.log("Filtered Users:", userList);
          setUsers(userList);
        } else {
          console.log("No users found.");
          setUsers([]);
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        setUsers([]); // Default to empty array on error
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const renderItem = ({ item }: { item: User }) => (
    <TouchableOpacity
      style={styles.cardContainer}
      onPress={() =>
        navigation.navigate("ConversationHistoryScreen", {
          userName: item.name,
          userEmail: item.email,
        })
      }
    >
      <Card
        style={[
          styles.card,
          { backgroundColor: isDarkTheme ? "#1E1E1E" : "#FFFFFF" },
        ]}
      >
        <Card.Content>
          <Text
            style={[
              styles.cardTitle,
              { color: isDarkTheme ? "#FFFFFF" : "#000000" },
            ]}
          >
            {item.name}
          </Text>
          <Text
            style={[
              styles.cardSubtitle,
              { color: isDarkTheme ? "#B0B0B0" : "gray" },
            ]}
          >
            {item.email}
          </Text>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#121212" : "#FFFFFF" },
      ]}
    >
      <CustomHeader
        title="User List"
        showBackButton={false}
        onSettingsPress={() => {
          navigation.navigate("SettingsScreen");
        }}
      />
      {loading && <Loader />}

      {!loading && !users.length && (
        <Text
          style={[
            styles.emptyMessage,
            { color: isDarkTheme ? "#B0B0B0" : "gray" },
          ]}
        >
          No users found.
        </Text>
      )}
      <FlatList
        data={users || []} // Fallback to empty array
        style={{ paddingTop: 20 }}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  cardContainer: {
    marginBottom: 15,
  },
  card: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cardSubtitle: {
    fontSize: 14,
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
  },
});

export default UserListScreen;
