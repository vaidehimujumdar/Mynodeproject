import { initializeApp } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-app.js";
import { getMessaging, getToken, onMessage } from "https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyATQPtezg5J06ne8alT3D2i_ifkc0z_hlY",
    authDomain: "test-6c64d.firebaseapp.com",
    projectId: "test-6c64d",
    storageBucket: "test-6c64d.appspot.com",
    messagingSenderId: "506454666449",
    appId: "1:506454666449:web:9f7d4a5f9d7e7d1e98a9f0",
    measurementId: "G-1VKLZGYHG3"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then((registration) => {
        console.log('Service Worker registered with scope:', registration.scope);
  
        // After registering the service worker, initialize Firebase Messaging
        const messaging = getMessaging();
  
        // Request permission to show notifications
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            console.log('Notification permission granted.');
  
            // Generate FCM token
            getToken(messaging, { vapidKey: 'BA7y92JPK-BV0eC3lkwCgLIvtWaYvK0SMhV9q-3b5C4DKv1U1zh05AzMPnNanMvUcPzbaEGsay73koZjPJvApEY', serviceWorkerRegistration: registration })
              .then((currentToken) => {
                if (currentToken) {
                  console.log('Generated FCM token:', currentToken);
                  // Send this token to the server to save it
                  sendNotificationToServer(currentToken);
                } else {
                  console.log('No registration token available.');
                }
              }).catch((err) => {
                console.log('An error occurred while retrieving token:', err);
              });
          } else {
            console.log('Unable to get permission to notify.');
          }
        });
      }).catch((err) => {
        console.log('Service Worker registration failed:', err);
      });
  }

// Request permission to show notifications
Notification.requestPermission().then(permission => {
    if (permission === 'granted') {
        console.log('Notification permission granted.');

        // Generate FCM token
        getToken(messaging, { vapidKey: 'BA7y92JPK-BV0eC3lkwCgLIvtWaYvK0SMhV9q-3b5C4DKv1U1zh05AzMPnNanMvUcPzbaEGsay73koZjPJvApEY' })
        .then((currentToken) => {
            if (currentToken) {
                console.log('Generated FCM token:', currentToken);

                // Example notification data
                const title = 'Hello from Firebase';
                const body = 'This is a test notification';

            } else {
                console.log('No registration token available. Request permission to generate one.');
            }
        }).catch((err) => {
            console.log('An error occurred while retrieving token: ', err);
        });
    } else {
        console.log('Unable to get permission to notify.');
    }
});

// Send the FCM token and notification details to the server
const sendNotificationToServer = (token, title, body) => {
    console.log(token, title, body);
    fetch('send-notification-to-server', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            token: token,  // FCM token generated on the client
            title: title,  // Notification title
            body: body     // Notification body
        })
    }).then(response => console.log(response.text()))
      .then(data => console.log(data))
      .catch(error => console.error('Error:', error));
};

// Handle foreground messages
onMessage(messaging, (payload) => {
    console.log("PAYLOAD", payload.notification)
    alert("BUY NOW");

    const notificationTitle = payload.notification?.title || 'Default Title';
    const notificationOptions = {
        body: payload.notification?.body || 'Default body text',
        icon: '/path-to-your-icon.png' 
    };
    
    new Notification(notificationTitle, notificationOptions);
});
