const mongoose = require("mongoose");
const validator = require("validator");

const kotOrdersSchema = new mongoose.Schema({
  productId: String,
  productsName: String,
  quantity: Number,
  tableNumber: Number,
  type: {
    type: String,
    default: "kot"
  }
}
)


const KotOrders = mongoose.model("KotOrders", kotOrdersSchema);
module.exports = KotOrders;