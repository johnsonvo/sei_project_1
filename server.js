const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');
const mongoose = require('mongoose');
const app = express();
const PORT = process.env.PORT || 3000;

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './uploads/');
  },
  filename: function(req, file, cb) {
    cb(null, new Date().toISOString() + file.originalname);
  }
});

const upload = multer({
  storage: storage,
  limits: {
  fileSize: 1024 * 1024 * 5
  },
});

mongoose.Promise = global.Promise;
const db = require('./models');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req,res) => {
    res.sendFile('views/index.html', {root: __dirname});
});

app.get('/api/users', (req, res) => {
  db.User.find((err, users) => {
    if (err) {
      console.log('err: ' + err);
      res.sendStatus(500);
    }
    res.json(users);
  });
});

app.post('/api/users', (req, res) => {
  db.User.create(req.body, (err, newUser) => {
    if (err) return res.status(500).json({msg: 'Something went wrong. Please try again!'});
    res.json(newUser);
  });
});

app.get('/api/users/:id', (req, res) => {
  db.User.findById(req.params.id, (err, fetchedUser) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(fetchedUser);
  })
});

app.put("/api/users/:id", (req, res) => {
  db.User.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedUser) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(updatedUser);
  });
});

app.delete('/api/users/:id', (req, res) => {
  db.User.findByIdAndRemove(req.params.id, (err, deletedUser) => {
    if (err) return res.status(400).json({ msg: "User ID not found" });
    res.json(deletedUser);
  });
});

app.get("/api/flowers", (req, res) => {
  db.Flower.find((err, flowers) => {
    if (err) {
      console.log('error: ' + err);
      res.sendStatus(500);
    }
    res.json(flowers);
  });
});

app.post('/api/flowers', (req, res) => {
  db.Flower.create(req.body, (err, newFlower) => {
    if (err) return res.status(500).json({ msg: 'Something goofed. Please try again!' });
    res.json(newFlower);
  });
});

app.get('/api/flowers/:id', (req, res) => {
  db.Flower.findById(req.params.id, (err, fetchedFlower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(fetchedFlower);
  });
});

app.put('/api/flowers/:id', (req, res) => {
  db.Flower.findByIdAndUpdate(req.params.id, {new: true}, (err, updatedFlower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(updatedFlower);
  });
});

app.delete('/api/flowers/:id', (req, res) => {
  db.Flower.findByIdAndRemove(req.params.id, (err, deletedFlower) => {
    if (err) return res.status(500).json({ msg: "Flower does not exist" });
    res.json(deletedFlower);
  });
});

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

app.post('/api/orders', (req, res) => {
  const newOrder = new db.Order({
    quantity: req.body.quantity,
    price: req.body.price,
  });
  db.Flower.findOne({name: req.body.flower}, (err, flower) => {
    if (err) return res.json({error: err});
    if (flower === null) {
      db.Flower.create({name:req.body.flower, alive: true}, (err, newOrder) => {
        if (err) return console.log(`create error: ${err}`);
        newOrder.flower = newOrder;
        newOrder.save((err, savedOrder) => {
          if (err) return console.log(`save error: ${err}`);
          console.log(`saved ${savedOrder.quantity}`);
          res.json(savedOrder);
        });
      });
    } else {
      newOrder.flower = flower;
      newOrder.save((err, savedOrder) => {
        if (err) return console.log(`save error: ${err}`);
        console.log("saved ", savedOrder.quantity);
        res.json(savedOrder);
      });
    };
  });
    db.User.findOne({fullName: req.body.user}, (err, user) => {
    if (err) return res.json({error: err});
    if (user === null) {
      db.User.create({fullName:req.body.user, alive: true}, (err, newOrder) => {
        if (err) return console.log(`create error: ${err}`);
        newOrder.user = newOrder;
        newOrder.save((err, savedOrder) => {
          if (err) return console.log(`save error: ${err}`);
          console.log(`saved ${savedOrder.quantity}`);
          res.json(savedOrder);
        });
      });
    } else {
      newOrder.user = user;
      newOrder.save((err, savedOrder) => {
        if (err) return console.log(`save error: ${err}`);
        console.log("saved ", savedOrder.quantity);
        res.json(savedOrder);
      });
    };
  });
});

app.get('/api/orders/:id', (req, res) => {
  db.Order.findById(req.params.id)
    .populate('order')
    .populate('flower')
    .exec((err, fetchedOrder) => {
    if (err) return res.status(500).json({ msg: "Order ID not found" });
    res.json(fetchedOrder);
  });
});

app.put("/api/orders/:id", (req, res) => {
  db.Order.findByIdAndUpdate(req.params.id, req.body, {new: true})
    .populate('user')
    .populate('flower')
    .exec((err, updatedOrder) => {
    if (err) return res.status(500).json({ msg: "Order ID not found" });
    res.json(updatedOrder);
  });
});

app.delete('/api/orders/:id', (req, res) => {
  db.Order.findByIdAndRemove(req.params.id)
    .populate('user')
    .populate('flower')
    .exec((err, deletedOrder) => {
    if (err) return res.status(500).json({ msg: "Order ID not found" });
    res.json(deletedOrder);
  });
});

app.listen(PORT, () => console.log(`Server runing on port ${PORT}`));