const express = require('express');
const { findByIdAndUpdate } = require('../models/tables');
const router = express.Router();
const Tables = require("../models/tables")


router.post("/add", async (req, res) => {
  try {
    // console.log(req.body)
    const tablesRes = new Tables(req.body)
    await tablesRes.save()
    res.status(201).send("posted successfully")

  } catch (err) {
    res.status(400).send(err)
  }
})

router.post("/tableOrders/add/:id", async (req, res) => {
  try {
    const _id = req.params.id
    console.log(req.body)
    await Tables.findByIdAndUpdate({ _id }, { $push: { tableOrders: req.body } }, { new: true })
    res.status(201).send(req.body)

  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/tableOrders/delete/:tableId/:productId", async (req, res) => {
  try {
    const tableId = req.params.tableId
    console.log(req.body)
    await Tables.updateOne({ _id: tableId }, { $pull: { tableOrders: { _id : req.params.productId}  } }, { new: true })

    res.status(201).send("successfully deleted")

  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/oneTable/get/:id", async (req, res) => {
  try {
    const _id = req.params.id
    const data = await Tables.findById(_id)
    res.status(201).send(data)

  } catch (err) {
    res.status(400).send(err)
  }
})

router.patch("/deleteTableProducts/:id", async (req, res) => {
  try {
    const _id = req.params.id
    await Tables.findByIdAndUpdate(_id, {$set: {tableOrders: []}})
    res.status(201).send("success")

  } catch (err) {
    res.status(400).send(err)
  }
})


router.get("/get", async (req, res) => {
  try {
    // console.log(req.body)
    const getTables = await Tables.find()
    res.status(201).send(getTables)

  } catch (err) {
    res.status(400).send(err)
  }
})


module.exports = router;