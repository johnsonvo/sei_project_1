const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

//Database
// mongoose.Promise = global.Promise;
// const db = require('./models');

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

// Error handling
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
    res.status(200).json({ msg: 'Handling GET requests to /users' });
});

// Create User
app.post('/api/users', (req, res) => {
    res.status(200).json({ msg: 'Handling POST requests to /users' });
});

// Get User by ID v.02
app.get('/api/users/:userId', (req, res) => {
  const userId = req.params.userId;
  if (userId === 'special') {
    res.status(200).json({
      msg: 'You discovered the special id',
      id: userId,
    });
  } else {
    res.status(200).json({ msg: 'You passed an id' });
  }
});

// Update User by ID
app.put("/api/users/:userId", (req, res) => {
  res.status(200).json({ msg: 'Updated user!' });
});

// Delete User by ID
app.delete('/api/users/:userId', (req, res) => {
    res.status(200).json({ msg: 'Deleted user!' })
});


/////////////////////
// FLOWERS ROUTES //
///////////////////
// Get flower
app.get('/api/products', (req, res) => {
    res.status(200).json({ msg: 'Handling GET requests to /products' });
});

// Create Flower
app.post('/api/products', (req, res) => {
  const flower = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    msg: 'Handling POST requests to /products',
    createdFlower: flower
  });
});

// Get Flower by ID
app.get('/api/products/:id', (req, res) => {
  res.status(200).json({ msg: 'Handling GET requests to /products by ID' });
});

// Update Flower by ID
app.put('/api/products/:id', (req, res) => {
  res.status(200).json({ msg: 'Handling GET requests to /products by ID' });
});

// Delete Flower by ID
app.delete('/api/products/:id', (req, res) => {
    res.status(200).json({ msg: 'Handling DELETE requests to /products by ID'});
});


/////////////////////
/// ORDER ROUTES ///
///////////////////
// Get order
app.get('/api/orders', (req, res) => {
  res.status(200).json({ msg: 'Order fetched!' });
});

// Create order
app.post('/api/orders', (req, res) => {
  const order = {
    productId: req.body.productId,
    quantity: req.body.quantity
  }
  res.status(201).json({
    msg: 'Order created!',
    order: order
  });
});

// Get order by ID
app.get('/api/orders/:orderId', (req, res) => {
  res.status(200).json({
    msg: 'Order fetched!',
    orderId: req.params.orderId
   });
});

// Delete order by ID
app.delete('/api/orders/:orderId', (req, res) => {
  res.status(200).json({
    msg: 'Order deleted!',
    orderId: req.params.orderId
  });
});



// Start Server
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));