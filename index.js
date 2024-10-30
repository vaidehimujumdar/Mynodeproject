const express = require('express');
const homepageroutes = require('./src/route');
const app = express();
const path = require('path');
app.use(express.json());

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.use( express.static( path.join( __dirname, 'public' ) ) );

// Set the views directory
app.set('views', path.join(__dirname, 'src'));

app.use('/', homepageroutes);
app.use('/contact', homepageroutes);
app.use('/about', homepageroutes);
app.use('/send-notification', homepageroutes);
app.use('/send-notification-to-server', homepageroutes);

// Start the server
app.listen(process.env.PORT || 4000, () => {
  console.log(`Server is running on ${process.env.PORT || 4000}`);
});

