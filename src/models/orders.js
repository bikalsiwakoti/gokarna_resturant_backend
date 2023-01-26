const mongoose = require("mongoose");
const validator = require("validator");

const ordersSchema = new mongoose.Schema({
  orderId: {
    type: String,
  },
  tableNo: Number,
  orders: [{
    productsName: String,
    quantity: Number,
    price: Number,
  }],
  totalPrice: Number,
},{timestamps: true}
)


const Orders = mongoose.model("Orders", ordersSchema);
module.exports = Orders;