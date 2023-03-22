const express = require('express');
const router = express.Router();
const AddUser = require("../models/user")
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken');
const authUser = require('.././middleware/authUser')



router.post("/register", async (req, res) => {
  try {
    const password = req.body.password;
    const cpassword = req.body.confirmPassword;

    if (password === cpassword) {
      const hpassword = await bcryptjs.hash(password, 10);
      const confirmHPassword = await bcryptjs.hash(cpassword, 10);

      const registerUser = new AddUser({
        username: req.body.username,
        password: hpassword,
        confirmPassword: confirmHPassword,
        role: req.body.role
      })
      const result = await registerUser.save()
      res.status(201).send(result);


    } else {
      res.status(401).send("Password didn't match")
    }



  } catch (err) {
    res.status(400).send(err)
  }

})

router.post("/login", async (req, res) => {
  try {
    const username = req.body.username;
    const password = req.body.password;

    const usernameCheck = await AddUser.findOne({ username })
    const passMatch = await bcryptjs.compare(password, usernameCheck.password)

    if (passMatch) {
      //Creating cookie
      const token = jwt.sign(
        { id: usernameCheck._id, isAdmin: usernameCheck.isAdmin },
        "secretkey"
      );

      res.cookie("loginToken", token, {
        httpOnly: true,
        // secure: true
        maxAge: 25920000000
      });
      const data = {
        username: usernameCheck.username,
        isAdmin: usernameCheck.isAdmin,
        _id: usernameCheck._id
      }
      res.status(201).send(data)

    } else {
      res.status(401).send("Invalid details")
    }

  } catch (err) {
    res.status(400).send("invalid details")
  }


})

module.exports = router;