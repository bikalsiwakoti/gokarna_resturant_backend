const router = require('express').Router();
const Room = require('../models/room')

router.get('/getRoom', async (req, res) => {
  try {
    const data = await Room.find()
    res.status(200).send(data)

  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/addRoom', async (req, res) => {
  try {
    const data = new Room(req.body)
    await data.save();
    res.status(200).send(data)

  } catch (error) {
    res.status(400).send(error)
  }
})

router.put('/updateRoom/:id', async (req, res) => {
  try {
    const data = await Room.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
    res.status(200).send(data)

  } catch (error) {
    res.status(400).send(error)
  }
})
module.exports = router;