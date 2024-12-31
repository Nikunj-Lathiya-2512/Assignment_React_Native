import React, { createContext, useState, useEffect, ReactNode } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
export interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

// Create UserContext
export const UserContext = createContext<UserContextProps | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Effect to fetch logged-in user dynamically
  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged((firebaseUser) => {
        console.log('----',firebaseUser)
      if (firebaseUser) {
        setUser({
          id: firebaseUser.uid,
          name: firebaseUser.displayName || "",
          email: firebaseUser.email || "No Email",
        });
      } else {
        setUser(null); // User logged out
      }
    });

    return () => unsubscribe(); // Cleanup subscription
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
