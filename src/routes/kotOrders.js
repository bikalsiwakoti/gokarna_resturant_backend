const express = require('express');
const router = express.Router();
const KotOrders = require("../models/kotOrders")
const authUser = require('../middleware/authUser')



router.post("/add",authUser.verifyUser, async (req, res) => {
  try {
    const tablesRes = new KotOrders(req.body)
    await tablesRes.save()
    res.status(201).send("posted successfully")
  } catch (err) {
    res.status(400).send(err)
  }
})



router.delete("/delete/:id",authUser.verifyUser, async (req, res) => {
  try {
    const _id = req.params.id
    const data = await KotOrders.findByIdAndDelete(_id)
    res.status(201).send("Deleted")
  } catch (err) {
    res.status(400).send(err)
  }
})

router.delete("/deleteAll",authUser.verifyUser, async (req, res) => {
  try {
    await KotOrders.deleteMany({type: "kot"})
    res.status(201).send("Deleted")
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/get", async (req, res) => {
  try {
    const getTables = await KotOrders.find()
    res.status(201).send(getTables)

  } catch (err) {
    res.status(400).send(err)
  }
})

module.exports = router;