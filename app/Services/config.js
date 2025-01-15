import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getDatabase } from "firebase/database";

import { config } from "react-native-dotenv";
// Firebase configuration object (contains your Firebase project details)
const firebaseConfig = {
  apiKey: config.FIREBASE_API_KEY, // Fetch from .env
  authDomain: config.FIREBASE_AUTH_DOMAIN, // Fetch from .env
  projectId: config.FIREBASE_PROJECT_ID, // Fetch from .env
  storageBucket: config.FIREBASE_STORAGE_BUCKET, // Fetch from .env
  messagingSenderId: config.FIREBASE_MESSAGING_SENDER_ID, // Fetch from .env
  appId: config.FIREBASE_APP_ID, // Fetch from .env
  measurementId: config.FIREBASE_MEASUREMENT_ID, // Fetch from .env
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
