const mongoose = require('mongoose');
const DB_URL = 'mongodb://localhost:27017/project1';

mongoose.connect(DB_URL, {useNewUrlParser: true, useFindAndModify: false})
  .then(() => console.log('MongoDB connected...'))
  .catch((err) => console.log(err));

module.exports = {
<<<<<<< HEAD
  Project: require('./project'),
  User : require('./user'),
  Order : require('./order'),
  Flower : require('./flower'),
=======
  User: require('./user'),
  Order: require('./order'),
  Flower: require('./flower')
>>>>>>> 04790a1cb76b42bbbd4946936b6cf66bf6dd4915
};
