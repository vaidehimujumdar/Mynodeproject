// Import Firebase libraries needed for service worker
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.19.1/firebase-messaging-compat.js');

// Initialize the Firebase app in the service worker by passing in the messagingSenderId
firebase.initializeApp({
  apiKey: "AIzaSyATQPtezg5J06ne8alT3D2i_ifkc0z_hlY",
  authDomain: "test-6c64d.firebaseapp.com",
  projectId: "test-6c64d",
  storageBucket: "test-6c64d.appspot.com",
  messagingSenderId: "506454666449",
  appId: "1:506454666449:web:9f7d4a5f9d7e7d1e98a9f0"
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage(function(payload) {
  console.log('Received background message: ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: '/firebase-logo.png' 
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
