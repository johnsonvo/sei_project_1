const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;


// Multer middleware
// Store multer images in disk storage
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // callback to handle error and store file
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    // callback function to rename with date and original file name.
    cb(null, new Date().toISOString() + file.originalname);
  }
});

// Only allows jpegs and pngs as file types
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
//     cb(null, true);
//   } else {
//     cb(new Error('File too large'), false);
//   }
// };

// Stores uploads into multer storage above.
const upload = multer({
  storage: storage,
  limits: {
  // Only allows files up to 5MB.
  fileSize: 1024 * 1024 * 5
  },
  // fileFilter: fileFilter
});

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
// Get Flower - working
app.get("/api/flowers", (req, res) => {
  db.Flower.find((err, flowers) => {
    if (err) {
      console.log('error: ' + err);
      res.sendStatus(500);
    }
    res.json(flowers);
  });
});
// -------------------------

// Get Flower - with image and id - multer - WORKS
// app.get("/api/flowers", (req, res) => {
//   db.Flower.find()
//     .select("name price _id avatar")
//     .exec()
//     .then(docs => {
//       const response = {
//         count: docs.length,
//         products: docs.map(doc => {
//           return {
//             name: doc.name,
//             price: doc.price,
//             avatar: doc.avatar,
//             _id: doc._id,
//             request: {
//               type: "GET",
//               url: "http://localhost:3000/api/flowers" + doc._id
//             }
//           };
//         })
//       };
//       //   if (docs.length >= 0) {
//       res.status(200).json(response);
//       //   } else {
//       //       res.status(404).json({
//       //           message: 'No entries found'
//       //       });
//       //   }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({
//         error: err
//       });
//     });
// });

// Create flower with Multer - working version
// app.post('/api/flowers', upload.single('avatar'), (req, res) => {
//   console.log(req.file);
//   db.Flower.create(req.body, (err, newFlower) => {
//     if (err) return res.status(500).json({ msg: 'Something goofed. Please try again!' });
//     res.json(newFlower);
//   });
// });

// TODO: Create flower to extract file.path
// ---------------
// Create Flower
app.post('/api/flowers', (req, res) => {
  db.Flower.create(req.body, (err, newFlower) => {
    if (err) return res.status(500).json({ msg: 'Something goofed. Please try again!' });
    res.json(newFlower);
  });
});
// -----------------------





// Get Flower by ID
app.get('/api/flowers/:id', (req, res) => {
  db.Flower.findById(req.params.id, (err, fetchedFlower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(fetchedFlower);
  });
});




// Get Flower by ID - version 2 - WORKS
// TODO: Needs to fetch by name
// app.get('/api/flowers/:id', (req, res) => {
//   const id = req.params.id;
//   db.Flower.findById(id)
//     .select('name price _id avatar season')
//     .exec()
//     .then(doc => {
//       console.log("From database", doc);
//       if (doc) {
//         res.status(200).json({
//           product: doc,
//           request: {
//             type: 'GET',
//             url: 'http://localhost:3000/api/flowers'
//           }
//         });
//       } else {
//         res
//           .status(404)
//           .json({ message: "No valid entry found for provided ID" });
//       }
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// });


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
  db.Order.find()
    .populate('user')
    .populate('flower')
    .exec((err, orders) => {
    if (err) {
      console.log('err: ' + err);
      res.sendStatus(500);
    }
    res.json(orders);
  });
});


// Create order
// app.post('/api/orders', (req, res) => {
//   db.Order.create(req.body, (err, newOrder) => {
//     if (err) return res.status(500).json({ msg: "Order does not exist" });
//     res.json(newOrder);
//   });
// });

// // -------------------------------------
// create new order and new user and new flower
app.post('/api/orders', (req, res) => {
  const newOrder = new db.Order({
    quantity: req.body.quantity,
    price: req.body.price,
  });

  // find the flower from req.body
  db.Flower.findOne({name: req.body.flower}, (err, flower) => {
    if (err) return res.json({error: err});
    // if that flower doesn't exist yet, create a new one
    if (flower === null) {
      db.Flower.create({name:req.body.flower, alive: true}, (err, newOrder) => {
        if (err) return console.log(`create error: ${err}`);
        newOrder.flower = newOrder;
        // save newOrder to database
        newOrder.save((err, savedOrder) => {
          if (err) return console.log(`save error: ${err}`);
          console.log(`saved ${savedOrder.quantity}`);
          // send back the Order!
          res.json(savedOrder);
        });
      });
    } else {
      // If that flower does exist, set newOrder flower to that flower
      newOrder.flower = flower;
      // save newOrder to database
      newOrder.save((err, savedOrder) => {
        if (err) return console.log(`save error: ${err}`);
        console.log("saved ", savedOrder.quantity);
        // send back the Order!
        res.json(savedOrder);
      });
    };
  });


   // find the user from req.body
    db.User.findOne({fullName: req.body.user}, (err, user) => {
    if (err) return res.json({error: err});
    // if that user doesn't exist yet, create a new one
    if (user === null) {
      db.User.create({fullName:req.body.user, alive: true}, (err, newOrder) => {
        if (err) return console.log(`create error: ${err}`);
        newOrder.user = newOrder;
        // save newOrder to database
        newOrder.save((err, savedOrder) => {
          if (err) return console.log(`save error: ${err}`);
          console.log(`saved ${savedOrder.quantity}`);
          // send back the Order!
          res.json(savedOrder);
        });
      });
    } else {
      // If that user does exist, set newOrder user to that user
      newOrder.user = user;
      // save newOrder to database
      newOrder.save((err, savedOrder) => {
        if (err) return console.log(`save error: ${err}`);
        console.log("saved ", savedOrder.quantity);
        // send back the Order!
        res.json(savedOrder);
      });
    };
  });
});






// Get Order by ID
app.get('/api/orders/:id', (req, res) => {
  db.Order.findById(req.params.id)
    .populate('order')
    .populate('flower')
    .exec((err, fetchedOrder) => {
    if (err) return res.status(500).json({ msg: "Order ID not found" });
    res.json(fetchedOrder);
  });
});



// Update order by ID

app.put("/api/orders/:id", (req, res) => {
  db.Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('user')
    .populate('flower')
    .exec((err, updatedOrder) => {
    if (err) return res.status(500).json({ msg: "Order ID not found" });
    res.json(updatedOrder);
  });
});


// Delete order by ID
app.delete('/api/orders/:id', (req, res) => {
  db.Order.findByIdAndRemove(req.params.id)
    .populate('user')
    .populate('flower')
    .exec((err, deletedOrder) => {
    if (err) return res.status(500).json({ msg: "Order ID not found" });
    res.json(deletedOrder);
  });
});


// Start Server
app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));