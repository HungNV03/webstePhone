const mongoose =require('mongoose');
const empSchema = new mongoose.Schema({
    username : {
        type : String,
        
    },
    email : {
        type : String,
        
    },
    phone : {
        type : Number,
       
    },
    password : {
        type : String,
        
    },
    cpassword : {
        type : String,
       
    },
});

const empCollection = new mongoose.model('dbUserManager', empSchema );
module.exports = empCollection;