const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name:{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    },
    quantity:Number,
    price: String,
    flower:{
        type: Schema.Types.ObjectId,
        ref: 'Flower'
    },
    created_date:{type:Date, default:Date.now},
});

const Order  = mongoose.model('Order', OrderSchema);
module.exports = Order;