import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, User as FirebaseUser } from "firebase/auth";

// Define the structure for the User object
export interface User {
  id: string; // User's unique identifier (UID from Firebase)
  name: string; // User's name (displayName from Firebase)
  email: string; // User's email address
}

// Define the context props, which includes the user object and a function to set the user
interface UserContextProps {
  user: User | null; // Current user object, or null if no user is logged in
  setUser: (user: User | null) => void; // Function to set the user in state
}

// Create the UserContext with an initial value of undefined
export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode; // Children components that will consume the UserContext
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  // Set up state to store the user (initially null if no user is logged in)
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Get the Firebase authentication instance
    const auth = getAuth();

    // Set up the onAuthStateChanged listener to track the user's login state
    const unsubscribe = auth.onAuthStateChanged(
      (firebaseUser: FirebaseUser | null) => {
        if (firebaseUser) {
          // If a user is logged in, set their details in state
          setUser({
            id: firebaseUser.uid, // Use Firebase UID as the user ID
            name: firebaseUser.displayName || "No Name", // Fallback if displayName is not set
            email: firebaseUser.email || "No Email", // Fallback if email is not set
          });
        } else {
          // If no user is logged in, set the user to null
          setUser(null);
        }
      }
    );

    // Clean up the listener when the component is unmounted
    return () => unsubscribe();
  }, []); // Empty dependency array ensures this runs once, on mount

  return (
    // Provide the user and setUser function to all children components through context
    <UserContext.Provider value={{ user, setUser }}>
      {children} 
    </UserContext.Provider>
  );
};
