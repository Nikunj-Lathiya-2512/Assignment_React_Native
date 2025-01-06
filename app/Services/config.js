import { initializeApp, firebase } from "firebase/app"; 
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 
import { getStorage } from "firebase/storage"; 
import { getDatabase } from "firebase/database"; 

// Firebase configuration object (contains your Firebase project details)
const firebaseConfig = {
  apiKey: "AIzaSyAhPqeFqdkCJolOIJ82OD2tPg8In_6IT4s", // Your Firebase API Key
  authDomain: "assignment-react-native-a908d.firebaseapp.com", // Firebase authentication domain
  projectId: "assignment-react-native-a908d", // Firebase project ID
  storageBucket: "assignment-react-native-a908d.appspot.com", // Firebase storage URL for storing files
  messagingSenderId: "344182219651", // Firebase Cloud Messaging Sender ID
  appId: "1:344182219651:web:c54c8e039c583abad2ccb6", // Firebase App ID
  measurementId: "G-N49DXBZGTK", // Firebase Analytics Measurement ID
};

// Initialize Firebase app with the configuration
const app = initializeApp(firebaseConfig);

// Get various Firebase services for use in the app
const auth = getAuth(app); // Firebase Authentication for managing users
const storage = getStorage(app); // Firebase Storage to handle file uploads and storage
const db = getFirestore(app); // Firebase Firestore for NoSQL database access
const firestore = getFirestore(app); // Firestore database reference
const database = getDatabase(app); // Firebase Realtime Database for real-time data storage and retrieval

export { auth, storage, firebaseConfig, db, firestore, database };
