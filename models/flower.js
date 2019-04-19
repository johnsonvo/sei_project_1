const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlowerSchema = new Schema({

    name:String,
    // img url will use String
    // avatar: { type: String, required: true },
    price: String || Number,
    type: String,
    season:String,
    orders:Number,
    created_date:{type:Date, default:Date.now},
});

const Flower  = mongoose.model('Flower', FlowerSchema);
module.exports = Flower;