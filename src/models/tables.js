const mongoose = require("mongoose");
const validator = require("validator")

 const tablesSchema = new mongoose.Schema({
  tableNo: {
    type: String,
    required: true,
    unique:true
  },
  status: {
    type: String,
    required: true
  }

})


const Tables = mongoose.model("Tables", tablesSchema);
module.exports= Tables;