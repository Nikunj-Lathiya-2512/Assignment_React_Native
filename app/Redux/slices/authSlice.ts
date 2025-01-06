import { createSlice, PayloadAction } from "@reduxjs/toolkit"; 

// Define the type for the authentication state
type AuthState = {
  isAuthenticated: boolean; // Boolean flag to indicate if the user is authenticated
  user: any; // User object, replace 'any' with a specific type for the user object
};

// Set the initial state for the auth slice
const initialState: AuthState = {
  isAuthenticated: false, // Initially, the user is not authenticated
  user: null, // No user data initially
};

// Create the authSlice using createSlice, which automates reducers and actions creation
const authSlice = createSlice({
  name: "auth", // Name of the slice (used in Redux dev tools and for identification)
  initialState, // The initial state for this slice
  reducers: {
    // Action to handle user login
    login(state, action: PayloadAction<any>) {
      state.isAuthenticated = true; // Set isAuthenticated to true on login
      state.user = action.payload; // Save the user data from the action payload
    },
    // Action to handle user logout
    logout(state) {
      state.isAuthenticated = false; // Set isAuthenticated to false on logout
      state.user = null; // Clear the user data on logout
    },
  },
});

// Export the actions (login and logout) to be used elsewhere in the application
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
