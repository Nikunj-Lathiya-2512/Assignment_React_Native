import { StyleSheet } from "react-native";

const lightStyles = StyleSheet.create({
  // Main container for the screen, holding all elements
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },

  // Card style for holding content (widely used for items, forms, etc.)
  card: {
    marginTop: 20,
    width: "95%",
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },

  // Title style for text inside cards (e.g., card header)
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000000",
  },

  // Container for content inside cards, arranged in a row
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  // Style for general text inside the card
  cardText: {
    fontSize: 16,
    color: "#000000",
  },

  // Style for the logout text, usually in red to emphasize the action
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },

  // Style for the login screen container
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff", // Light background
  },

  // Title style for the login screen
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000", // Light text color
  },

  // Style for input fields (email, password)
  input: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9", // Light input background
    color: "#000",
  },

  // Style for error messages
  error: {
    color: "red",
    fontSize: 12,
  },

  // Style for the register text (usually a clickable link to the register page)
  registerText: {
    marginTop: 10,
    textAlign: "center",
    color: "blue",
  },

  // Style for buttons in the login screen
  button: {
    marginTop: 16,
  },

  // Style for login link or message text
  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "blue",
  },
  // Style for the list container (e.g., list of items)
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Light background
  },

  // Style for card containers within lists
  cardContainer: {
    marginBottom: 15,
  },

  // Style for individual list cards (e.g., items in a list)
  listCard: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#FFFFFF", // Light card background
  },

  // Title style inside list cards
  listCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000", // Light text color
  },

  // Subtitle style inside list cards
  cardSubtitle: {
    fontSize: 14,
    color: "gray", // Light subtitle color
  },

  // Style for user status
  statusText: {
    fontSize: 12,
  },

  // Empty message style (shown when the list is empty)
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray", // Light empty message color
  },

  // Style for the chat screen container
  chatContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },

  // Style for message bubbles/content in the chat
  messageContent: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#CCCCCC",
  },

  // Style for the input field in the chat
  chatInput: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },

  // Style for the send button text in the chat
  sendButtonText: {
    color: "#FFFFFF",
  },

  // Style for the timestamp in chat messages
  timestamp: {
    color: "#888888",
  },
});

export default lightStyles;
