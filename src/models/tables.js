const mongoose = require("mongoose");
const validator = require("validator")

const tablesSchema = new mongoose.Schema({
  tableNo: {
    type: Number,
    required: true,
    unique: true
  },
  type: {
    type: String,
    required: true,
  },
  tableOrders: [{
    productsId: String,
    productsName: String,
    quantity: Number,
    price: Number,
    orderId: String,
    productPrice: Number
  }],
  roomPrice: Number,
})


const Tables = mongoose.model("Tables", tablesSchema);
module.exports = Tables;