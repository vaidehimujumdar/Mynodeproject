const express = require('express');
const router = express.Router();
const sqlite3 = require('sqlite3').verbose(); // Import the sqlite3 package
const {sendNotification} = require('./service/NotificationService');

// Route for home page (index.ejs)
router.get('/', (req, res) => {
  // Query the database
  db.all('SELECT * FROM service_table', (err, rows) => {
      if (err) {
          return res.status(500).send('Error retrieving data from database');
      }
      // Render index.ejs and pass the data (rows)
      res.render('index', { services: rows });
  });
});
// Initialize the database connection
const db = new sqlite3.Database('./newdata.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});
router.get('/services', (req, res) => {
  db.all(`SELECT * from name`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows, err:err });
  });
});

router.get('/contact', (req, res) => {
  db.all(`SELECT * from contact_info`, [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({ data: rows, err:err });
  });
});

// Define the `/homepage/details` route
router.get('/details', (req, res) => {
  res.send('Homepage details page.');
});

// Event Management Dashboard route
router.get('/event-management', (req, res) => {
  res.render('event-management');  // Ensure you have event-management.ejs in your views folder
});

// Profile Editor route
router.get('/profile-editor', (req, res) => {
  res.render('profile-editor');  // Renders the profile-editor.ejs file
});


// Define the `/homepage/update` route
router.post('/update', (req, res) => {
  const content = req.body.content; // Assume content is sent in the request body
});

router.get('/send-notification', (req, res) => {
  res.render('notification');  
});

router.post('/send-notification-to-server', (req, res) => {
  const token = req.body.token
  const title = req.body.title
  const body = req.body.body
  sendNotification(token, title, body);
  res.send('Notification sent successfully');  
});

module.exports = router;


