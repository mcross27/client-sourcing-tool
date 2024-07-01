const express = require('express'); // Import the Express library
const cors = require('cors'); // Import the CORS library
const connectDB = require('./db'); // Import the connectDB function
// const checkJwt = require('./auth'); // Import the auth middleware

const companyRoutes = require('./routes/company');
const contactRoutes = require('./routes/contact');
const emailTemplateRoutes = require('./routes/emailTemplate');

const app = express(); // Create an instance of an Express application
const port = 3000; // Define the port number on which the server will listen

//Connect to the database
connectDB();

//Middleware to parse JSON bodies
app.use(express.json()); // Parse JSON bodies
app.use(cors()); // Enable CORS

// Define a route for the root URL ('/') that sends a response
app.get('/', (req, res) => {
  res.send('Client Sourcing Tool Backend');
});

app.use('/api/companies', companyRoutes);
app.use('/api/contacts', contactRoutes);
app.use('/api/email-templates', emailTemplateRoutes);


// Protected route
/* app.get('/protected', checkJwt, (req, res) => {
     res.send('This is a protected route');
   });
*/

// Start the server and make it listen on the specified port
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});