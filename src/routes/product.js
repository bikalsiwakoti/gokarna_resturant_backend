const express = require('express');
const router = express.Router();
const Products = require("../models/product")
const upload = require("../middleware/fileUploader")
const authUser = require('../middleware/authUser')


router.post("/add", authUser.verifyAdmin, async (req, res) => {
  try {
    const productRes = new Products(req.body)

    const result = await productRes.save()
    res.status(201).send(productRes)
  }
  // }
  catch (err) {
    res.status(400).send(err)
  }
})


router.get("/getAll", async (req, res) => {
  try {
    // console.log(req.body)
    const getProducts = await Products.find()
    res.status(201).send(getProducts)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/getBySearch", async (req, res) => {
  try {
    // console.log(req.body)
    const product = req.query.product
    console.log(product)
    const getProducts = await Products.find({name: {$regex: product, $options:"$i"}})
    res.status(201).send(getProducts)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.get("/get/:id", authUser.verifyUser, async (req, res) => {
  try {
    const id = req.params.id;
    const getProducts = await Products.findById({ _id: id });
    res.status(201).send(getProducts)
  } catch (err) {
    res.status(400).send(err)
  }
})

router.patch("/update/:id", authUser.verifyAdmin, async (req, res) => {
  try {
    const _id = req.params.id
    const updateProducts = await Products.findByIdAndUpdate(_id, {
      ...req.body
    }, { new: true })
    res.send(updateProducts)
  } catch (err) {
    res.status(404).send(updateProducts)
  }
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const _id = req.params.id
    const deleteProducts = await Products.findByIdAndDelete(_id, { new: true })
    res.send("Successfully Deleted")
  } catch (err) {
    res.status(404).send("Failed to Delete Product")
  }
})



module.exports = router;