const mongoose = require('mongoose');
const UserSchema =new mongoose.Schema({
    fullname: {
        type:String
    },
    email:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    address:{
        type:String
    },
    imageURL:{
        type:String
    }
});
const User =mongoose.model('User', UserSchema);
module.exports = User;