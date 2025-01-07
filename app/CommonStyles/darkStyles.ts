import { StyleSheet } from "react-native";

const darkStyles = StyleSheet.create({
  // Container style for the main screen
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#121212",
  },

  // Style for card elements that hold content
  card: {
    marginTop: 20,
    width: "95%",
    backgroundColor: "#1E1E1E",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Title style for cards
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#FFFFFF",
  },

  // Style for card content (text and items inside the card)
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Text style for the content in the card
  cardText: {
    fontSize: 16,
    color: "#B0B0B0",
  },

  // Logout text style
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },

  // Style for the login screen container
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#121212",
  },

  // Title style for the login screen
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff",
  },

  // Input field style (used for email and password inputs)
  input: {
    marginBottom: 12,
    backgroundColor: "#333",
    color: "#ffffff",
  },

  // Error message style for form validation errors
  error: {
    color: "red",
    fontSize: 12,
  },

  // Style for the registration text link
  registerText: {
    marginTop: 10,
    textAlign: "center",
    color: "#1e90ff",
  },

  // Button style for action buttons like login
  button: {
    marginTop: 16, // Space above the button
  },

  // Text style for login link
  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "#1e90ff",
  },

  // Style for the list container (e.g., chat list or item list)
  listContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },

  // Style for the card container in lists
  cardContainer: {
    marginBottom: 15,
  },

  // Style for individual cards in a list (e.g., chat messages)
  listCard: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#1E1E1E",
  },

  // Style for the title inside a list card
  listCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  // Style for subtitle text inside a list card
  cardSubtitle: {
    fontSize: 14,
    color: "#B0B0B0",
  },

  // Style for user status
  statusText: {
    fontSize: 12,
  },

  // Style for empty message text (e.g., when no items in list)
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#B0B0B0",
  },

  // Style for the chat container (background for chat screen)
  chatContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },

  // Style for message content (background and shadow)
  messageContent: {
    backgroundColor: "#444444",
    shadowColor: "#000000",
  },

  // Style for the chat input field
  chatInput: {
    backgroundColor: "#2E2E2E",
    color: "#E0E0E0",
  },

  // Text style for send button inside chat
  sendButtonText: {
    color: "#FFFFFF",
  },

  // Timestamp text style in messages
  timestamp: {
    color: "#AAAAAA",
  },
});

export default darkStyles;
