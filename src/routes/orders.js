const express = require('express');
const router = express.Router();
const Orders = require("../models/orders")
const authUser = require('../middleware/authUser');
const { find } = require('../models/tables');



router.post("/add", async (req, res) => {
  try {
    // console.log(req.body)
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
    // console.log(req.body)
    const getOrders = await Orders.find().sort({ _id: -1 })
    res.status(201).send(getOrders)

  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/getByDates", authUser.verifyUser, async (req, res) => {
  try {
    // console.log(req.body.startDate)
    const startDate = req.query.startDate
    const endDate = req.query.endDate
    const date = new Date(endDate);

    function addDays(date, days) {
      date.setDate(date.getDate() + days);
      return date;
    }
    
    const newEndDate = addDays(date, 1);

    if (startDate && endDate) {
      const getOrders = await Orders.find({ updatedAt: { $gt: startDate, $lt: newEndDate } }).sort({ _id: -1 })
      res.status(201).send(getOrders)
    } else {
      const getOrders = await Orders.find().sort({ _id: -1 })
      res.status(201).send(getOrders)
    }
  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;