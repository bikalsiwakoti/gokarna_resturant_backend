const express = require('express');
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