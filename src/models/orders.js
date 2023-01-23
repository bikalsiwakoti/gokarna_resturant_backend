const mongoose = require("mongoose");
const validator = require("validator")

 const ordersSchema = new mongoose.Schema({
  orderId: {
    type: String,
    required: true
  },
  orders:[{
    productsId: String,
    quantity: Number,
    price: Number,
    orderId: String
  }]

})


const Orders = mongoose.model("Orders", ordersSchema);
module.exports= Orders;