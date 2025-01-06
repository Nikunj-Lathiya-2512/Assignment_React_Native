import { configureStore } from "@reduxjs/toolkit"; 
import { persistStore, persistReducer } from "redux-persist"; 
import AsyncStorage from "@react-native-async-storage/async-storage"; 
import { combineReducers } from "redux"; 
import authReducer from "./slices/authSlice";

// Configure persistence settings for Redux
const persistConfig = {
  key: "root", // Key used to store the persisted data in AsyncStorage
  storage: AsyncStorage, // Use AsyncStorage for persistence (to save the Redux store to local storage)
};

const rootReducer = combineReducers({
  auth: authReducer, // Combine the authReducer to handle the authentication state
});

// Create a persisted reducer that integrates persistence with the rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store with the persisted reducer and custom middleware
export const store = configureStore({
  reducer: persistedReducer, 
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable serializability check for redux-persist
    }),
});

// Create a persistor that will manage the persistence (syncing the state to AsyncStorage)
export const persistor = persistStore(store);

// Define TypeScript types for the root state and dispatch (to be used throughout the app)
export type RootState = ReturnType<typeof store.getState>; // Get the root state type based on the store's state shape
export type AppDispatch = typeof store.dispatch; // Get the dispatch type of the store to dispatch actions
