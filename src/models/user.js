const mongoose = require("mongoose");
const validator = require("validator")

 const userSchema = new mongoose.Schema({
     username: {
         type: String,
         required: true,
         unique: true
     },
     password: {  
         type: String,
         required: true
     },
     confirmPassword: {  
         type: String,
         required: true
     },
     isAdmin: {
         type: Boolean,
         default: false
     }

})


const AddUser = mongoose.model("AddUser", userSchema);


module.exports= AddUser;