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

// Start Server
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));


