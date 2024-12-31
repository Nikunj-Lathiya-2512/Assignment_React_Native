import React, { useContext, useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import CustomHeader from "@/app/CustomViews/CustomHeader";
import { ThemeContext } from "../../Context/ThemeContext";
import { database } from "../../Services/config"; // Import your Firebase config
import { ref, push, onValue, remove } from "firebase/database";
import { useRoute } from "@react-navigation/native";

// Chat Screen Component
const ConversationHistoryScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext) || {};
  const isDarkTheme = theme === "dark";

  const route = useRoute(); // Access route parameters
  const { userName} = route.params || {}; // Destructure userName and userEmail

  const [chatData, setChatData] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");

  const messagesRef = ref(database, "messages"); // Firebase database reference

  // Fetch messages from Firebase
  useEffect(() => {
    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];
      setChatData(formattedData.reverse()); // Reverse to show recent messages at the bottom
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  // Send a new message
  const sendMessage = async () => {
    if (message.trim()) {
      const newMessage = {
        sender: "Alice", // Replace with the current user's name or ID
        content: message,
        timestamp: new Date().toLocaleTimeString(),
      };

      await push(messagesRef, newMessage); // Push message to Firebase
      setMessage(""); // Clear input field
    }
  };

  // Delete a message
  const deleteMessage = (messageId: string) => {
    Alert.alert(
      "Delete Message",
      "Are you sure you want to delete this message?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            const messageRef = ref(database, `messages/${messageId}`);
            await remove(messageRef); // Remove message from Firebase
          },
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: any }) => {
    const isSentByMe = item.sender === "Alice"; // Adjust logic based on the current user
    return (
      <TouchableOpacity
        onLongPress={() => deleteMessage(item.id)} // Handle long press to delete message
        style={[
          styles.messageContainer,
          isSentByMe ? styles.sentMessage : styles.receivedMessage,
        ]}
      >
        <View
          style={[
            styles.messageContent,
            {
              backgroundColor: isDarkTheme ? "#2E2E2E" : "#FFFFFF",
              shadowColor: isDarkTheme ? "#000000" : "#CCCCCC",
            },
          ]}
        >
          <Text
            style={[
              styles.sender,
              { color: isDarkTheme ? "#FFFFFF" : "#000000" },
            ]}
          >
            {item.sender}
          </Text>
          <Text
            style={[
              styles.message,
              { color: isDarkTheme ? "#E0E0E0" : "#000000" },
            ]}
          >
            {item.content}
          </Text>
          <Text
            style={[
              styles.timestamp,
              { color: isDarkTheme ? "#AAAAAA" : "#888888" },
            ]}
          >
            {item.timestamp}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkTheme ? "#121212" : "#F0F0F0" },
      ]}
    >
      <CustomHeader
        title={userName}
        showBackButton={true}
        showSettingIcon={false}
      />
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        inverted // To show the most recent message at the bottom
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: isDarkTheme ? "#2E2E2E" : "#FFFFFF",
              color: isDarkTheme ? "#E0E0E0" : "#000000",
            },
          ]}
          placeholder="Type a message..."
          placeholderTextColor={isDarkTheme ? "#AAAAAA" : "#888888"}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  messageContainer: {
    flexDirection: "row",
    marginBottom: 10,
    marginHorizontal: 15,
  },
  sentMessage: {
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  receivedMessage: {
    justifyContent: "flex-start",
    alignSelf: "flex-start",
  },
  messageContent: {
    maxWidth: "75%",
    padding: 10,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 1,
  },
  sender: {
    fontWeight: "bold",
    fontSize: 14,
  },
  message: {
    fontSize: 16,
    marginVertical: 5,
  },
  timestamp: {
    fontSize: 12,
    textAlign: "right",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#CCC",
    backgroundColor: "#F9F9F9",
  },
  input: {
    flex: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    fontSize: 16,
  },
  sendButton: {
    marginLeft: 10,
    backgroundColor: "#007BFF",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  sendButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default ConversationHistoryScreen;
