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

/////////////////////
/// SEED DATA ///
////////////////////
const usersList = [
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
  {
    fullName: "Clementine Bauch",
    email: "Nathan@yesenia.net",
    dob: "12/1/1957",
    products: "Canation"
  },
  {
    fullName: "Patricia Lebsack",
    email: "Julianne.OConner@kory.org",
    dob: "15/08/2000",
    products: "Rose"
  }
];

const flowersList = [
  {
    name: "Aconite",
    img:
      "https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/winter-aconite-720790.jpg",
    price: "$12",
    season: "Early Spring",
    orders: 12
  },
  {
    name: "Ageratum",
    img:
      "https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/ageratum-773201.jpg",
    price: "$11",
    season: "Mid‑Summer - Mid‑Fall",
    orders: 15
  },
  {
    name: "Allium",
    img:
      "https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/purple-882161.jpg",
    price: "$11",
    season: "Late Spring - Mid‑Summer",
    orders: 11
  },
  {
    name: "Anemone",
    img:
      "https://proflowers.wpengine.com/wp-content/plugins/pf-flowertypes/image/summer-anemone-224501.jpg",
    price: "$10",
    season: "Mid Spring - Mid‑Fall",
    orders: 10
  }
];

const ordersList = [
  {
    userId: 1,
    quantity: 3,
    price: "$100",
    productId: 12
  },
  {
    userId: 2,
    quantity: 4,
    price: "$200",
    productId: 13
  },
  {
    userId: 3,
    quantity: 6,
    price: "$300",
    productId: 14
  },
  {
    userId: 4,
    quantity: 7,
    price: "$500",
    productId: 15
  }
];

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

// Get User by ID v.02
app.get('/api/users/:userId', (req, res) => {
  db.User.findById(req.params.id, (err, user) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(newUser);
  })
});

// Update User by ID
app.put("/api/users/:userId", (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(updatedUser);
  });
});

// Delete User by ID
app.delete('/api/users/:userId', (req, res) => {
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
  db.Flower.findById(req.params.id, (err, flower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(flower);
  });
});

// Update Flower by ID
app.put('/api/flowers/:id', (req, res) => {
  db.Flower.findByIdAndUpdate(req.params.id, (err, updatedFlower) => {
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
  console.log("ordersList index");
  res.json(ordersList);
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