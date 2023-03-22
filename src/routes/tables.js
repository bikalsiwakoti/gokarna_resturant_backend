const express = require('express');
const { findByIdAndUpdate } = require('../models/tables');
const router = express.Router();
const Tables = require("../models/tables")
const authUser = require('../middleware/authUser')



router.post("/add",authUser.verifyAdmin, async (req, res) => {
  try {
    const tablesRes = new Tables(req.body)
    await tablesRes.save()
    res.status(201).send("posted successfully")
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post("/updateNotes/:id",authUser.verifyAdmin, async (req, res) => {
  try {
    const tablesRes = await Tables.findByIdAndUpdate({_id:req.params.id}, {$set: {notes: req.body.notes}}, {new:true})
    res.status(201).send(tablesRes)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.post("/tableOrders/add/:id", authUser.verifyAdmin, async (req, res) => {
  try {
    const _id = req.params.id
    await Tables.findByIdAndUpdate({ _id }, { $push: { tableOrders: req.body } }, { new: true })
    res.status(201).send(req.body)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/tableOrders/delete/:tableId/:productId",authUser.verifyAdmin , async (req, res) => {
  try {
    const tableId = req.params.tableId
    await Tables.updateOne({ _id: tableId }, { $pull: { tableOrders: { _id : req.params.productId}  } }, { new: true })

    res.status(201).send("successfully deleted")

  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/oneTable/get/:id",authUser.verifyUser, async (req, res) => {
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
    await Tables.findByIdAndUpdate(_id, {$set: {tableOrders: [], notes: ""}})
    res.status(201).send("success")

  } catch (err) {
    res.status(400).send(err)
  }
})


router.get("/get", async (req, res) => {
  try {
    const getTables = await Tables.find()
    res.status(201).send(getTables)

  } catch (err) {
    res.status(400).send(err)
  }
})

//update deluxe price
router.put("/updateDeluxe", async (req, res) => {
  try {
    await Tables.updateMany({type: "deluxe"}, {$set: { roomPrice: req.body.roomPrice}})
    res.status(201).send("Updated Successfully")
  } catch (err) {
    res.status(400).send(err)
  }
})

//update superdeluxe
router.put("/updateSuperDeluxe", async (req, res) => {
  try {
    await Tables.updateMany({type: "superdeluxe"}, {$set: { roomPrice: req.body.roomPrice}})
    res.status(201).send("Updated Successfully")
  } catch (err) {
    res.status(400).send(err)
  }
})

//update superdeluxe
router.get("/findSuperDeluxe", async (req, res) => {
  try {
    const data = await Tables.findOne({type: "superdeluxe"})
    res.status(201).send(data)
  } catch (err) {
    res.status(400).send(err)
  }
})

//update superdeluxe
router.get("/findDeluxe", async (req, res) => {
  try {
    const data = await Tables.findOne({type: "deluxe"})
    res.status(201).send(data)
  } catch (err) {
    res.status(400).send(err)
  }
})

//update active button
router.put("/findAndUpdateActive/:id", async (req, res) => {
  try {
    const data = await Tables.findByIdAndUpdate({_id : req.params.id}, {$set: { active: req.body.active}})
    res.status(201).send(data)
  } catch (err) {
    res.status(400).send(err)
  }
})



module.exports = router;