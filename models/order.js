const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    userId: Number,
    quantity:Number,
    price: String,
    productId:Number,
    created_date:{type:Date, default:Date.now},
});

const Order  = mongoose.model('Order', OrderSchema);
module.exports = Order;