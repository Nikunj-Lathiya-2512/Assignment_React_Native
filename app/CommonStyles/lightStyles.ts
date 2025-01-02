import { StyleSheet } from "react-native";

const lightStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#000000",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 16,
    color: "#000000",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#fff", // Light background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#000", // Light text color
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#f9f9f9", // Light input background
    color: "#000",
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  registerText: {
    marginTop: 10,
    textAlign: "center",
    color: "blue",
  },
  button: {
    marginTop: 16,
  },
  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "blue",
  },
  listContainer: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Light background
  },
  cardContainer: {
    marginBottom: 15,
  },
  listCard: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#FFFFFF", // Light card background
  },
  listCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000000", // Light text color
  },
  cardSubtitle: {
    fontSize: 14,
    color: "gray", // Light subtitle color
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray", // Light empty message color
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#F0F0F0",
  },
  messageContent: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#CCCCCC",
  },
  chatInput: {
    backgroundColor: "#FFFFFF",
    color: "#000000",
  },
  sendButtonText: {
    color: "#FFFFFF",
  },
  timestamp: {
    color: "#888888",
  },
});

export default lightStyles;
