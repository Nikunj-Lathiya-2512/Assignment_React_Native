import { initializeApp,firebase } from "firebase/app"; // Firebase core (v9+ modular)
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; // Firebase Authentication
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage"; // Firebase Storage
import { getDatabase } from "firebase/database";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhPqeFqdkCJolOIJ82OD2tPg8In_6IT4s",
  authDomain: "assignment-react-native-a908d.firebaseapp.com",
  projectId: "assignment-react-native-a908d",
  storageBucket: "assignment-react-native-a908d.appspot.com", // Corrected storage URL
  messagingSenderId: "344182219651",
  appId: "1:344182219651:web:c54c8e039c583abad2ccb6",
  measurementId: "G-N49DXBZGTK",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get Firebase services (auth, storage, etc.)
const auth = getAuth(app); // Get Firebase Authentication
const storage = getStorage(app); // Get Firebase Storage
const db= getFirestore(app)
const firestore = getFirestore(app);
const database = getDatabase(app);

export { auth, storage, firebaseConfig,db,firestore ,database}; // Export services for use in other parts of the app
