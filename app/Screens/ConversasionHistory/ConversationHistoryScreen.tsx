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
import { ref, push, onValue, update, remove, get } from "firebase/database";
import { useRoute } from "@react-navigation/native";
import { UserContext } from "@/app/Context/UserContext";
import * as Permissions from "expo-permissions";
import * as Notifications from "expo-notifications";


const ConversationHistoryScreen: React.FC = () => {
  const { theme } = useContext(ThemeContext) || {};
  const isDarkTheme = theme === "dark";

  const route = useRoute();
  const { userName: receiverName } = route.params || {}; // Destructure receiver's name

  const [chatData, setChatData] = useState<any[]>([]);
  const [message, setMessage] = useState<string>("");
  const [editingMessageId, setEditingMessageId] = useState<string | null>(null); // Track the message being edited

  const { user } = useContext(UserContext); // Fetch user details from UserContext
  const currentUser = user?.name || "John"; // Default to "Unknown User" if no user is found

  const messagesRef = ref(database, "messages");

  // Fetch messages and filter by sender and receiver and permission for notification

  useEffect(() => {

    requestNotificationPermissions();

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      const formattedData = data
        ? Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
        : [];

      // Filter messages for the current sender and receiver
      const filteredMessages = formattedData.filter(
        (msg) =>
          (msg.sender === currentUser && msg.receiver === receiverName) ||
          (msg.sender === receiverName && msg.receiver === currentUser)
      );

      setChatData(filteredMessages.reverse()); // Reverse to show the most recent message at the bottom
    });

    return () => unsubscribe();
  }, [currentUser, receiverName]);

  const requestNotificationPermissions = async () => {
    try {
      // Ask for permission to receive notifications
      const { status } = await Notifications.requestPermissionsAsync();

      // Check if permission is granted
      if (status === "granted") {
        console.log("Notification permissions granted");
        const token = await Notifications.getExpoPushTokenAsync();
        console.log("Push Token:", token.data);

        // Store the token (you can send it to your backend or store it locally)
        storeReceiverPushToken(token.data); // Function to store token for later use
      } else {
        console.log("Notification permissions not granted");
        alert("You need to enable notification permissions!");
      }
    } catch (error) {
      console.error("Error requesting notification permissions:", error);
    }
  };

  const storeReceiverPushToken = async (token: string) => {
    const userRef = ref(database, `users/${receiverName}/pushToken`);
    await update(userRef, { pushToken: token }); // Ensure you're storing the token at the correct path
  };

  const getReceiverPushToken = async (receiver: string) => {
    if (!receiver) {
      console.error("Receiver name is missing.");
      return null;
    }
    try {
      const userRef = ref(database, `users/${receiver}/pushToken`);
      const snapshot = await get(userRef);
      if (snapshot.exists()) {
        const receiverPushToken = snapshot.val();
        return receiverPushToken;
      } else {
        console.warn(`Receiver ( ${receiver} ) not found in the database.`);
        return null;
      }
    } catch (error) {
      console.error("Error retrieving receiver's push token:", error);
      return null;
    }
  };

  // Send push notification to the receiver
 const sendPushNotification = async (receiver: string, messageData: any) => {
   try {
     const receiverPushToken = await getReceiverPushToken(receiver);
     if (receiverPushToken ) {
       // Prepare the notification body
       const notificationBody = {
         to: receiverPushToken.pushToken, // This should be a string
         sound: "default",
         title: `${messageData.sender} sent you a message`,
         body: messageData.content,
         data: { messageData },
       };

       // Send the notification via Expo's push notification service
       const response = await fetch("https://exp.host/--/api/v2/push/send", {
         method: "POST",
         headers: {
           Accept: "application/json",
           "Content-Type": "application/json",
         },
         body: JSON.stringify(notificationBody),
       });

       if (!response.ok) {
         const errorBody = await response.json();
         console.error("Error response from Expo Push API:", errorBody);
         throw new Error("Failed to send notification.");
       }
       console.log("Notification sent successfully.");
     } else {
       console.warn(
         "Invalid or missing push token for receiver:",
         receiverPushToken
       );
     }
   } catch (error) {
     console.error("Error sending push notification:", error);
   }
 };


  // Send a new message or update an existing one
  const sendMessage = async () => {
    if (message.trim()) {
      let messageData = {
        sender: currentUser,
        receiver: receiverName,
        content: message,
        timestamp: new Date().toLocaleTimeString(),
        edited: false,
      };

      if (editingMessageId) {
        // Update the existing message
        const messageRef = ref(database, `messages/${editingMessageId}`);
        await update(messageRef, {
          content: message,
          timestamp: new Date().toLocaleTimeString(),
          edited: true, // Mark the message as edited
        });

        setEditingMessageId(null); // Reset editing state
      } else {
        // Create a new message
        const newMessage = {
          sender: currentUser, // Dynamic sender
          receiver: receiverName, // Receiver selected from the user list
          content: message,
          timestamp: new Date().toLocaleTimeString(),
          edited: false, // New messages are not edited
        };

        await push(messagesRef, newMessage); // Push message to Firebase
      }

      setMessage(""); // Clear input field
      sendPushNotification(receiverName, messageData); // Send notification
    }
  };

  // Edit a message
  const editMessage = (item: any) => {
    setMessage(item.content); // Pre-fill the input with the existing message
    setEditingMessageId(item.id); // Set the ID of the message being edited
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
    const isSentByMe = item.sender === currentUser;

    const handleLongPress = () => {
      if (isSentByMe) {
        Alert.alert(
          "Message Options",
          "Choose an action",
          [
            {
              text: "Edit",
              onPress: () => editMessage(item),
            },
            {
              text: "Delete",
              onPress: () => deleteMessage(item.id),
              style: "destructive",
            },
            { text: "Cancel", style: "cancel" },
          ],
          { cancelable: true }
        );
      }
    };

    return (
      <TouchableOpacity onLongPress={handleLongPress}>
        <View
          style={[
            styles.messageContainer,
            isSentByMe ? styles.sentMessage : styles.receivedMessage,
          ]}
        >
          <View
            style={[
              styles.messageContent,
              {
                backgroundColor: isSentByMe
                  ? isDarkTheme
                    ? "#2E2E2E"
                    : "#DCF8C6"
                  : isDarkTheme
                  ? "#444444"
                  : "#FFFFFF",
                shadowColor: isDarkTheme ? "#000000" : "#CCCCCC",
              },
            ]}
          >
            {!isSentByMe && (
              <Text
                style={[
                  styles.sender,
                  { color: isDarkTheme ? "#FFFFFF" : "#000000" },
                ]}
              >
                {item.sender}
              </Text>
            )}
            <Text
              style={[
                styles.message,
                { color: isDarkTheme ? "#E0E0E0" : "#000000" },
              ]}
            >
              {item.content}
              {item.edited && (
                <Text style={[styles.editedTag, { color: "#888888" }]}>
                  {" "}
                  (edited)
                </Text>
              )}
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
        title={receiverName} // Display the receiver's name
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
          placeholder={
            editingMessageId ? "Edit your message..." : "Type a message..."
          }
          placeholderTextColor={isDarkTheme ? "#AAAAAA" : "#888888"}
          value={message}
          onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>
            {editingMessageId ? "Update" : "Send"}
          </Text>
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
  editedTag: {
    fontSize: 12,
    fontStyle: "italic",
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
  sentMessage: {
    alignSelf: "flex-end", // Align to the right for sent messages
    marginLeft: "25%", // Offset to the left
  },
  receivedMessage: {
    alignSelf: "flex-start", // Align to the left for received messages
    marginRight: "25%", // Offset to the right
  },
  actionButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 5,
  },
  actionButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  editButton: {
    backgroundColor: "#4CAF50", // Green for Edit
  },
  deleteButton: {
    backgroundColor: "#F44336", // Red for Delete
  },
  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default ConversationHistoryScreen;
