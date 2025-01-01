
import React, { useEffect, useState } from 'react';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

const requestNotificationPermissions = async () => {
  const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  if (status !== 'granted') {
    alert('You need to enable notifications permissions!');
    return null;
  }
  const token = await Notifications.getExpoPushTokenAsync();
  console.log("Push Token:", token.data);  // Store this token for sending push notifications
  return token.data;
};

const NotificationHandler = () => {
  const [pushToken, setPushToken] = useState(null);

  useEffect(() => {
    // Request notification permissions and get push token
    const fetchPushToken = async () => {
      const token:any = await requestNotificationPermissions();
      console.log('token--',token)
      if (token) {
        setPushToken(token);
      }
    };

    fetchPushToken();

    // Set notification handler for when the notification is received
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,   // Shows the notification alert in the tray
        shouldPlaySound: true,   // Plays sound
        shouldSetBadge: true,    // Sets badge on the app icon (optional)
      }),
    });

    // Listener for notifications when the app is in the foreground
    const notificationListener = Notifications.addNotificationReceivedListener(
      (notification) => {
        console.log("Notification received in foreground:", notification);
      }
    );

    // Listener for user tapping the notification
    const responseListener = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        console.log("User tapped on notification:", response);
        // You can navigate to a different screen here if needed
      }
    );

    // Clean up listeners on unmount
    return () => {
      notificationListener.remove();
      responseListener.remove();
    };
  }, []);
}

export default NotificationHandler;