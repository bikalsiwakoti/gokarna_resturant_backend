const express = require('express');
const router = express.Router();
const Orders = require("../models/orders")
const authUser = require('../middleware/authUser');
const { find } = require('../models/tables');



router.post("/add",authUser.verifyUser, async (req, res) => {
  try {
    const ordersData = await Orders.find()
    const ordersRes = new Orders({
      ...req.body,
      orderId: ordersData.length + 1,
    })
    await ordersRes.save()
    res.status(201).send("posted successfully")

  } catch (err) {
    res.status(400).send(err)
  }
})


router.get("/get", authUser.verifyUser, async (req, res) => {
  try {
    const getOrders = await Orders.find().sort({ _id: -1 })
    res.status(201).send(getOrders)

  } catch (err) {
    res.status(400).send(err)
  }
})

router.put("/updateOrders/:orderTableId/:orderId", authUser.verifyUser, async (req, res) => {
  try {
    const orderTable = await Orders.updateOne({ _id: req.params.orderTableId, "orders._id" : req.params.orderId}, { $set: { "orders.$.quantity" : req.body.quantity, "orders.$.price" : req.body.price } })
    res.status(201).send(orderTable)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.put("/updateOrderTablePrice/:orderTableId", authUser.verifyUser, async (req, res) => {
  try {
    const orderTable = await Orders.updateOne({ _id: req.params.orderTableId}, { $set: {totalPrice: req.body.totalPrice } })
    res.status(201).send(orderTable)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/getOneOrders/:orderTableId/:orderId", authUser.verifyUser, async (req, res) => {
  try {
    const orderTable = await Orders.find({ _id: req.params.orderTableId, "orders._id" : req.params.orderId})
    res.status(201).send(orderTable)
  } catch (err) {
    res.status(400).send(err)
  }
})


router.get("/getOneOrders/:id", authUser.verifyUser, async (req, res) => {
  try {
    const data = await Orders.findById({ _id: req.params.id })
    res.status(201).send(data)

  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/getByDates", authUser.verifyUser, async (req, res) => {
  try {
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const date = new Date(endDate);

    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }

    const newEndDate = addDays(date, 1);

    if (startDate && endDate) {
      const getOrders = await Orders.find({ createdAt: { $gt: startDate, $lt: newEndDate } }).sort({ _id: -1 })
      res.status(201).send(getOrders)
    } else {
      const getOrders = await Orders.find().sort({ _id: -1 }).limit(100)
      res.status(201).send(getOrders)
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;