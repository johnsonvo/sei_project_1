const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

// Database
mongoose.Promise = global.Promise;
const db = require('./models');

// BodyParser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json()); // this takes the json data recieved and accesses it through 'body'.

// CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// Error handling - removed bc it's causing an error
// app.use((req, res, next) => {
//   const error = new Error('Not found');
//   error.status = 404;
//   next(error);
// });

// app.use((error, req, res, next) => {
//   res.status(error.status || 500);
//   res.json({
//     error: {
//       message: error.message
//     }
//   });
// });


//Serve Static Assets
app.use(express.static(__dirname + '/public'));

// Root Route
app.get('/', (req,res) => {
    res.sendFile('views/index.html', {root: __dirname});
});


/////////////////////
/// USERS ROUTES ///
////////////////////
// Get User
app.get('/api/users', (req, res) => {
  db.User.find((err, users) => {
    if (err) {
      console.log('err: ' + err);
      res.sendStatus(500);
    }
    res.json(users);
  });
});




// Create User
app.post('/api/users', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return res.status(500).json({msg: 'Something went wrong. Please try again!'});
    res.json(newUser);
  });
});

// Get User by ID
app.get('/api/users/:id', (req, res) => {
  db.User.findById(req.params.id, (err, fetchedUser) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(fetchedUser);
  })
});

// Update User by ID
app.put("/api/users/:id", (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(updatedUser);
  });
});

// Delete User by ID
app.delete('/api/users/:id', (req, res) => {
  db.User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(deletedUser);
  });
});


/////////////////////
// FLOWERS ROUTES //
///////////////////
// Get Flower
app.get("/api/flowers", (req, res) => {
  db.Flower.find((err, flowers) => {
    if (err) {
      console.log('error: ' + err);
      res.sendStatus(500);
    }
    res.json(flowers);
  });
});

// Create Flower
app.post('/api/flowers', (req, res) => {
  db.Flower.create(req.body, (err, newFlower) => {
    if (err) return res.status(500).json({ msg: 'Something goofed. Please try again!' });
    res.json(newFlower);
  });
});

// Get Flower by ID
app.get('/api/flowers/:id', (req, res) => {
  db.Flower.findById(req.params.id, (err, fetchedFlower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(fetchedFlower);
  });
});

// Update Flower by ID
app.put('/api/flowers/:id', (req, res) => {
  db.Flower.findByIdAndUpdate(req.params.id, {new: true}, (err, updatedFlower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(updatedFlower);
  });
});

// Delete Flower by ID
app.delete('/api/flowers/:id', (req, res) => {
  db.Flower.findByIdAndRemove(req.params.id, (err, deletedFlower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(deletedFlower);
  });
});


/////////////////////
/// ORDER ROUTES ///
///////////////////
// Get order
app.get('/api/orders', (req, res) => {
  db.Order.find((err, orders) => {
    if (err) {
      console.log('error: ' + err);
      res.sendStatus(500);
    }
    res.json(orders);
  });
});

// Create order
app.post('/api/orders', (req, res) => {
  db.Order.create(req.body, (err, newOrder) => {
    if (err) return res.status(500).json({ msg: "Order does not exist" });
    res.json(newOrder);
  });
});

// Get order by ID
app.get('/api/orders/:id', (req, res) => {
  db.Order.findById(req.params.id, (err, fetchedOrder) => {
    if (err) return res.status(500).json({ msg: "Order does not exist" });
    res.json(fetchedOrder);
  });
});

// Update order by ID
app.get('/api/orders/:id', (req, res) => {
  db.Order.findByIdAndUpdate(req.params.id, {new: true}, (err, updatedOrder) => {
    if (err) return res.status(500).json({ msg: "Order does not exist" });
    res.json(updatedOrder);
  });
});

// Delete order by ID
app.delete('/api/orders/:id', (req, res) => {
  db.Order.findByIdAndRemove(req.params.id, (err, deletedOrder) => {
    if (err) return res.status(500).json({ msg: "Order does not exist" });
    res.json(deletedOrder);
  });
});



// Start Server
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));