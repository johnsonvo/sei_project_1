const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    fullName:{type:String, required:true},
    email:{type:String, required:true, lowercase:true,trim:true},
    image: String,
    dob: String,
    products:String,
    created_date:{type:Date, default:Date.now},
});

const User  = mongoose.model('User', UserSchema);
module.exports = User;
