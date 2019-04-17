const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fullName:{type:String, required:true},
    email:{type:String, required:true, lowercase:true,trim:true},
    avatar: String,
    dateOfBirth: String,
    products:{
        type: Schema.Types.ObjectId, // This data type will be MongoDB Object ID
        ref: 'Flower' // Queries this Object ID will be pointed to the Flower collection
    },
    orders:{
        type: Schema.Types.ObjectId, // This data type will be MongoDB Object ID
        ref: 'Order' // Queries this Object ID will be pointed to the Order collection
    },
    created_date:{type:Date, default:Date.now},
});

const User  = mongoose.model('User', UserSchema);
module.exports = User;
