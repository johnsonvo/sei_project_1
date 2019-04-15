const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/project1';

mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

module.exports = {
  User = require('./user'),
  Order = require('./order'),
  Flower = require('./flower'),
};
