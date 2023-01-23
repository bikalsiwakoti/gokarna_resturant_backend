const express = require('express');
const router = express.Router();
const Orders = require("../models/orders")


router.post("/add", async (req, res) => {
  try {
    // console.log(req.body)
    const ordersRes = new Orders(req.body)
    await ordersRes.save()
    res.status(201).send("posted successfully")

  } catch (err) {
    res.status(400).send(err)
  }
})


router.get("/get", async (req, res) => {
  try {
    // console.log(req.body)
    const getOrders = await Orders.find()
    res.status(201).send(getOrders)

  } catch (err) {
    res.status(400).send(err)
  }
})


module.exports = router;