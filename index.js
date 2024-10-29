const express = require('express');
const homepageroutes = require('./src/route');
const app = express();
const path = require('path');
const sqlite3 = require('sqlite3').verbose();

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.use( express.static( path.join( __dirname, 'public' ) ) );

// Set the views directory
app.set('views', path.join(__dirname, 'src'));

// Define a route
// app.get('/', (req, res) => {
//   const data = { title: "Home Page", message: "Welcome to EJS Templating!" };
//   res.render('index', data);
// });
const db = new sqlite3.Database('./newdata.db', (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to the SQLite database.');
    }
  });
  
app.get('/', (req, res) => {
    // Fetch the data from the 'services' table in SQLite
    db.all('SELECT * FROM service_table', (err, rows) => {
        if (err) {
            return res.status(500).send('Error retrieving data from the database'+err.stack);
        }
        
console.log('Retrieved rows:', rows);
        // Render the index.ejs file and pass the services data
        res.render('index', { services: rows });
    });
});



// app.use('/homepage', homepageroutes);


// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT || 4000}`);
});

