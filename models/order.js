const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    name:{
        type: Schema.Types.ObjectId, // This data type will be MongoDB Object ID
        ref: 'User' // Queries this Object ID will be pointed to the User collection
    },
    quantity:Number,
    price: String,
    flower:{
        type: Schema.Types.ObjectId, // This data type will be MongoDB Object ID
        ref: 'Flower' // Queries this Object ID will be pointed to the Flower collection
    },
    created_date:{type:Date, default:Date.now},
});

const Order  = mongoose.model('Order', OrderSchema);
module.exports = Order;