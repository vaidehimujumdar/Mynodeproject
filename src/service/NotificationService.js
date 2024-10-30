const admin = require("firebase-admin");

var serviceAccount = require("../../firebase_config.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

const sendNotification = (token, title, body) => {
    const message = {
        token: token,  // The FCM token of the device/browser
        notification: {
            title: title,
            body: body
        }
    };

    // Send the notification via Firebase Admin SDK
    admin.messaging().send(message)
    .then((response) => {
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });
}

module.exports = {
    sendNotification
};
