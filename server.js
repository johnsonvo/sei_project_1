const express = require('express');
const bodyParser = require('body-parser');
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
//// SEED DATA /////
//// TODO: Delete////
////////////////////
const users_list = [
  {
    fullName: "Leanne Graham",
    email: "Sincere@april.biz",
    dob: "2/11/1988",
    products: "Rose"
  },
  {
    fullName: "Ervin Howell",
    email: "Shanna@melissa.tv",
    dob: "2/09/1900",
    products: "Sunflower"
  },
];

const flowers_list = [
  {
    name: "Aconite",
    img:"https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/winter-aconite-720790.jpg",
    price: "$12",
    season: "Early Spring",
    orders: 12,
  },
];

const orders_list = [
  {
    userId: 1,
    quantity: 3,
    price: "$100",
    productId:12,

  },
  {
    userId: 2,
    quantity: 4,
    price: "$200",
    productId:13,
  },
];

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
app.get('/api/flowers', (req, res) => {
    res.status(200).json({ msg: 'Handling GET requests to /flowers' });
});

// Create Flower
app.post('/api/flowers', (req, res) => {
  const flower = {
    name: req.body.name,
    price: req.body.price
  };
  res.status(201).json({
    msg: 'Handling POST requests to /flowers',
    createdFlower: flower
  });
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