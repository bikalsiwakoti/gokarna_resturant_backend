const mongoose = require("mongoose");
const validator = require("validator")

 const roomsSchema = new mongoose.Schema({
  deluxe: {
    type: Number
  },
  superdeluxe: {
    type: Number,
  }
})


const Rooms = mongoose.model("Rooms", roomsSchema);
module.exports= Rooms;