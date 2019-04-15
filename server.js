const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

//Database
mongoose.Promise = global.Promise;
const db = require('./models');

// BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // this takes the json data recieved and accesses it through 'body'.

//Serve Static Assets
app.use(express.static(__dirname + '/public'));

// Root Route
app.get('/', (req,res) => {
    res.sendFile('views/index.html', {root: __dirname});
});

/////////////////////
/////// USERS ///////
////////////////////
// Get User (Index)
app.get('/api/users', (req, res) => {
    res.status(200).json({ msg: 'Handling GET requests to /users' });
});

// Create User
app.post('/api/users', (req, res) => {
    res.status(200).json({ msg: 'Handling POST requests to /users' });
});

// Get User by ID
app.get('/api/users/:id', (req, res) => {
  res.status(200).json({ msg: 'Handling GET requests to /users by ID' });
});


// Update User by ID
app.put('/api/users/:id', (req, res) => {
  res.status(200).json({ msg: 'Handling PUT requests to /users by ID' });
});

// Delete User by ID
app.delete('/api/users/:id', (req, res) => {
    res.status(200).json({ msg: 'Handling PUT requests to /users by ID' })
});

//



/////////////////////
///// FLOWERS //////
///////////////////
// Get flower
app.get('/api/flowers', (req, res) => {
    res.status(200).json({ msg: 'Handling GET requests to /flowers' });
});

// Create Flower
app.post("/api/flowers", (req, res) => {
  res.status(200).json({ msg: 'Handling POST requests to /flowers' });
});

// Get Flower by ID
app.get('/api/flowers/:id', (req, res) => {
  res.status(200).json({ msg: 'Handling GET requests to /flowers by ID' });
});

// Update Flower by ID
app.put('/api/flowers/:id', (req, res) => {
  res.status(200).json({ msg: 'Handling GET requests to /flowers by ID' });
});

// Delete Flower by ID
app.delete('/api/flowers/:id', (req, res) => {
    res.status(200).json({ msg: 'Handling DELETE requests to /flowers by ID'});
});






// Start Server
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));


