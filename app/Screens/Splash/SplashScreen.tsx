import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebaseConfig } from '@/app/Services/config';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import * as SecureStore from "expo-secure-store";


// Initialize Firebase
const app = initializeApp(firebaseConfig); // Initialize app only once
const auth = getAuth(app); // Get the auth instance

const SplashScreen: React.FC = () => {
  const navigation = useNavigation();
  
  useEffect(() => {
    const checkUserToken = async () => {
      try {
        // Retrieve the token from SecureStore
        const token = await SecureStore.getItemAsync("userToken");
        if (token) {
          navigation.navigate("UserListScreen"); // Navigate to userlist screen after 3 seconds
        } else {
          navigation.navigate("LoginScreen"); // Navigate to login screen after 3 seconds
        }
      } catch (error) {
        console.error("Error retrieving token:", error);
      } finally {
      }
    };
    checkUserToken()

    setTimeout(() => {
    }, 3000); // 3-second delay
  }, []);

  return (
    <View style={styles.container}>
      <View style={{backgroundColor:'red',flex:1}}>

      </View>
      <Image source={require('../../Assests/splash.png')} style={styles.image} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',  
  },
  image: {
    width: '100%',  
    height: '100%',
    resizeMode:'contain'
  },
});

export default SplashScreen;
