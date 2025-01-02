import { StyleSheet } from "react-native";

const darkStyles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#121212",
  },
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
  cardTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#FFFFFF",
  },
  cardContent: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 16,
    color: "#B0B0B0",
  },
  logoutText: {
    color: "red",
    fontWeight: "bold",
  },
  loginContainer: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#121212", // Dark background
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#fff", // Dark text color
  },
  input: {
    marginBottom: 12,
    backgroundColor: "#333", // Dark input background
    color: "#ffffff", // Dark input text color
  },
  error: {
    color: "red",
    fontSize: 12,
  },
  registerText: {
    marginTop: 10,
    textAlign: "center",
    color: "#1e90ff", // Blue text for the register link
  },

  button: {
    marginTop: 16,
  },

  loginText: {
    marginTop: 10,
    textAlign: "center",
    color: "#1e90ff", // Blue text for the login link
  },

  listContainer: {
    flex: 1,
    backgroundColor: "#121212", // Dark background
  },
  cardContainer: {
    marginBottom: 15,
  },
  listCard: {
    marginHorizontal: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    backgroundColor: "#1E1E1E", // Dark card background
  },
  listCardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF", // Dark text color
  },
  cardSubtitle: {
    fontSize: 14,
    color: "#B0B0B0", // Dark subtitle color
  },
  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#B0B0B0", // Dark empty message color
  },
  chatContainer: {
    flex: 1,
    backgroundColor: "#121212",
  },
  messageContent: {
    backgroundColor: "#444444",
    shadowColor: "#000000",
  },
  chatInput: {
    backgroundColor: "#2E2E2E",
    color: "#E0E0E0",
  },
  sendButtonText: {
    color: "#FFFFFF",
  },
  timestamp: {
    color: "#AAAAAA",
  },
});

export default darkStyles;
