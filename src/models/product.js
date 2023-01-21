const mongoose = require("mongoose");
const validator = require("validator")

 const productSchema = new mongoose.Schema({
     name: {
         type: String,
         required: true
     },
     price: {  
         type: Number,
         required: true
     },
     img: {
        type: String
     },
     category :{ 
        type: String,
        required: true
     },
     type: {
         type: String,
         required : true
     }

})


const Products = mongoose.model("Products", productSchema);
module.exports= Products;