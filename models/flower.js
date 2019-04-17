const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FlowerSchema = new Schema({
    
    name:String,
    // img url will use String
    img: String,
    price: String,
    season:String,
    orders:{
        type: Schema.Types.ObjectId, // This data type will be MongoDB Object ID
        ref: 'Order' // Queries this Object ID will be pointed to the Order collection
    },
    created_date:{type:Date, default:Date.now},
});

const Flower  = mongoose.model('Flower', FlowerSchema);
module.exports = Flower;