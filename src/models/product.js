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
     genre :{ 
        type: String,
        required: true
     }

})


const Products = mongoose.model("Products", productSchema);
module.exports= Products;